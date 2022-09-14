import React from 'react';
import { View } from 'react-native';

export type Props = {
  onValueChange: (value: string) => void;
  value: string;
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string;
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

const RadioButtonGroup = ({ value, onValueChange, children }: Props) => (
  <RadioButtonContext.Provider value={{ value, onValueChange }}>
    <View>{children}</View>
  </RadioButtonContext.Provider>
);

RadioButtonGroup.displayName = 'RadioButton.Group';
export default RadioButtonGroup;

export { RadioButtonGroup };
