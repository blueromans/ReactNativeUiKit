import React from 'react';
import {
  ColorValue,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
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
  appBackgroundColor?: ColorValue;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  theme?: Theme;
};

const AppWrapper = (props: Props) => {
  const {
    theme = AppTheme,
    style,
    appBackgroundColor,
    statusBarStyle = 'light-content',
    statusBarColor,
    children,
  } = props;
  const handleSnackBar = (ref: any) => SnackBarWrapper.setRef(ref);
  const statusBarBackground = color(statusBarColor)
    ? statusBarColor
    : color(theme?.colors?.primary).darken(0.3).hex();

  const backgroundColor = color(appBackgroundColor)
    ? appBackgroundColor
    : color(theme?.colors?.background);

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor as ColorValue }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackground}
          />
          <Layout insetBottom insetTop style={style}>
            {children}
          </Layout>
          <SnackBarWrapper ref={handleSnackBar} />
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default AppWrapper;
