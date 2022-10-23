/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  BackHandler,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  NativeEventSubscription,
} from 'react-native';

import Modal, { Direction } from 'react-native-modal';

import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { withTheme } from '../../core/theming';
import { addEventListener } from '../../utils/addEventListener';

export type Props = {
  dismissable?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  swipeDirection?: Direction;
  backdropOpacity?: any;
  backdropColor?: string;
  modalStyle?: StyleProp<ViewStyle>;
  theme: ReactNativeUiKit.AppTheme;
};

const TOP_INSET = getStatusBarHeight(true);
const BOTTOM_INSET = getBottomSpace();

function RnModal({
  dismissable = true,
  visible = false,
  onDismiss,
  children,
  style,
  modalStyle,
  swipeDirection = 'down',
  backdropOpacity,
  backdropColor,
  theme,
}: Props) {
  const visibleRef = React.useRef(visible);

  React.useEffect(() => {
    visibleRef.current = visible;
  });

  const [rendered, setRendered] = React.useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }

  const handleBack = () => {
    if (dismissable) {
      hideModal();
    }
    return true;
  };

  const subscription = React.useRef<NativeEventSubscription | undefined>(
    undefined
  );

  const showModal = () => {
    subscription.current?.remove();
    subscription.current = addEventListener(
      BackHandler,
      'hardwareBackPress',
      handleBack
    );
  };

  const removeListeners = () => {
    if (subscription.current?.remove) {
      subscription.current?.remove();
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }
  };

  const hideModal = () => {
    removeListeners();

    if (visible && onDismiss) {
      onDismiss();
    }

    if (visibleRef.current) {
      showModal();
    } else {
      setRendered(false);
    }
  };

  const prevVisible = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    if (prevVisible.current !== visible) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
    prevVisible.current = visible;
  });

  React.useEffect(() => {
    return removeListeners;
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <Modal
      avoidKeyboard={true}
      useNativeDriver={true}
      backdropOpacity={backdropOpacity}
      swipeDirection={swipeDirection}
      isVisible={visible}
      hideModalContentWhileAnimating={true}
      propagateSwipe={true}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      onBackButtonPress={hideModal}
      backdropColor={backdropColor ? backdropColor : theme?.colors?.backdrop}
      style={[theme?.styles?.modalStyle, modalStyle]}
    >
      <View
        style={[
          styles.wrapper,
          { marginTop: TOP_INSET, marginBottom: BOTTOM_INSET },
          style,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}

export default withTheme(RnModal);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
});
