import * as React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';

import StyledText from './StyledText';

export type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  color?: string;
  children: React.ReactNode;
};

const Subheading = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Subheading;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 2,
    letterSpacing: 0.5,
  },
});
