import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import type { Theme } from '../../types';
import { withTheme } from '../../core/theming';
import TextInput from '../Form/Input/TextInput';

import { View } from '../View';
import SelectDialog from './SelectDialog';
import type { DataItem, Props } from './types';
import SelectModal from './SelectModal';
import IconButton from '../IconButton/IconButton';

type InputProps = Props & {
  label: string;
  name?: string;
  methods?: any;
  rules?: any;
  error?: string;
  showDropDown?: boolean;
  type?: 'modal' | 'dialog';
  onSelect?: (item: DataItem) => void;
  theme: Theme;
};
const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';

const SelectInput = ({
  label,
  name,
  data,
  selectedValue,
  type = 'dialog',
  error,
  rules,
  methods,
  showDropDown = true,
  onSelect,
  theme,
}: InputProps) => {
  const selectedItem_: DataItem = methods
    ? (data.find(
        (item) => item?.label === methods?.getValues(name)
      ) as DataItem)
    : selectedValue
    ? (data.find((item) => item?.value === selectedValue) as DataItem)
    : data[0];
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem>(undefined);
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
            value={selectedItem ? selectedItem?.label : selectedItem_?.label}
            right={
              showDropDown && <IconButton size={12} icon={{ uri: dropDown }} />
            }
          />
        </View>
      </TouchableOpacity>
      <ModalComponent
        closeAction={hideModal}
        selectedValue={
          selectedItem ? selectedItem?.value : selectedItem_?.value
        }
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
