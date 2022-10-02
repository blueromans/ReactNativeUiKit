import React from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleProp,
  TextStyle,
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
  appBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  snackBarStyle?: { titleStyle?: TextStyle; subTitleStyle: TextStyle };
  theme?: Theme;
};

const AppWrapper = (props: Props) => {
  const {
    theme = AppTheme,
    style,
    appBackgroundColor,
    statusBarStyle = 'light-content',
    statusBarColor,
    snackBarStyle = { titleStyle: {}, subTitleStyle: {} },
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
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackground}
          />
          <Layout insetBottom insetTop style={style}>
            {children}
          </Layout>
          <SnackBarWrapper
            theme={theme}
            titleStyle={snackBarStyle?.titleStyle}
            subTitleStyle={snackBarStyle?.subTitleStyle}
            ref={handleSnackBar}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default AppWrapper;
