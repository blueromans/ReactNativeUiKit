import React from 'react';
import {
  TextInput as RnTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Controller } from 'react-hook-form';

import { View } from '../../View';
import Text from '../../Typography/Text';

import type { Theme } from '../../../types';

export type Props = React.ComponentProps<typeof View> & {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
  control: any;
  rules?: any;
};

const TextInput = ({
  name,
  label,
  control,
  style,
  theme,
  rules,
  ...rest
}: Props) => {
  return (
    <View>
      {label != undefined && <Text>{label}</Text>}
      <View style={styles.container}>
        <View flex={1}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RnTextInput
                style={[styles.textInput, style]}
                placeholderTextColor={theme?.colors?.text}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: 0,
    paddingHorizontal: 10,
  },
});

export default TextInput;
