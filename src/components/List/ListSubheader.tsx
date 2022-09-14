import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import color from 'color';

import Text from '../Typography/Text';
import type { Theme } from '../../types';

export type Props = React.ComponentProps<typeof Text> & {
  theme?: Theme;
  style?: StyleProp<TextStyle>;
};

const ListSubheader = ({ style, theme, ...rest }: Props) => {
  const textColor = color(theme?.colors?.text).alpha(0.54).rgb().string();

  return (
    <Text
      numberOfLines={1}
      {...rest}
      style={[
        styles.container,
        {
          color: textColor,
          ...theme?.fonts?.regular,
        },
        style,
      ]}
    />
  );
};

ListSubheader.displayName = 'List.Subheader';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
});

export default ListSubheader;
