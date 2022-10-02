import React from 'react';
import { StatusBar } from 'react-native';
import color from 'color';

import LayoutScroll from './LayoutScroll';
import Layout from './Layout';
import { withTheme } from '../../core/theming';

import type { Props } from './types';
import { SnackBarWrapper } from '../SnackBar';

const LayoutWrapper = (props: Props) => {
  const handleSnackBar = (ref: any) => SnackBarWrapper.setRef(ref);
  const {
    scroll,
    theme,
    statusBarStyle = 'light-content',
    statusBarColor,
  } = props;
  const statusBarBackground = color(statusBarColor)
    ? statusBarColor
    : color(theme?.colors?.primary).darken(0.3).hex();
  return (
    <React.Fragment>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackground}
      />
      {scroll ? <LayoutScroll {...props} /> : <Layout {...props} />}
      <SnackBarWrapper theme={theme} ref={handleSnackBar} />
    </React.Fragment>
  );
};

export default withTheme(LayoutWrapper);
