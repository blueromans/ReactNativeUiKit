import type { $DeepPartial } from '@callstack/react-theme-provider';
import type * as React from 'react';

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
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;
