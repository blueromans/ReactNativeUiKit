import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '../../core/theming';
import SegmentedButtonItem from './SegmentedButtonItem';
import { getDisabledSegmentedButtonStyle } from './utils';
import type { IconSource } from '../Icon/Icon';

type ConditionalValue =
  | {
      value: string[];
      multiSelect: true;
      onValueChange: (value: string[]) => void;
    }
  | {
      value: string;
      multiSelect?: false;
      onValueChange: (value: string) => void;
    };

export type Props = {
  buttons: {
    value: string;
    icon?: IconSource;
    disabled?: boolean;
    onPress?: () => void;
    label?: string;
    showSelectedCheck?: boolean;
    style?: StyleProp<ViewStyle>;
  }[];
  density?: 'regular' | 'small' | 'medium' | 'high';
  style?: StyleProp<ViewStyle>;
} & ConditionalValue;

const SegmentedButtons = ({
  value,
  onValueChange,
  buttons,
  multiSelect,
  density,
  style,
}: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.row, style]}>
      {buttons.map((item, i) => {
        const disabledChildStyle = getDisabledSegmentedButtonStyle({
          theme,
          buttons,
          index: i,
        });
        const segment =
          i === 0 ? 'first' : i === buttons.length - 1 ? 'last' : undefined;

        const checked =
          multiSelect && Array.isArray(value)
            ? value.includes(item.value)
            : value === item.value;

        const onPress = () => {
          item.onPress?.();

          const nextValue =
            multiSelect && Array.isArray(value)
              ? checked
                ? value.filter((val) => item.value !== val)
                : [...value, item.value]
              : item.value;

          // @ts-expect-error: TS doesn't preserve types after destructuring, so the type isn't inferred correctly
          onValueChange(nextValue);
        };

        return (
          <SegmentedButtonItem
            {...item}
            key={i}
            checked={checked}
            segment={segment}
            density={density}
            onPress={onPress}
            style={[item.style, disabledChildStyle]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default SegmentedButtons;

export { SegmentedButtons };
