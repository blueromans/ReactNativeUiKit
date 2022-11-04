/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Divider } from '../Divider';
import RadioButton from '../RadioButton';
import type { DataItem, Props } from './types';

const SelectList = ({ data, style, selectedValue, onPressItem }: Props) => {
  const [value, setValue] = useState<string>(selectedValue || data[0]?.value);

  const _renderItem = ({ item }: { item: any }) => (
    <RadioButton.Item label={item?.label} value={item.value} />
  );

  const keyExtractor = (_item: any, index: number) => `key-${index}`;

  const Divider_ = () => <Divider />;

  const _onPressItem = (_value: string) => {
    setValue(_value);
    const item: DataItem = data?.find(
      (_item) => _item.value === _value
    ) as DataItem;
    onPressItem(item);
  };

  return (
    <RadioButton.Group onValueChange={_onPressItem} value={value}>
      <FlatList
        style={[style]}
        data={data || []}
        scrollEnabled={data?.length > 0}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: data?.length === 0 ? 'center' : 'flex-start',
          paddingBottom: data?.length === 0 ? 0 : 20,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Divider_}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
      />
    </RadioButton.Group>
  );
};
SelectList.displayName = 'Select.List';

export default SelectList;
