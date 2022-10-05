import React from 'react';
import {
  Text as NativeText,
  TextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import type { Theme } from '../../types';

type Props = React.ComponentProps<typeof NativeText> & {
  style?: StyleProp<TextStyle>;
  color?: string;
  theme?: Theme;
};

const Text = ({ style, theme, color, ...rest }: Props) => {
  return (
    <NativeText
      {...rest}
      style={[
        {
          ...theme?.fonts?.regular,
          color: color ? color : theme?.colors?.text,
        },
        styles.text,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default Text;
