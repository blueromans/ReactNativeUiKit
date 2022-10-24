import type { $DeepPartial } from '@callstack/react-theme-provider';
import type React from 'react';
import type { ColorValue, StyleProp, View, ViewStyle } from 'react-native';

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Mode = 'adaptive' | 'exact';

export type Colors = {
  primary: string;
  background: string;
  surface: string;
  onSurface: string;
  accent: string;
  error: string;
  text: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;
};

export type ThemeProp = $DeepPartial<ReactNativeUiKit.AppTheme>;

export type Theme = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  colors?: Colors;
  fonts?: Fonts;
  baseHeight?: number;
  settings?: any;
  styles?: any;
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type EllipsizeProp = 'head' | 'middle' | 'tail' | 'clip';

export type ViewProps = React.ComponentProps<typeof View> & {
  flex?: number;
  row?: boolean;
  center?: boolean;
  start?: boolean;
  end?: boolean;
  middle?: boolean;
  bottom?: boolean;
  top?: boolean;
  between?: boolean;
  around?: boolean;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  mv?: number;
  mh?: number;
  p?: number;
  m?: number;
  pl?: number;
  pr?: number;
  pv?: number;
  ph?: number;
  pb?: number;
  pt?: number;
  bg?: ColorValue;
  bc?: string;
  full?: boolean;
  br?: number;
  btlr?: number;
  btrr?: number;
  bblr?: number;
  bbrr?: number;
};
