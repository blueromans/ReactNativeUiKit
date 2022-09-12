import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

import color from 'color';

import { withTheme } from '../../core/theming';
import { black, white } from '../../styles/colors';

import type { $RemoveChildren, Theme } from '../../types';

export type Props = $RemoveChildren<typeof View> & {
  leftInset?: boolean;
  horizontalInset?: boolean;
  bold?: boolean;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const Divider = ({
  leftInset,
  horizontalInset = false,
  style,
  theme,
  bold = false,
  ...rest
}: Props) => {
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
  horizontalInset: {
    marginLeft: 28,
    marginRight: 28,
  },
  bold: {
    height: 1,
  },
});

export default withTheme(Divider);
