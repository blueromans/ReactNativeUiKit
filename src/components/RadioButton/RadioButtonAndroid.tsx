import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, Theme } from '../../types';
import { getAndroidSelectionControlColor } from '../Checkbox/utils';

export type Props = $RemoveChildren<typeof TouchableHighlight> & {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: (param?: any) => void;
  uncheckedColor?: string;
  color?: string;
  theme: Theme;
};

const BORDER_WIDTH = 2;

const RadioButtonAndroid = ({
  disabled,
  onPress,
  theme,
  value,
  status,
  ...rest
}: Props) => {
  const { current: borderAnim } = React.useRef<Animated.Value>(
    new Animated.Value(BORDER_WIDTH)
  );

  const { current: radioAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );

  const isFirstRendering = React.useRef<boolean>(true);

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    if (status === 'checked') {
      radioAnim.setValue(1.2);

      Animated.timing(radioAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      borderAnim.setValue(10);

      Animated.timing(borderAnim, {
        toValue: BORDER_WIDTH,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [status, borderAnim, radioAnim]);

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';

        const { rippleColor, selectionControlColor } =
          getAndroidSelectionControlColor({
            theme,
            disabled,
            checked,
            customColor: rest.color,
            customUncheckedColor: rest.uncheckedColor,
          });

        return (
          <TouchableHighlight
            {...rest}
            rippleColor={rippleColor}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      onValueChange: context?.onValueChange,
                      value,
                    });
                  }
            }
            style={styles.container}
          >
            <Animated.View
              style={[
                styles.radio,
                {
                  borderColor: selectionControlColor,
                  borderWidth: borderAnim,
                },
              ]}
            >
              {checked ? (
                <View style={[StyleSheet.absoluteFill, styles.radioContainer]}>
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: selectionControlColor,
                        transform: [{ scale: radioAnim }],
                      },
                    ]}
                  />
                </View>
              ) : null}
            </Animated.View>
          </TouchableHighlight>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonAndroid.displayName = 'RadioButton.Android';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default withTheme(RadioButtonAndroid);

const RadioButtonAndroidWithTheme = withTheme(RadioButtonAndroid);

export { RadioButtonAndroidWithTheme as RadioButtonAndroid };
