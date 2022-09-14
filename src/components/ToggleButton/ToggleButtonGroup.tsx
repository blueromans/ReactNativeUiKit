import React from 'react';

export type Props = {
  onValueChange: (value: string) => void | null;
  value: string | null;
  children: React.ReactNode;
};

type ToggleButtonContextType = {
  value: string | null;
  onValueChange: (item: string) => void | null;
};

export const ToggleButtonGroupContext =
  React.createContext<ToggleButtonContextType>(null as any);

const ToggleButtonGroup = ({ value, onValueChange, children }: Props) => (
  <ToggleButtonGroupContext.Provider
    value={{
      value,
      onValueChange,
    }}
  >
    {children}
  </ToggleButtonGroupContext.Provider>
);

ToggleButtonGroup.displayName = 'ToggleButton.Group';
export default ToggleButtonGroup;

export { ToggleButtonGroup };
