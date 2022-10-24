import SelectComponent from './Select';
import SelectDialog from './SelectDialog';
import SelectList from './SelectList';
import SelectModal from './SelectModal';

const Select = Object.assign(SelectComponent, {
  List: SelectList,
  Dialog: SelectDialog,
  Modal: SelectModal,
});

export default Select;
