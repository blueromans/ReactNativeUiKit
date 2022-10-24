import React from 'react';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { View } from '../View';
import { ActivityIndicator } from '../ActivityIndicator';
import { AwareView } from '../AwareView';

import type { Props } from './types';

const LayoutWrapper = (props: Props) => {
  const TOP_INSET = getStatusBarHeight(true);
  const BOTTOM_INSET = getBottomSpace();
  const {
    bg,
    theme,
    p: padding = 0,
    children,
    style,
    insetTop = false,
    insetBottom = false,
    pb,
    pt,
    pl,
    pr,
    ...rest
  } = props;
  return (
    <View flex={1} bg={bg ?? theme?.colors?.background}>
      <AwareView
        style={[
          {
            paddingTop: pt ? pt : insetTop ? padding + TOP_INSET : padding + 0,
            paddingBottom: pb
              ? pb
              : insetBottom
              ? padding + BOTTOM_INSET
              : padding + 0,
            paddingRight: pr ? pr : padding,
            paddingLeft: pl ? pl : padding,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </AwareView>
    </View>
  );
};

const LayoutAware = (props: Props) => {
  const { loading } = props;
  if (loading) {
    return <ActivityIndicator />;
  }
  return <LayoutWrapper {...props} />;
};

export default LayoutAware;
