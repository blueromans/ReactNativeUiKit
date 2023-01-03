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
import RadioButton from './RadioButton';
import StyledText from '../Typography/StyledText';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';
import type { Theme } from '../../types';
import { TouchableOpacity } from '../TouchableOpacity';

export type Props = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  backgroundColor?: string;
  color?: string;
  status?: 'checked' | 'unchecked';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  theme: Theme;
  mode?: 'android' | 'ios';
  position?: 'leading' | 'trailing';
};

const RadioButtonItem = ({
  value,
  label,
  description,
  style,
  labelStyle,
  descriptionStyle,
  onPress,
  disabled,
  color,
  uncheckedColor,
  backgroundColor,
  status,
  theme,
  mode,
  position = 'trailing',
}: Props) => {
  let radioButton: any;

  const textColor = theme?.colors?.text;
  const disabledTextColor = theme?.colors?.disabled;

  const computedStyle = {
    color: disabled ? disabledTextColor : textColor,
  } as TextStyle;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const radioButtonProps = {
          value,
          disabled,
          status,
          color: context?.color || color,
          uncheckedColor,
        };
        const isLeading =
          context?.position === 'leading' || position === 'leading';

        if (context?.mode === 'android' || mode === 'android') {
          radioButton = <RadioButtonAndroid {...radioButtonProps} />;
        } else if (context?.mode === 'ios' || mode === 'ios') {
          radioButton = <RadioButtonIOS {...radioButtonProps} />;
        } else {
          radioButton = <RadioButton {...radioButtonProps} />;
        }
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              handlePress({
                onPress: onPress,
                onValueChange: context?.onValueChange,
                value,
              })
            }
            disabled={disabled}
          >
            <View
              style={[
                styles.container,
                style,
                {
                  backgroundColor:
                    (value === context?.value || status === 'checked') &&
                    context?.selectedColor
                      ? context?.selectedColor
                      : context?.backgroundColor
                      ? context?.backgroundColor
                      : backgroundColor
                      ? backgroundColor
                      : undefined,
                },
              ]}
              pointerEvents="none"
            >
              {isLeading && radioButton}
              <View style={styles.label}>
                <StyledText style={[styles.font, computedStyle, labelStyle]}>
                  {label}
                </StyledText>
                {description && (
                  <StyledText style={[styles.description, descriptionStyle]}>
                    {description}
                  </StyledText>
                )}
              </View>
              {!isLeading && radioButton}
            </View>
          </TouchableOpacity>
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
  description: {
    fontSize: 14,
  },
});
