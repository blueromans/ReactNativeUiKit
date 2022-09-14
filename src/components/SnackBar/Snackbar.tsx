import React from 'react';
import {
  Animated,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Easing,
} from 'react-native';

import Button from '../Button/Button';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = React.ComponentProps<typeof View> & {
  visible: boolean;
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
  duration?: number;
  onDismiss: () => void;
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const DURATION_SHORT = 4000;
const DURATION_MEDIUM = 7000;
const DURATION_LONG = 10000;

const Snackbar = ({
  visible,
  action,
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
  elevation = 2,
  wrapperStyle,
  style,
  theme,
  ...rest
}: Props) => {
  const { current: opacity } = React.useRef<Animated.Value>(
    new Animated.Value(0.0)
  );
  const [hidden, setHidden] = React.useState<boolean>(!visible);

  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(
              onDismiss,
              duration
            ) as unknown as NodeJS.Timeout;
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setHidden(true);
      });
    }
  }, [visible, duration, opacity, onDismiss]);

  const { colors, roundness } = theme;

  if (hidden) return null;

  const {
    style: actionStyle,
    label: actionLabel,
    onPress: onPressAction,
    ...actionProps
  } = action || {};

  const marginRight = action ? 0 : 16;
  const textColor = theme?.colors?.accent;
  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[styles.wrapper, wrapperStyle]}
    >
      <Animated.View
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={
          [
            styles.elevation,
            styles.container,
            {
              borderRadius: roundness,
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
            { backgroundColor: colors?.surface },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...rest}
      >
        <Text style={[styles.content, { marginRight, color: colors?.surface }]}>
          {children}
        </Text>
        {action ? (
          <Button
            onPress={() => {
              onPressAction?.();
              onDismiss();
            }}
            style={[styles.button, actionStyle]}
            textColor={textColor}
            compact
            mode="text"
            {...actionProps}
          >
            {actionLabel}
          </Button>
        ) : null}
      </Animated.View>
    </SafeAreaView>
  );
};

Snackbar.DURATION_SHORT = DURATION_SHORT;
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM;
Snackbar.DURATION_LONG = DURATION_LONG;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
  elevation: {
    elevation: 6,
  },
});

export default withTheme(Snackbar);
