import React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  index?: number;
  total?: number;
  siblings?: Array<string>;
  style?: StyleProp<ViewStyle>;
};

const CardContent = ({ index, total, siblings, style, ...rest }: Props) => {
  const cover = 'withTheme(CardCover)';
  const title = 'withTheme(CardTitle)';

  let contentStyle, prev, next;

  if (typeof index === 'number' && siblings) {
    prev = siblings[index - 1];
    next = siblings[index + 1];
  }

  if (
    (prev === cover && next === cover) ||
    (prev === title && next === title) ||
    total === 1
  ) {
    contentStyle = styles.only;
  } else if (index === 0) {
    if (next === cover || next === title) {
      contentStyle = styles.only;
    } else {
      contentStyle = styles.first;
    }
  } else if (typeof total === 'number' && index === total - 1) {
    if (prev === cover || prev === title) {
      contentStyle = styles.only;
    } else {
      contentStyle = styles.last;
    }
  } else if (prev === cover || prev === title) {
    contentStyle = styles.first;
  } else if (next === cover || next === title) {
    contentStyle = styles.last;
  }

  return <View {...rest} style={[styles.container, contentStyle, style]} />;
};

CardContent.displayName = 'Card.Content';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  first: {
    paddingTop: 16,
  },
  last: {
    paddingBottom: 16,
  },
  only: {
    paddingVertical: 16,
  },
});

export default CardContent;
