import * as React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import StyledText from './StyledText';

export type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  color?: string;
  children: React.ReactNode;
};

const Caption = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.54}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Caption;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 20,
    marginVertical: 2,
    letterSpacing: 0.4,
  },
});
