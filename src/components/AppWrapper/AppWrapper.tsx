import React from 'react';
import { StatusBar, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import color from 'color';

import { AppTheme } from '../../styles/theme';
import { Layout } from '../Layout';
import { SnackBarWrapper } from '../SnackBar';
import { ThemeProvider } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  theme?: Theme;
};

const AppWrapper = (props: Props) => {
  const { theme = AppTheme, style, children } = props;
  const handleSnackBar = (ref: any) => SnackBarWrapper.setRef(ref);
  const statusBarColor = color(theme?.colors?.primary).darken(0.3).hex();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={statusBarColor}
        />
        <Layout insetBottom insetTop style={style}>
          {children}
        </Layout>
        <SnackBarWrapper ref={handleSnackBar} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
