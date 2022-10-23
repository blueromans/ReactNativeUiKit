import React from 'react';
import Modal from '../Modal/Modal';

import type { Props } from './types';
import type { Props as ModalProps } from '../Modal/Modal';
import Select from './Select';

type SelectModalProps = Props & ModalProps;

const SelectModal = ({ data, onPressItem, ...rest }: SelectModalProps) => {
  return (
    <Modal {...rest}>
      <Select.List data={data} onPressItem={onPressItem} />
    </Modal>
  );
};
SelectModal.displayName = 'Select.Modal';

export default SelectModal;
