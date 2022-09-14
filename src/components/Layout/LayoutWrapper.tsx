import React from 'react';
import { StatusBar } from 'react-native';
import color from 'color';

import LayoutScroll from './LayoutScroll';
import Layout from './Layout';
import { withTheme } from '../../core/theming';

import type { Props } from './types';

const LayoutWrapper = (props: Props) => {
  const { scroll, theme } = props;
  const statusBarColor = color(theme?.colors?.primary).darken(0.2).hex();

  return (
    <React.Fragment>
      <StatusBar barStyle={'light-content'} backgroundColor={statusBarColor} />
      {scroll ? <LayoutScroll {...props} /> : <Layout {...props} />}
    </React.Fragment>
  );
};

export default withTheme(LayoutWrapper);
