import React from 'react';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import RNPagerView from 'react-native-pager-view';

export type Props = React.ComponentProps<typeof RNPagerView> & {
  flex?: number;
  items: any;
  initialPage?: number;
  renderItem?: (item: object, index: number) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const PagerView = ({
  flex,
  items = [],
  initialPage = 0,
  style,
  renderItem = () => null,
  ...rest
}: Props) => {
  return (
    <RNPagerView initialPage={initialPage} style={styles.pagerView} {...rest}>
      {items.map((item: any, index: number) => renderItem(item, index))}
    </RNPagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default PagerView;
