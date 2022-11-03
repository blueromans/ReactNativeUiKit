import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Modal, { Direction } from 'react-native-modal';

import { withTheme } from '../../core/theming';
import ModalContent from './ModalContent';

export type Props = {
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  swipeDirection?: Direction;
  backdropOpacity?: any;
  backdropColor?: string;
  modalStyle?: StyleProp<ViewStyle>;
  theme: ReactNativeUiKit.AppTheme;
};

function RnModal({
  visible = false,
  children,
  style,
  swipeDirection = 'down',
  backdropOpacity,
  backdropColor,
  theme,
  ...rest
}: Props) {
  return (
    <Modal
      backdropOpacity={backdropOpacity}
      swipeDirection={swipeDirection}
      backdropColor={backdropColor ? backdropColor : theme?.colors?.backdrop}
      style={[styles.modalStyle, theme?.styles?.modal?.style, style]}
      avoidKeyboard={true}
      useNativeDriver={true}
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      propagateSwipe={true}
      {...rest}
    >
      {children}
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalStyle: { margin: 0 },
});
RnModal.Content = ModalContent;

export default withTheme(RnModal);
