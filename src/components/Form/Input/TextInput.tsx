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

export type Props = React.ComponentProps<typeof View> & {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
  control: any;
  rules?: any;
  options?: any;
  type?: TextInputMaskTypeProp;
  error?: string;
  underlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  disabled?: boolean;
  errorStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const TextInput = ({
  name,
  label,
  control,
  style,
  theme,
  rules,
  options,
  type = 'cpf',
  underlineColor: _underlineColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  disabled,
  error: errorMessage,
  errorStyle,
  labelStyle,
  containerStyle,
  ...rest
}: Props) => {
  const { roundness: borderRadius, baseHeight } = theme;
  const [focused, setFocused] = React.useState<boolean>(false);
  const error: boolean = errorMessage != null ? true : false;
  const hasActiveOutline = focused || error;

  const {
    inputTextColor,
    activeColor,
    outlineColor,
    placeholderColor,
    errorColor,
  } = getOutlinedInputColors({
    activeOutlineColor,
    customOutlineColor,
    disabled,
    error,
    theme,
  });

  const InputComponentWithMask = (props: any) => (
    <TextInputMask type={type} {...props} />
  );
  const InputComponent = (props: any) => <RnTextInput {...props} />;
  const TextInput = type && options ? InputComponentWithMask : InputComponent;

  return (
    <React.Fragment>
      <HelperText
        style={[
          theme?.styles?.input?.label,
          labelStyle,
          { color: error ? errorColor : inputTextColor },
        ]}
        visible={label != null}
      >
        {label}
      </HelperText>
      <View
        style={[
          styles.container,
          { height: baseHeight },
          {
            borderRadius,
            borderColor: hasActiveOutline ? activeColor : outlineColor,
          },
          theme?.styles?.input?.container,
          containerStyle,
        ]}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.textInput, theme?.styles?.input?.textInput, style]}
              placeholderTextColor={placeholderColor}
              onBlur={() => {
                setFocused(false);
                onBlur();
              }}
              onFocus={() => setFocused(true)}
              onChangeText={(value: any) => onChange(value)}
              value={value}
              {...rest}
            />
          )}
          name={name}
          rules={rules}
        />
      </View>
      <HelperText type="error" visible={error}>
        {errorMessage}
      </HelperText>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
});

export default withTheme(TextInput);
