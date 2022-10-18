import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from '../Divider';
import RadioButton from '../RadioButton';
import type { Props } from './types';

const SelectList = ({ data, style, onSelectItem }: Props) => {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const { name } = item;
    return (
      <RadioButton
        key={index}
        onPress={() => onSelectItem(item)}
        value={name}
      />
    );
  };
  const keyExtractor = (_item: any, index: number) => `key-${index}`;

  const Divider_ = () => <Divider />;

  return (
    <FlatList
      style={[style]}
      data={data}
      scrollEnabled={data.length > 0}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: data.length === 0 ? 'center' : 'flex-start',
        paddingBottom: data.length === 0 ? 0 : 20,
      }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider_}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
export default SelectList;
