import * as React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { View } from '../View';

export type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const TOP_INSET = getStatusBarHeight(true);
const BOTTOM_INSET = getBottomSpace();

function ModalContent({ children, style }: Props) {
  return (
    <View
      style={[
        styles.wrapper,
        { marginTop: TOP_INSET, marginBottom: BOTTOM_INSET },
        style,
      ]}
    >
      {children}
    </View>
  );
}
ModalContent.displayName = 'Modal.Content';

export default ModalContent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
});
