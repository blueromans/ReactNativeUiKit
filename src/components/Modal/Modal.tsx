import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import Modal, { Direction } from 'react-native-modal';

import { withTheme } from '../../core/theming';

export type Props = {
  hideModal?: () => void;
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
  hideModal,
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
      onSwipeComplete={hideModal}
      backdropColor={backdropColor ? backdropColor : theme?.colors?.backdrop}
      style={[theme?.styles?.modalStyle, style]}
      avoidKeyboard={true}
      useNativeDriver={true}
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      propagateSwipe={true}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      {...rest}
    >
      {children}
    </Modal>
  );
}

export default withTheme(RnModal);
