import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View } from '../View';
import { ActivityIndicator } from '../ActivityIndicator';

import type { Props } from './types';

const LayoutView = (props: Props) => {
  const { top, left, bottom, right } = useSafeAreaInsets();
  const {
    bg,
    theme,
    padding = 0,
    children,
    style,
    insetTop,
    insetBottom,
    ...rest
  } = props;
  return (
    <View
      flex={1}
      style={[
        {
          paddingTop: insetTop ? padding + top : padding + 0,
          paddingBottom: insetBottom ? padding + bottom : padding + 0,
          paddingRight: padding + right,
          paddingLeft: padding + left,
        },
        style,
      ]}
      bg={bg ?? theme?.colors?.background}
      {...rest}
    >
      {children}
    </View>
  );
};

const Layout = (props: Props) => {
  const { loading } = props;
  return loading ? <ActivityIndicator /> : <LayoutView {...props} />;
};

export default Layout;
