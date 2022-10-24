import React from 'react';

import LayoutAware from './LayoutAware';
import LayoutScroll from './LayoutScroll';
import LayoutView from './LayoutView';
import { withTheme } from '../../core/theming';

import type { Props } from './types';

const Layout = (props: Props) => {
  const { scroll, aware } = props;
  if (scroll) {
    return <LayoutScroll {...props} />;
  }
  if (aware) {
    return <LayoutAware {...props} />;
  }
  return <LayoutView {...props} />;
};

export default withTheme(Layout);
