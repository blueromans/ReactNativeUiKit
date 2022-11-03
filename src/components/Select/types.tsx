import type { StyleProp, ViewStyle } from 'react-native';

export type DataItem = { value: string; label: string; selected: boolean };

export type Props = {
  data: Array<DataItem>;
  style?: StyleProp<ViewStyle>;
  onPressItem: (item: any) => void;
};
