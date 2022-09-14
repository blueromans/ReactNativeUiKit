import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { withTheme } from '../../core/theming';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress } from './utils';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import RadioButton from './RadioButton';
import Text from '../Typography/Text';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';
import type { Theme } from '../../types';

export type Props = {
  value: string;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  status?: 'checked' | 'unchecked';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme: Theme;
  mode?: 'android' | 'ios';
  position?: 'leading' | 'trailing';
};

const RadioButtonItem = ({
  value,
  label,
  style,
  labelStyle,
  onPress,
  disabled,
  color,
  uncheckedColor,
  status,
  theme,
  mode,
  position = 'trailing',
}: Props) => {
  const radioButtonProps = { value, disabled, status, color, uncheckedColor };
  const isLeading = position === 'leading';
  let radioButton: any;

  if (mode === 'android') {
    radioButton = <RadioButtonAndroid {...radioButtonProps} />;
  } else if (mode === 'ios') {
    radioButton = <RadioButtonIOS {...radioButtonProps} />;
  } else {
    radioButton = <RadioButton {...radioButtonProps} />;
  }

  const textColor = theme?.colors?.text;
  const disabledTextColor = theme?.colors?.disabled;
  const textAlign = isLeading ? 'right' : 'left';

  const computedStyle = {
    color: disabled ? disabledTextColor : textColor,
    textAlign,
  } as TextStyle;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        return (
          <TouchableHighlight
            onPress={() =>
              handlePress({
                onPress: onPress,
                onValueChange: context?.onValueChange,
                value,
              })
            }
            disabled={disabled}
          >
            <View style={[styles.container, style]} pointerEvents="none">
              {isLeading && radioButton}
              <Text
                style={[styles.label, styles.font, computedStyle, labelStyle]}
              >
                {label}
              </Text>
              {!isLeading && radioButton}
            </View>
          </TouchableHighlight>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonItem.displayName = 'RadioButton.Item';

export default withTheme(RadioButtonItem);

const RadioButtonItemWithTheme = withTheme(RadioButtonItem);

export { RadioButtonItemWithTheme as RadioButtonItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    flexShrink: 1,
    flexGrow: 1,
  },
  font: {
    fontSize: 16,
  },
});
