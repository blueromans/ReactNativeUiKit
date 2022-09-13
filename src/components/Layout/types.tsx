import type { StyleProp, ViewStyle } from 'react-native';

import type { View } from '../View';
import type { Theme } from '../../types';

export type Props = React.ComponentProps<typeof View> & {
  insetBottom: number;
  insetTop: number;
  bg: string;
  loading: boolean;
  scroll: boolean;
  padding: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  theme?: Theme;
};
