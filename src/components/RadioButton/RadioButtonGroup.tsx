import React from 'react';
import { View } from 'react-native';

export type Props = {
  onValueChange: (value: string) => void;
  value: string;
  color?: string;
  mode?: 'android' | 'ios';
  selectedColor?: string;
  position?: 'leading' | 'trailing';
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string;
  color?: string;
  mode?: 'android' | 'ios';
  selectedColor?: string;
  position?: 'leading' | 'trailing';
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

const RadioButtonGroup = ({
  value,
  onValueChange,
  color,
  mode,
  selectedColor,
  position = 'trailing',
  children,
}: Props) => (
  <RadioButtonContext.Provider
    value={{ value, onValueChange, color, mode, selectedColor, position }}
  >
    <View>{children}</View>
  </RadioButtonContext.Provider>
);

RadioButtonGroup.displayName = 'RadioButton.Group';
export default RadioButtonGroup;

export { RadioButtonGroup };
