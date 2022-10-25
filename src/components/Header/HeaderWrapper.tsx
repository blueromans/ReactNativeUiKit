import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  SafeAreaView,
  ViewStyle,
  Platform,
} from 'react-native';
import { Header } from './Header';
import { withTheme } from '../../core/theming';
import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import type { Theme } from '../../types';
import { DEFAULT_Header_HEIGHT, getHeaderColor } from './utils';

export type Props = React.ComponentProps<typeof Header> & {
  dark?: boolean;
  statusBarHeight?: number;
  bg?: string;
  children: React.ReactNode;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
  elevated?: boolean;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
};

const HeaderWrapper = ({
  statusBarHeight,
  style,
  dark,
  mode = Platform.OS === 'ios' ? 'center-aligned' : 'small',
  bg,
  elevated = false,
  ...rest
}: Props) => {
  const {
    height = DEFAULT_Header_HEIGHT,
    elevation = 4,
    zIndex = 0,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  const backgroundColor = bg ? bg : getHeaderColor(rest.theme, elevated);

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
      <Header
        style={[{ height, backgroundColor }, styles.Header, restStyle]}
        dark={dark}
        {...rest}
      />
    </Wrapper>
  );
};

HeaderWrapper.displayName = 'Header.Wrapper';

const styles = StyleSheet.create({
  Header: {
    elevation: 0,
  },
});

export default withTheme(HeaderWrapper);

// @component-docs ignore-next-line
const HeaderWrapperWithTheme = withTheme(HeaderWrapper);
// @component-docs ignore-next-line
export { HeaderWrapperWithTheme as HeaderWrapper };
