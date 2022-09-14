import React from 'react';
import color from 'color';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import Text from './Text';
import { withTheme } from '../../core/theming';
import type { $Omit, Theme } from '../../types';

export type Props = $Omit<
  $Omit<React.ComponentProps<typeof Text>, 'padding'>,
  'type'
> & {
  type?: 'error' | 'info';
  visible?: boolean;
  padding?: 'none' | 'normal';
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  theme: Theme;
};

const HelperText = ({
  style,
  type = 'info',
  visible = true,
  theme,
  padding = 'normal',
  ...rest
}: Props) => {
  const { colors, dark } = theme;

  const textColor =
    type === 'error'
      ? colors?.error
      : color(theme?.colors?.text)
          .alpha(dark ? 0.7 : 0.54)
          .rgb()
          .string();

  return (
    <Text
      style={[
        styles.text,
        padding !== 'none' ? styles.padding : {},
        {
          color: textColor,
        },
        style,
      ]}
      {...rest}
    >
      {rest.children}
    </Text>
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
