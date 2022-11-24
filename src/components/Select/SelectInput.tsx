import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import type { Theme } from '../../types';
import { withTheme } from '../../core/theming';
import TextInput from '../Form/Input/TextInput';

import { View } from '../View';
import SelectDialog from './SelectDialog';
import type { DataItem, Props } from './types';
import SelectModal from './SelectModal';

type InputProps = Props & {
  label: string;
  name?: string;
  methods?: any;
  rules?: any;
  error?: string;
  type?: 'modal' | 'dialog';
  onSelect?: (item: DataItem) => void;
  theme: Theme;
};

const SelectInput = ({
  label,
  name,
  data,
  selectedValue,
  type = 'dialog',
  error,
  rules,
  methods,
  onSelect,
  theme,
}: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem>(
    selectedValue
      ? (data.find((item) => item?.value === selectedValue) as DataItem)
      : data[0]
  );
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleItem = (item: DataItem) => {
    if (methods) {
      methods?.setValue(name, item.label, { shouldValidate: true });
    }
    if (onSelect) {
      onSelect(item);
    }
    setSelectedItem(item);
    hideModal();
  };
  const ModalComponent = type === 'dialog' ? SelectDialog : SelectModal;
  return (
    <React.Fragment>
      <TouchableOpacity activeOpacity={1} onPress={showModal}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            error={error}
            editable={false}
            methods={methods}
            name={name as string}
            rules={rules}
            value={selectedItem?.label}
          />
        </View>
      </TouchableOpacity>
      <ModalComponent
        closeAction={hideModal}
        selectedValue={selectedItem?.value}
        title={label}
        theme={theme}
        data={data}
        visible={visible}
        onPressItem={handleItem}
      />
    </React.Fragment>
  );
};
SelectInput.displayName = 'Select.Input';

export default withTheme(SelectInput);
