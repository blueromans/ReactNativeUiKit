import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import StyledText from './StyledText';

export type Props = {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const Title = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="medium"
    style={[styles.text, props.style]}
  />
);

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15,
  },
});
