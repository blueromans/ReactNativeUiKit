import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  SafeAreaView,
  ViewStyle,
  Platform,
} from 'react-native';
import { AppBar } from './AppBar';
import { withTheme } from '../../core/theming';
import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import type { Theme } from '../../types';
import {
  DEFAULT_AppBar_HEIGHT,
  getAppBarColor,
} from './utils';

export type Props = React.ComponentProps<typeof AppBar> & {
  dark?: boolean;
  statusBarHeight?: number;
  children: React.ReactNode;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
  elevated?: boolean;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
};


const AppBarHeader = ({
  statusBarHeight,
  style,
  dark,
  mode = Platform.OS === 'ios' ? 'center-aligned' : 'small',
  elevated = false,
  ...rest
}: Props) => {

  const {
    height = DEFAULT_AppBar_HEIGHT,
    elevation =  4,
    backgroundColor: customBackground,
    zIndex = 0,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  const backgroundColor = getAppBarColor(
    rest.theme,
    elevated
  );

  // Let the user override the behaviour
  const Wrapper = typeof statusBarHeight === 'number' ? View : SafeAreaView;
  return (
    <Wrapper
      style={
        [
          {
            backgroundColor,
            zIndex,
            elevation,
            paddingTop: statusBarHeight ?? APPROX_STATUSBAR_HEIGHT,
          },
        ] as StyleProp<ViewStyle>
      }
    >
      <AppBar
        style={[{ height, backgroundColor }, styles.AppBar, restStyle]}
        dark={dark}
        {...rest}
      />
    </Wrapper>
  );
};

AppBarHeader.displayName = 'AppBar.Header';

const styles = StyleSheet.create({
  AppBar: {
    elevation: 0,
  },
});

export default withTheme(AppBarHeader);

// @component-docs ignore-next-line
const AppBarHeaderWithTheme = withTheme(AppBarHeader);
// @component-docs ignore-next-line
export { AppBarHeaderWithTheme as AppBarHeader };
