import React from 'react';
import { StatusBar, StatusBarStyle, StyleProp, ViewStyle } from 'react-native';
import color from 'color';

import { AppTheme } from '../../styles/theme';
import { Layout } from '../Layout';
import { SnackBarWrapper } from '../SnackBar';
import { ThemeProvider } from '../../core/theming';
import type { Theme } from '../../types';
import { View } from '../View';

export type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  appBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  insetTop: boolean;
  insetBottom: boolean;
  theme?: Theme;
};

const AppWrapper = (props: Props) => {
  const {
    theme = AppTheme,
    style,
    appBackgroundColor,
    statusBarStyle = 'light-content',
    statusBarColor,
    insetBottom = false,
    insetTop = false,
    children,
  } = props;
  const handleSnackBar = (ref: any) => SnackBarWrapper.setRef(ref);
  const statusBarBackground = statusBarColor
    ? statusBarColor
    : color(theme?.colors?.primary).darken(0.3).hex();
  const backgroundColor = appBackgroundColor
    ? appBackgroundColor
    : theme?.colors?.background;

  return (
    <View flex={1} bg={backgroundColor}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackground}
        />
        <Layout insetBottom={insetBottom} insetTop={insetTop} style={style}>
          {children}
        </Layout>
        <SnackBarWrapper theme={theme} ref={handleSnackBar} />
      </ThemeProvider>
    </View>
  );
};

export default AppWrapper;
