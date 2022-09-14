import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButton from './ToggleButton';

export type Props = {
  onValueChange: (value: string) => void;
  value: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ToggleButtonRow = ({ value, onValueChange, children, style }: Props) => {
  const count = React.Children.count(children);

  return (
    <ToggleButtonGroup value={value} onValueChange={onValueChange}>
      <View style={[styles.row, style]}>
        {React.Children.map(children, (child, i) => {
          // @ts-expect-error: TypeScript complains about child.type but it doesn't matter
          if (child && child.type === ToggleButton) {
            // @ts-expect-error: We're sure that child is a React Element
            return React.cloneElement(child, {
              style: [
                styles.button,
                i === 0
                  ? styles.first
                  : i === count - 1
                  ? styles.last
                  : styles.middle,
                // @ts-expect-error: We're sure that child is a React Element
                child.props.style,
              ],
            });
          }

          return child;
        })}
      </View>
    </ToggleButtonGroup>
  );
};

ToggleButtonRow.displayName = 'ToggleButton.Row';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: StyleSheet.hairlineWidth,
  },

  first: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  middle: {
    borderRadius: 0,
    borderLeftWidth: 0,
  },

  last: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default ToggleButtonRow;

export { ToggleButtonRow };