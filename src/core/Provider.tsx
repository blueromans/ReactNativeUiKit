import React from 'react';

import { ThemeProvider } from './theming';
import type { ThemeProp } from '../types';
import { AppTheme } from '../styles/theme';

export type Props = {
  children: React.ReactNode;
  theme?: ThemeProp;
};

const Provider = (props: Props) => {
  const getTheme = () => {
    const extendedThemeBase = {
      ...AppTheme,
      ...props.theme,
    };

    return {
      ...extendedThemeBase,
    } as ReactNativeUiKit.AppTheme;
  };

  return <ThemeProvider theme={getTheme()}></ThemeProvider>;
};

export default Provider;
