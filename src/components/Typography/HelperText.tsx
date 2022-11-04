import React from 'react';
import color from 'color';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import type { $Omit, Theme } from '../../types';
import StyledText from './StyledText';

export type Props = $Omit<
  $Omit<React.ComponentProps<typeof StyledText>, 'padding'>,
  'type'
> & {
  type?: 'error' | 'info';
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  theme: Theme;
};

const HelperText = ({ style, type = 'info', theme, ...rest }: Props) => {
  const { colors, dark } = theme;

  const textColor =
    type === 'error'
      ? colors?.error
      : color(theme?.colors?.text)
          .alpha(dark ? 0.7 : 0.54)
          .rgb()
          .string();

  return (
    <StyledText
      style={[
        styles.text,
        styles.padding,
        {
          color: textColor,
        },
        style,
      ]}
      {...rest}
    >
      {rest.children}
    </StyledText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    paddingVertical: 4,
  },
  padding: {
    paddingHorizontal: 12,
  },
});

export default withTheme(HelperText);
