import React from 'react';
import { StyleSheet, View, ViewStyle, Image, StyleProp } from 'react-native';

import { withTheme } from '../../core/theming';
import { grey200 } from '../../styles/colors';
import type { Theme } from '../../types';
import { getCardCoverStyle } from './utils';

export type Props = React.ComponentPropsWithRef<typeof Image> & {
  index?: number;
  total?: number;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const CardCover = ({ index, total, style, theme, ...rest }: Props) => {
  const coverStyle = getCardCoverStyle({ theme, index, total });

  return (
    <View style={[styles.container, coverStyle, style]}>
      <Image {...rest} style={[styles.image, coverStyle]} />
    </View>
  );
};

CardCover.displayName = 'Card.Cover';
const styles = StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: grey200,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    padding: 16,
    justifyContent: 'flex-end',
  },
});

export default withTheme(CardCover);

export { CardCover };
