import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

import color from 'color';

import { withTheme } from '../../core/theming';
import { black, white } from '../../styles/colors';

import type { $RemoveChildren, Theme } from '../../types';

export type Props = $RemoveChildren<typeof View> & {
  leftInset?: boolean;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const Divider = ({ leftInset, style, theme, ...rest }: Props) => {
  const { dark: isDarkTheme } = theme;
  const dividerColor = color(isDarkTheme ? white : black)
    .alpha(0.12)
    .rgb()
    .string();

  return (
    <View
      {...rest}
      style={[
        { height: StyleSheet.hairlineWidth, backgroundColor: dividerColor },
        leftInset && styles.leftInset,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  leftInset: {
    marginLeft: 72,
  },
});

export default withTheme(Divider);
