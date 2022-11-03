import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import type { Theme } from '../../types';
import { withTheme } from '../../core/theming';
import TextInput from '../Form/Input/TextInput';

import { View } from '../View';
import SelectDialog from './SelectDialog';
import type { DataItem, Props } from './types';

type InputProps = Props & {
  label: string;
  name?: string;
  methods?: any;
  rules?: any;
  error?: string;
  onSelect?: (item: DataItem) => void;
  theme: Theme;
};

const SelectInput = ({
  label,
  name,
  data,
  error,
  rules,
  methods,
  onSelect,
  theme,
}: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleItem = (item: DataItem) => {
    if (methods) {
      methods?.setValue(name, item.label, { shouldValidate: true });
    }
    if (onSelect) {
      onSelect(item);
    }
    hideModal();
  };

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
          />
        </View>
      </TouchableOpacity>
      <SelectDialog
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
