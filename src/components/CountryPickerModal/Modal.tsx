/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';

import RNModal from '../Modal/Modal';
import { Divider } from '../Divider';
import type { DataItem, Props } from './types';
import type { Props as ModalProps } from '../Modal/Modal';
import { withTheme } from '../../core/theming';
import Header from '../Header';
import ListItem from '../List/ListItem';
import countries from '../../data/countryCodes.json';
import { View } from '../View';

type SelectModalProps = Props &
  ModalProps & { flagValue?: string; title?: string; closeAction?: () => void };

const CountryPickerModal = ({
  data = countries,
  selectedValue,
  onPressItem = (_item) => null,
  title,
  style,
  flagValue = 'flag',
  value: ValueName = 'code',
  label: LabelName = 'name',
  closeAction,
  theme,
  ...rest
}: SelectModalProps) => {
  const [value, setValue] = useState<string>(
    selectedValue || data[0][ValueName]
  );
  const FlagItem = ({ item }: { item: any }) => (
    <View middle center>
      <Text>{item[flagValue]}</Text>
    </View>
  );
  const _renderItem = ({ item }: { item: any }) => (
    <ListItem
      left={() => <FlagItem item={item} />}
      title={item[LabelName]}
      onPress={() => _onPressItem(item[ValueName])}
    />
  );

  const keyExtractor = (_item: any, index: number) => `key-${index}`;

  const Divider_ = () => <Divider />;

  const _onPressItem = (_value: string) => {
    console.log(value);
    setValue(_value);
    const item: DataItem = data?.find(
      (_item) => _item[ValueName] === _value
    ) as DataItem;
    onPressItem(item);
  };
  return (
    <RNModal {...rest}>
      <Header.Wrapper>
        <Header.Content title={title} />
        <Header.Action icon="close" onPress={closeAction} />
      </Header.Wrapper>
      <RNModal.Content theme={theme} style={styles.contentStyle}>
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
      </RNModal.Content>
    </RNModal>
  );
};
const styles = StyleSheet.create({
  contentStyle: { flex: 1, justifyContent: 'flex-start' },
});
export default withTheme(CountryPickerModal);
