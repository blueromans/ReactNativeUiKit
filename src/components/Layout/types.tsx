import type {
  ColorValue,
  StatusBarStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { View } from '../View';
import type { Theme } from '../../types';

export type Props = React.ComponentProps<typeof View> & {
  insetBottom?: boolean;
  insetTop?: boolean;
  bg?: ColorValue;
  loading?: boolean;
  scroll?: boolean;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  theme: Theme;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  snackBarStyle?: { titleStyle?: TextStyle; subTitleStyle: TextStyle };
};
