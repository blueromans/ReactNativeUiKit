import React from 'react';
import { StyleSheet } from 'react-native';

import RNModal from '../Modal/Modal';
import type { Props } from './types';
import type { Props as ModalProps } from '../Modal/Modal';
import Select from './Select';
import { withTheme } from '../../core/theming';
import Header from '../Header';

type SelectModalProps = Props &
  ModalProps & { title?: string; closeAction?: () => void };

const SelectModal = ({
  data,
  selectedValue,
  onPressItem,
  title,
  closeAction,
  theme,
  ...rest
}: SelectModalProps) => {
  return (
    <RNModal {...rest}>
      <Header.Wrapper>
        <Header.Content title={title} />
        <Header.Action icon="close" onPress={closeAction} />
      </Header.Wrapper>
      <RNModal.Content theme={theme} style={styles.contentStyle}>
        <Select.List
          data={data}
          selectedValue={selectedValue}
          onPressItem={onPressItem}
        />
      </RNModal.Content>
    </RNModal>
  );
};
SelectModal.displayName = 'Select.Modal';
const styles = StyleSheet.create({
  contentStyle: { flex: 1, justifyContent: 'flex-start' },
});
export default withTheme(SelectModal);
