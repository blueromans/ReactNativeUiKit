import * as React from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  NativeEventSubscription,
} from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { View } from '../View';
import { withTheme } from '../../core/theming';
import useAnimatedValue from '../../utils/useAnimatedValue';
import { addEventListener } from '../../utils/addEventListener';

export type Props = {
  dismissable?: boolean;
  onDismiss?: () => void;
  overlayAccessibilityLabel?: string;
  visible: boolean;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: ReactNativeUiKit.AppTheme;
};

const DEFAULT_DURATION = 220;
const TOP_INSET = getStatusBarHeight(true);
const BOTTOM_INSET = getBottomSpace();

function Modal({
  dismissable = true,
  visible = false,
  overlayAccessibilityLabel = 'Close modal',
  onDismiss,
  children,
  contentContainerStyle,
  style,
  theme,
}: Props) {
  const visibleRef = React.useRef(visible);

  React.useEffect(() => {
    visibleRef.current = visible;
  });

  const opacity = useAnimatedValue(visible ? 1 : 0);

  const [rendered, setRendered] = React.useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }

  const handleBack = () => {
    if (dismissable) {
      hideModal();
    }
    return true;
  };

  const subscription = React.useRef<NativeEventSubscription | undefined>(
    undefined
  );

  const showModal = () => {
    subscription.current?.remove();
    subscription.current = addEventListener(
      BackHandler,
      'hardwareBackPress',
      handleBack
    );

    Animated.timing(opacity, {
      toValue: 1,
      duration: DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const removeListeners = () => {
    if (subscription.current?.remove) {
      subscription.current?.remove();
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }
  };

  const hideModal = () => {
    removeListeners();

    Animated.timing(opacity, {
      toValue: 0,
      duration: DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        return;
      }

      if (visible && onDismiss) {
        onDismiss();
      }

      if (visibleRef.current) {
        showModal();
      } else {
        setRendered(false);
      }
    });
  };

  const prevVisible = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    if (prevVisible.current !== visible) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
    prevVisible.current = visible;
  });

  React.useEffect(() => {
    return removeListeners;
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      style={StyleSheet.absoluteFill}
      onAccessibilityEscape={hideModal}
    >
      <TouchableWithoutFeedback
        accessibilityLabel={overlayAccessibilityLabel}
        accessibilityRole="button"
        disabled={!dismissable}
        onPress={dismissable ? hideModal : undefined}
        importantForAccessibility="no"
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: theme.colors?.backdrop,
              opacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.wrapper,
          { marginTop: TOP_INSET, marginBottom: BOTTOM_INSET },
          style,
        ]}
        pointerEvents="box-none"
      >
        <View
          style={
            [
              { opacity },
              styles.content,
              contentContainerStyle,
            ] as StyleProp<ViewStyle>
          }
        >
          {children}
        </View>
      </View>
    </Animated.View>
  );
}

export default withTheme(Modal);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
