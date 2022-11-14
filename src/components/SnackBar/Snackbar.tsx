/* eslint-disable react-native/no-inline-styles */
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

import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = React.ComponentPropsWithoutRef<typeof View> & {
  visible?: boolean;
  duration?: number;
  position?: 'bottom' | 'top';
  onDismiss?: any;
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const DURATION_MEDIUM = 7000;

const Snackbar = ({
  visible,
  position = 'bottom',
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
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
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
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
              onDismiss!!,
              duration
            ) as unknown as NodeJS.Timeout;
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setHidden(true);
        }
      });
    }
  }, [visible, duration, opacity, onDismiss]);

  const { colors, roundness } = theme;

  if (hidden) {
    return null;
  }

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        position === 'bottom' ? { bottom: 0 } : { top: 0 },
        wrapperStyle,
      ]}
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
            { backgroundColor: colors?.onSurface },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...rest}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  elevation: {
    elevation: 6,
  },
});

export default withTheme(Snackbar);
