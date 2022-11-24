/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, Text } from 'react-native';
import type { Theme } from '../../types';
import { withTheme } from '../../core/theming';
import TextInput from '../Form/Input/TextInput';

import { View } from '../View';
import CountryPickerModal from '../CountryPickerModal/Modal';
import type { DataItem, Props } from './types';
import countries from '../../data/countryCodes.json';
import { HelperText } from '../Typography';
import IconButton from '../IconButton/IconButton';
import { INPUT_PADDING_HORIZONTAL } from '../Form/Input/constants';

type InputProps = Props & {
  label: string;
  name?: string;
  methods?: any;
  rules?: any;
  placeholder?: string;
  error?: string;
  flagValue?: string;
  showFlag?: boolean;
  showDropDown?: boolean;
  errorLabelStyle?: StyleProp<TextStyle>;
  onSelect?: (item: DataItem) => void;
  theme: Theme;
};
const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';
const PhoneNumberInput = ({
  label,
  name = 'phone',
  data = countries,
  error: errorMessage,
  placeholder,
  selectedValue,
  flagValue = 'flag',
  value: ValueName = 'dial_code',
  rules,
  showFlag = true,
  showDropDown = true,
  methods,
  errorLabelStyle,
  onSelect,
  theme,
}: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem>(
    selectedValue
      ? (data.find((item) => item[ValueName] === selectedValue) as DataItem)
      : data[0]
  );
  const error: boolean =
    errorMessage != null || methods?.formState?.errors[name]?.message != null
      ? true
      : false;
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleItem = (item: DataItem) => {
    console.log(item);
    if (methods) {
      methods?.setValue(name + '_code', item[ValueName], {
        shouldValidate: true,
      });
    }
    if (onSelect) {
      onSelect(item);
    }
    setSelectedItem(item);
    hideModal();
  };
  useEffect(() => {
    if (methods) {
      methods?.setValue(name + '_code', data[0][ValueName], {
        shouldValidate: true,
      });
    }
  }, []);
  return (
    <React.Fragment>
      <React.Fragment>
        <View full row>
          <View>
            <TouchableOpacity activeOpacity={1} onPress={showModal}>
              <View pointerEvents="none">
                <TextInput
                  left={
                    showFlag && (
                      <Text
                        style={{
                          paddingLeft: INPUT_PADDING_HORIZONTAL,
                        }}
                      >
                        {selectedItem[flagValue]}
                      </Text>
                    )
                  }
                  label={label}
                  error={error || methods?.formState?.errors[name]?.message}
                  editable={false}
                  methods={methods}
                  showErrorLabel={false}
                  name={(name + '_code') as string}
                  rules={rules}
                  containerStyle={{
                    minWidth: 110,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderRightWidth: 0,
                  }}
                  style={{
                    paddingHorizontal: 0,
                    paddingLeft: 10,
                  }}
                  right={
                    showDropDown && (
                      <IconButton size={12} icon={{ uri: dropDown }} />
                    )
                  }
                  value={selectedItem[ValueName]}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View flex={1} bottom>
            <TextInput
              keyboardType="numeric"
              placeholder={placeholder}
              containerStyle={{
                borderLeftWidth: 0,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
              style={{
                paddingHorizontal: 0,
                paddingRight: INPUT_PADDING_HORIZONTAL,
              }}
              showErrorLabel={false}
              error={error || methods?.formState?.errors[name]?.message}
              methods={methods}
              name={name as string}
              rules={rules}
            />
          </View>
        </View>
        {error && (
          <HelperText
            type="error"
            style={theme?.styles?.input?.errorLabelStyle || errorLabelStyle}
          >
            {errorMessage != null
              ? errorMessage
              : methods?.formState?.errors[name]?.message}
          </HelperText>
        )}
      </React.Fragment>

      <CountryPickerModal
        flagValue={flagValue}
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

export default withTheme(PhoneNumberInput);
