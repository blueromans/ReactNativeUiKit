import type { StatusBarStyle, TextStyle } from 'react-native';

import type { Theme } from '../../types';
import type { ViewProps } from '../../types';

export type Props = ViewProps & {
  insetBottom?: boolean;
  insetTop?: boolean;
  loading?: boolean;
  aware?: boolean;
  scroll?: boolean;
  children: React.ReactNode;
  theme: Theme;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  snackBarStyle?: { titleStyle?: TextStyle; subTitleStyle: TextStyle };
};
