import React from 'react';

import LayoutScroll from './LayoutScroll';
import Layout from './Layout';
import { withTheme } from '../../core/theming';

import type { Props } from './types';

const LayoutWrapper = (props: Props) => {
  const { scroll } = props;
  if (scroll) return <LayoutScroll {...props} />;
  return <Layout {...props} />;
};

export default withTheme(LayoutWrapper);
