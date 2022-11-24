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
import { INPUT_PADDING_HORIZONTAL } from '../Form/Input/constants';

type InputProps = Props & {
  label: string;
  name?: string;
  methods?: any;
  rules?: any;
  placeholder?: string;
  error?: string;
  flagValue?: string;
  errorLabelStyle?: StyleProp<TextStyle>;
  onSelect?: (item: DataItem) => void;
  theme: Theme;
};

const PhoneNumberInput = ({
  label,
  name = 'phone',
  data = countries,
  error,
  placeholder,
  flagValue = 'flag',
  value: ValueName = 'dial_code',
  rules,
  methods,
  errorLabelStyle,
  onSelect,
  theme,
}: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem>(data[0]);

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
                    <Text style={{ paddingLeft: INPUT_PADDING_HORIZONTAL }}>
                      {selectedItem[flagValue]}
                    </Text>
                  }
                  label={label}
                  error={error || methods?.formState?.errors[name]?.message}
                  editable={false}
                  methods={methods}
                  showErrorLabel={false}
                  name={(name + '_code') as string}
                  rules={rules}
                  containerStyle={{
                    minWidth: 100,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderRightWidth: 0,
                  }}
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
              showErrorLabel={false}
              error={error || methods?.formState?.errors[name]?.message}
              methods={methods}
              name={name as string}
              rules={rules}
            />
          </View>
        </View>
        {error ||
          (methods?.formState?.errors[name]?.message && (
            <HelperText
              type="error"
              style={theme?.styles?.input?.errorLabelStyle || errorLabelStyle}
            >
              {error != null
                ? error
                : methods?.formState?.errors[name]?.message}
            </HelperText>
          ))}
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
