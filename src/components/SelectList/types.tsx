import type { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  data: Array<{ value: number; label: string }>;
  style?: StyleProp<ViewStyle>;
  onPressItem: (item: any) => null;
};
