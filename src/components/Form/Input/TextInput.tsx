import React from 'react';
import {
  TextInput as RnTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Controller } from 'react-hook-form';

import { View } from '../../View';
import { HelperText } from '../../Typography';

import type { Theme } from '../../../types';
import { withTheme } from '../../../core/theming';
import { MIN_HEIGHT, INPUT_PADDING_HORIZONTAL } from './constants';
import { getOutlinedInputColors } from './helpers';

export type Props = React.ComponentProps<typeof View> & {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
  control: any;
  rules?: any;
  error?: string;
  underlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  disabled?: boolean;
  errorStyle?: StyleProp<ViewStyle>;
};

const TextInput = ({
  name,
  label,
  control,
  style,
  theme,
  rules,
  underlineColor: _underlineColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  disabled,
  error,
  errorStyle,
  ...rest
}: Props) => {
  const { roundness: borderRadius } = theme;
  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight,
    height,
    backgroundColor = theme?.colors?.background,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const { inputTextColor, outlineColor, placeholderColor, errorColor } =
    getOutlinedInputColors({
      activeOutlineColor,
      customOutlineColor,
      disabled,
      theme,
    });

  return (
    <View style={viewStyle}>
      <HelperText
        style={{ color: error != null ? errorColor : inputTextColor }}
        type="info"
        visible={label != null}
      >
        {label}
      </HelperText>
      <View
        style={[styles.container, { borderRadius, borderColor: outlineColor }]}
      >
        <View flex={1}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RnTextInput
                style={[styles.textInput, style]}
                placeholderTextColor={placeholderColor}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                {...rest}
              />
            )}
            name={name}
            rules={rules}
          />
        </View>
      </View>
      <HelperText type="error" visible={error != null}>
        {error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: MIN_HEIGHT,
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  input: {
    flexGrow: 1,
    margin: 0,
    zIndex: 1,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default withTheme(TextInput);
