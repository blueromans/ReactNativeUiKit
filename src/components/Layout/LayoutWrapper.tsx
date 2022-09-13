import React from 'react';

import LayoutScroll from './LayoutScroll';
import Layout from './Layout';

import type { Props } from './types';

const LayoutWrapper = (props: Props) => {
  const { scroll } = props;
  return scroll ? <LayoutScroll {...props} /> : <Layout {...props} />;
};

export default LayoutWrapper;
