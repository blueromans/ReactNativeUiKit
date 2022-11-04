import React from 'react';
import {
  TextInput as RnTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { Controller } from 'react-hook-form';
import { TextInputMask, TextInputMaskTypeProp } from 'react-native-masked-text';

import { View } from '../../View';
import { HelperText } from '../../Typography';

import type { Theme } from '../../../types';
import { withTheme } from '../../../core/theming';
import { INPUT_PADDING_HORIZONTAL } from './constants';
import { getOutlinedInputColors } from './helpers';

export type Props = React.ComponentProps<typeof View> &
  React.ComponentProps<typeof RnTextInput> & {
    name?: string;
    label?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    theme: Theme;
    methods?: any;
    rules?: any;
    options?: any;
    type?: TextInputMaskTypeProp;
    error?: string;
    outlineColor?: string;
    activeOutlineColor?: string;
    disabled?: boolean;
    errorStyle?: StyleProp<TextStyle>;
    errorLabelStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
  };

const TextInput = ({
  name = '',
  label,
  methods = null,
  style,
  left,
  right,
  theme,
  rules,
  options,
  type = 'cpf',
  outlineColor: customOutlineColor,
  activeOutlineColor,
  disabled,
  error: errorMessage,
  errorStyle,
  errorLabelStyle,
  labelStyle,
  containerStyle,
  ...rest
}: Props) => {
  const { roundness: borderRadius, baseHeight } = theme;
  const [focused, setFocused] = React.useState<boolean>(false);
  const error: boolean =
    errorMessage != null || methods?.formState?.errors[name]?.message != null
      ? true
      : false;
  const hasActiveOutline = focused || error;

  const { inputTextColor, activeColor, outlineColor, placeholderColor } =
    getOutlinedInputColors({
      activeOutlineColor,
      customOutlineColor,
      disabled,
      error,
      theme,
    });
  const handleLeft = () => {
    if (!left) {
      return null;
    }
    return left;
  };
  const handleRight = () => {
    if (!right) {
      return null;
    }
    return right;
  };
  return (
    <React.Fragment>
      {label && (
        <HelperText
          style={[
            theme?.styles?.input?.label,
            labelStyle,
            { color: inputTextColor },
          ]}
        >
          {label}
        </HelperText>
      )}
      <View
        row
        center
        style={[
          styles.container,
          { height: baseHeight },
          {
            borderRadius,
            borderColor: hasActiveOutline ? activeColor : outlineColor,
          },
          theme?.styles?.input?.container,
          containerStyle,
          error
            ? theme?.styles?.input?.errorStyle
              ? theme?.styles?.input?.errorStyle
              : errorStyle
            : {},
        ]}
      >
        {handleLeft()}
        {methods !== null ? (
          <Controller
            control={methods?.control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) =>
              type && options ? (
                <TextInputMask
                  type={type}
                  style={[
                    styles.textInput,
                    { height: baseHeight },
                    theme?.styles?.input?.textInput,
                    style,
                  ]}
                  placeholderTextColor={placeholderColor}
                  onBlur={() => {
                    onBlur();
                    setFocused(false);
                  }}
                  onFocus={() => {
                    setFocused(true);
                  }}
                  onChangeText={onChange}
                  value={value}
                  {...rest}
                />
              ) : (
                <RnTextInput
                  style={[
                    styles.textInput,
                    { height: baseHeight },
                    theme?.styles?.input?.textInput,
                    style,
                  ]}
                  placeholderTextColor={placeholderColor}
                  onBlur={() => {
                    onBlur();
                    setFocused(false);
                  }}
                  onFocus={() => {
                    setFocused(true);
                  }}
                  onChangeText={onChange}
                  value={value}
                  {...rest}
                />
              )
            }
            name={name as string}
          />
        ) : type && options ? (
          <TextInputMask
            type={type}
            style={[
              styles.textInput,
              { height: baseHeight },
              theme?.styles?.input?.textInput,
              style,
            ]}
            placeholderTextColor={placeholderColor}
            {...rest}
          />
        ) : (
          <RnTextInput
            style={[
              styles.textInput,
              { height: baseHeight },
              theme?.styles?.input?.textInput,
              style,
            ]}
            placeholderTextColor={placeholderColor}
            {...rest}
          />
        )}

        {handleRight()}
      </View>
      {error && (
        <HelperText
          type="error"
          style={theme?.styles?.input?.errorLabelStyle || errorLabelStyle}
        >
          {errorMessage != null
            ? errorMessage
            : methods?.formState?.errors[name]?.message}
        </HelperText>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    padding: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
});

export default withTheme(TextInput);
