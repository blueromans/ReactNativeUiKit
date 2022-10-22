import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import { Divider } from '../Divider';
import RadioButton from '../RadioButton';
import type { Props } from './types';

const SelectList = ({ data, style, onPressItem }: Props) => {
  const [value, setValue] = useState<Number>(data[0]?.value);

  const _renderItem = useCallback(({ item }: { item: any }) => {
    return <RadioButton.Item label={item?.label} value={item.value} />;
  }, []);

  const keyExtractor = (_item: any, index: number) => `key-${index}`;

  const Divider_ = () => <Divider />;

  const _onPressItem = (value: any) => {
    setValue(value);
    onPressItem(value);
  };

  return (
    <RadioButton.Group onValueChange={_onPressItem} value={value.toString()}>
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
export default SelectList;
