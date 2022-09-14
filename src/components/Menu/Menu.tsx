import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  I18nManager,
  LayoutRectangle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  ScrollView,
  findNodeHandle,
  NativeEventSubscription,
} from 'react-native';

import { withTheme } from '../../core/theming';
import type { $Omit } from '../../types';
import MenuItem from './MenuItem';
import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import { addEventListener } from '../../utils/addEventListener';
import type { Theme } from '../../types';

export type Props = {
  visible: boolean;
  anchor: React.ReactNode | { x: number; y: number };
  statusBarHeight?: number;
  onDismiss: () => void;
  overlayAccessibilityLabel?: string;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

type Layout = $Omit<$Omit<LayoutRectangle, 'x'>, 'y'>;

type State = {
  rendered: boolean;
  top: number;
  left: number;
  menuLayout: Layout;
  anchorLayout: Layout;
  opacityAnimation: Animated.Value;
  scaleAnimation: Animated.ValueXY;
};

const SCREEN_INDENT = 8;
const ANIMATION_DURATION = 250;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);

class Menu extends React.Component<Props, State> {
  static Item = MenuItem;

  static defaultProps = {
    statusBarHeight: APPROX_STATUSBAR_HEIGHT,
    overlayAccessibilityLabel: 'Close menu',
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.visible && !prevState.rendered) {
      return { rendered: true };
    }

    return null;
  }

  state = {
    rendered: this.props.visible,
    top: 0,
    left: 0,
    menuLayout: { width: 0, height: 0 },
    anchorLayout: { width: 0, height: 0 },
    opacityAnimation: new Animated.Value(0),
    scaleAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      this.updateVisibility();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  private anchor?: View | null = null;
  private menu?: View | null = null;
  private backHandlerSubscription: NativeEventSubscription | undefined;
  private dimensionsSubscription: NativeEventSubscription | undefined;

  private isCoordinate = (anchor: any): anchor is { x: number; y: number } =>
    !React.isValidElement(anchor) &&
    typeof anchor?.x === 'number' &&
    typeof anchor?.y === 'number';

  private measureMenuLayout = () =>
    new Promise<LayoutRectangle>((resolve) => {
      if (this.menu) {
        this.menu.measureInWindow((x, y, width, height) => {
          resolve({ x, y, width, height });
        });
      }
    });

  private measureAnchorLayout = () =>
    new Promise<LayoutRectangle>((resolve) => {
      const { anchor } = this.props;
      if (this.isCoordinate(anchor)) {
        resolve({ x: anchor.x, y: anchor.y, width: 0, height: 0 });
        return;
      }

      if (this.anchor) {
        this.anchor.measureInWindow((x, y, width, height) => {
          resolve({ x, y, width, height });
        });
      }
    });

  private updateVisibility = async () => {
    // Menu is rendered in Portal, which updates items asynchronously
    // We need to do the same here so that the ref is up-to-date
    await Promise.resolve();

    if (this.props.visible) {
      this.show();
    } else {
      this.hide();
    }
  };

  private isBrowser = () => Platform.OS === 'web' && 'document' in global;

  private focusFirstDOMNode = (el: View | null | undefined) => {
    if (el && this.isBrowser()) {
      // When in the browser, we want to focus the first focusable item on toggle
      // For example, when menu is shown, focus the first item in the menu
      // And when menu is dismissed, send focus back to the button to resume tabbing
      const node: any = findNodeHandle(el);
      const focusableNode = node.querySelector(
        // This is a rough list of selectors that can be focused
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      focusableNode?.focus();
    }
  };

  private handleDismiss = () => {
    if (this.props.visible) {
      this.props.onDismiss();
    }
    return true;
  };

  private handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.props.onDismiss();
    }
  };

  private attachListeners = () => {
    this.backHandlerSubscription = addEventListener(
      BackHandler,
      'hardwareBackPress',
      this.handleDismiss
    );
    this.dimensionsSubscription = addEventListener(
      Dimensions,
      'change',
      this.handleDismiss
    );
    this.isBrowser() && document.addEventListener('keyup', this.handleKeypress);
  };

  private removeListeners = () => {
    this.backHandlerSubscription?.remove();
    this.dimensionsSubscription?.remove();
    this.isBrowser() &&
      document.removeEventListener('keyup', this.handleKeypress);
  };

  private show = async () => {
    const windowLayout = Dimensions.get('window');
    const [menuLayout, anchorLayout] = await Promise.all([
      this.measureMenuLayout(),
      this.measureAnchorLayout(),
    ]);

    // When visible is true for first render
    // native views can be still not rendered and
    // measureMenuLayout/measureAnchorLayout functions
    // return wrong values e.g { x:0, y: 0, width: 0, height: 0 }
    // so we have to wait until views are ready
    // and rerun this function to show menu
    if (
      !windowLayout.width ||
      !windowLayout.height ||
      !menuLayout.width ||
      !menuLayout.height ||
      (!anchorLayout.width && !this.isCoordinate(this.props.anchor)) ||
      (!anchorLayout.height && !this.isCoordinate(this.props.anchor))
    ) {
      requestAnimationFrame(this.show);
      return;
    }

    this.setState(
      () => ({
        left: anchorLayout.x,
        top: anchorLayout.y,
        anchorLayout: {
          height: anchorLayout.height,
          width: anchorLayout.width,
        },
        menuLayout: {
          width: menuLayout.width,
          height: menuLayout.height,
        },
      }),
      () => {
        this.attachListeners();

        Animated.parallel([
          Animated.timing(this.state.scaleAnimation, {
            toValue: { x: menuLayout.width, y: menuLayout.height },
            duration: ANIMATION_DURATION * 1,
            easing: EASING,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: ANIMATION_DURATION * 1,
            easing: EASING,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            this.focusFirstDOMNode(this.menu);
          }
        });
      }
    );
  };

  private hide = () => {
    this.removeListeners();

    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: ANIMATION_DURATION * 1,
      easing: EASING,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ menuLayout: { width: 0, height: 0 }, rendered: false });
        this.state.scaleAnimation.setValue({ x: 0, y: 0 });
        this.focusFirstDOMNode(this.anchor);
      }
    });
  };

  render() {
    const {
      visible,
      anchor,
      contentStyle,
      style,
      children,
      theme,
      statusBarHeight,
      onDismiss,
      overlayAccessibilityLabel,
    } = this.props;

    const {
      rendered,
      menuLayout,
      anchorLayout,
      opacityAnimation,
      scaleAnimation,
    } = this.state;

    let { left, top } = this.state;

    // I don't know why but on Android measure function is wrong by 24
    const additionalVerticalValue = Platform.select({
      android: statusBarHeight,
      default: 0,
    });

    const scaleTransforms = [
      {
        scaleX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [0, 1],
        }),
      },
      {
        scaleY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [0, 1],
        }),
      },
    ];

    const windowLayout = Dimensions.get('window');

    // We need to translate menu while animating scale to imitate transform origin for scale animation
    const positionTransforms = [];

    // Check if menu fits horizontally and if not align it to right.
    if (left <= windowLayout.width - menuLayout.width - SCREEN_INDENT) {
      positionTransforms.push({
        translateX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [-(menuLayout.width / 2), 0],
        }),
      });

      // Check if menu position has enough space from left side
      if (left < SCREEN_INDENT) {
        left = SCREEN_INDENT;
      }
    } else {
      positionTransforms.push({
        translateX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [menuLayout.width / 2, 0],
        }),
      });

      left += anchorLayout.width - menuLayout.width;

      const right = left + menuLayout.width;
      // Check if menu position has enough space from right side
      if (right > windowLayout.width - SCREEN_INDENT) {
        left = windowLayout.width - SCREEN_INDENT - menuLayout.width;
      }
    }

    // If the menu is larger than available vertical space,
    // calculate the height of scrollable view
    let scrollableMenuHeight = 0;

    // Check if the menu should be scrollable
    if (
      // Check if the menu overflows from bottom side
      top >=
        windowLayout.height -
          menuLayout.height -
          SCREEN_INDENT -
          additionalVerticalValue &&
      // And bottom side of the screen has more space than top side
      top <= windowLayout.height - top
    ) {
      // Scrollable menu should be below the anchor (expands downwards)
      scrollableMenuHeight =
        windowLayout.height - top - SCREEN_INDENT - additionalVerticalValue;
    } else if (
      // Check if the menu overflows from bottom side
      top >=
        windowLayout.height -
          menuLayout.height -
          SCREEN_INDENT -
          additionalVerticalValue &&
      // And top side of the screen has more space than bottom side
      top >= windowLayout.height - top &&
      // And menu overflows from top side
      top <=
        menuLayout.height -
          anchorLayout.height +
          SCREEN_INDENT -
          additionalVerticalValue
    ) {
      // Scrollable menu should be above the anchor (expands upwards)
      scrollableMenuHeight =
        top + anchorLayout.height - SCREEN_INDENT + additionalVerticalValue;
    }

    // Scrollable menu max height
    scrollableMenuHeight =
      scrollableMenuHeight > windowLayout.height - 2 * SCREEN_INDENT
        ? windowLayout.height - 2 * SCREEN_INDENT
        : scrollableMenuHeight;

    // Menu is typically positioned below the element that generates it
    // So first check if it fits below the anchor (expands downwards)
    if (
      // Check if menu fits vertically
      top <=
        windowLayout.height -
          menuLayout.height -
          SCREEN_INDENT -
          additionalVerticalValue ||
      // Or if the menu overflows from bottom side
      (top >=
        windowLayout.height -
          menuLayout.height -
          SCREEN_INDENT -
          additionalVerticalValue &&
        // And bottom side of the screen has more space than top side
        top <= windowLayout.height - top)
    ) {
      positionTransforms.push({
        translateY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [-((scrollableMenuHeight || menuLayout.height) / 2), 0],
        }),
      });

      // Check if menu position has enough space from top side
      if (top < SCREEN_INDENT) {
        top = SCREEN_INDENT;
      }
    } else {
      positionTransforms.push({
        translateY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [(scrollableMenuHeight || menuLayout.height) / 2, 0],
        }),
      });

      top += anchorLayout.height - (scrollableMenuHeight || menuLayout.height);

      const bottom =
        top +
        (scrollableMenuHeight || menuLayout.height) +
        additionalVerticalValue;

      // Check if menu position has enough space from bottom side
      if (bottom > windowLayout.height - SCREEN_INDENT) {
        top =
          scrollableMenuHeight === windowLayout.height - 2 * SCREEN_INDENT
            ? -SCREEN_INDENT * 2
            : windowLayout.height -
              menuLayout.height -
              SCREEN_INDENT -
              additionalVerticalValue;
      }
    }

    const shadowMenuContainerStyle = {
      opacity: opacityAnimation,
      transform: scaleTransforms,
      borderRadius: theme.roundness,
      elevation: 8,
      ...(scrollableMenuHeight ? { height: scrollableMenuHeight } : {}),
    };

    const positionStyle = {
      top: this.isCoordinate(anchor) ? top : top + additionalVerticalValue,
      ...(I18nManager.isRTL ? { right: left } : { left }),
    };

    return (
      <View
        ref={(ref) => {
          this.anchor = ref;
        }}
        collapsable={false}
      >
        {this.isCoordinate(anchor) ? null : anchor}
        {rendered ? (
          <View>
            <TouchableWithoutFeedback
              accessibilityLabel={overlayAccessibilityLabel}
              accessibilityRole="button"
              onPress={onDismiss}
            >
              <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>
            <View
              ref={(ref) => {
                this.menu = ref;
              }}
              collapsable={false}
              accessibilityViewIsModal={visible}
              style={[styles.wrapper, positionStyle, style]}
            >
              <Animated.View style={{ transform: positionTransforms }}>
                <View
                  style={
                    [
                      styles.shadowMenuContainer,
                      shadowMenuContainerStyle,
                      contentStyle,
                    ] as StyleProp<ViewStyle>
                  }
                >
                  {(scrollableMenuHeight && (
                    <ScrollView>{children}</ScrollView>
                  )) || <React.Fragment>{children}</React.Fragment>}
                </View>
              </Animated.View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  shadowMenuContainer: {
    opacity: 0,
    paddingVertical: 8,
  },
});

export default withTheme(Menu);
