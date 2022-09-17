import React from 'react';

import { ThemeProvider } from './theming';
import type { ThemeProp } from '../types';
import { AppTheme } from '../styles/theme';
import { View } from '../components/View';

export type Props = {
  theme?: ThemeProp;
  children: React.ReactNode;
};

const Provider = (props: Props) => {
  const getTheme = () => {
    const defaultThemeBase = AppTheme;

    const extendedThemeBase = {
      ...defaultThemeBase,
      ...props.theme,
    };

    return {
      ...extendedThemeBase,
    } as ReactNativeUiKit.AppTheme;
  };

  const { children } = props;

  return (
    <View flex={1}>
      <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
    </View>
  );
};

export default Provider;
