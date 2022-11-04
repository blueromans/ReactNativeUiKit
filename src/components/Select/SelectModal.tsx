import React from 'react';
import Modal from '../Modal/Modal';

import type { Props } from './types';
import type { Props as ModalProps } from '../Modal/Modal';
import Select from './Select';
import { withTheme } from '../../core/theming';

type SelectModalProps = Props & ModalProps;

const SelectModal = ({
  data,
  onPressItem,
  theme,
  ...rest
}: SelectModalProps) => {
  return (
    <Modal {...rest}>
      <Modal.Content theme={theme}>
        <Select.List data={data} onPressItem={onPressItem} />
      </Modal.Content>
    </Modal>
  );
};
SelectModal.displayName = 'Select.Modal';

export default withTheme(SelectModal);
