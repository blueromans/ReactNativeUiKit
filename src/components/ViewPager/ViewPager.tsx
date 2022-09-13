import React from 'react';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import PagerView from 'react-native-pager-view';

export type Props = React.ComponentProps<typeof PagerView> & {
  flex?: number;
  items: any;
  initialPage?: number;
  renderItem?: (item: object, index: number) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const ViewPager = ({
  flex,
  items = [],
  initialPage = 0,
  style,
  renderItem = () => null,
  ...rest
}: Props) => {
  return (
    <PagerView initialPage={initialPage} style={styles.pagerView} {...rest}>
      {items.map((item: any, index: number) => renderItem(item, index))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default ViewPager;
