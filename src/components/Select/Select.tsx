import type React from 'react';
import SelectDialog from './SelectDialog';
import SelectList from './SelectList';
import SelectModal from './SelectModal';

type Props = {
  children: React.ReactNode;
};
const Select = ({ children }: Props) => {
  return children;
};
// @component ./SelectList.tsx
Select.List = SelectList;
Select.Dialog = SelectDialog;
Select.Modal = SelectModal;

export default Select;
