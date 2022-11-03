import type React from 'react';
import SelectDialog from './SelectDialog';
import SelectInput from './SelectInput';
import SelectList from './SelectList';
import SelectModal from './SelectModal';

type Props = {
  children: React.ReactNode;
};
const Select = ({ children }: Props) => children;
// @component ./SelectList.tsx
Select.List = SelectList;
Select.Dialog = SelectDialog;
Select.Modal = SelectModal;
Select.Input = SelectInput;

export default Select;
