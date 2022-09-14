import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Checkbox from './Checkbox';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';
import Text from '../Typography/Text';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  uncheckedColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme: Theme;
  position?: 'leading' | 'trailing';
  mode?: 'android' | 'ios';
};

const CheckboxItem = ({
  style,
  status,
  label,
  onPress,
  labelStyle,
  theme,
  mode,
  position = 'trailing',
  disabled,
  ...props
}: Props) => {
  const checkboxProps = { ...props, status, theme, disabled };
  const isLeading = position === 'leading';
  let checkbox;

  if (mode === 'android') {
    checkbox = <CheckboxAndroid {...checkboxProps} />;
  } else if (mode === 'ios') {
    checkbox = <CheckboxIOS {...checkboxProps} />;
  } else {
    checkbox = <Checkbox {...checkboxProps} />;
  }

  const textColor = theme?.colors?.text;
  const disabledTextColor = theme?.colors?.disabled;
  const textAlign = isLeading ? 'right' : 'left';

  const computedStyle = {
    color: disabled ? disabledTextColor : textColor,
    textAlign,
  } as TextStyle;

  return (
    <TouchableHighlight onPress={onPress} disabled={disabled}>
      <View style={[styles.container, style]}>
        {isLeading && checkbox}
        <Text style={[styles.label, styles.font, computedStyle, labelStyle]}>
          {label}
        </Text>
        {!isLeading && checkbox}
      </View>
    </TouchableHighlight>
  );
};

CheckboxItem.displayName = 'Checkbox.Item';

export default withTheme(CheckboxItem);

const CheckboxItemWithTheme = withTheme(CheckboxItem);

export { CheckboxItemWithTheme as CheckboxItem };

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
