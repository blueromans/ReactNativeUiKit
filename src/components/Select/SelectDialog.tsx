import React from 'react';
import Dialog from '../Dialog/Dialog';

import type { Props } from './types';
import type { Props as DialogProps } from '../Dialog/Dialog';
import Select from './Select';

type SelectDialogProps = Props & DialogProps & { title: string };

const SelectDialog = ({
  data,
  onPressItem,
  title,
  ...rest
}: SelectDialogProps) => {
  return (
    <Dialog {...rest}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Select.List data={data} onPressItem={onPressItem} />
      </Dialog.Content>
    </Dialog>
  );
};
SelectDialog.displayName = 'Select.Dialog';

export default SelectDialog;
