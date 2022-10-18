import type { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  data: Array<{ key: number; value: string }>;
  style?: StyleProp<ViewStyle>;
  onSelectItem: (item: any) => null;
};
