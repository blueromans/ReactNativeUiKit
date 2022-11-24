import type { StyleProp, ViewStyle } from 'react-native';

export type DataItem = any;

export type Props = {
  value?: string;
  label?: string;
  data: Array<DataItem>;
  style?: StyleProp<ViewStyle>;
  selectedValue?: string;
  onPressItem: (item: any) => void;
};
