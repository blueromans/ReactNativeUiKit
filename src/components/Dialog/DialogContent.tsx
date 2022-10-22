import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DialogContent = (props: Props) => (
  <View {...props} style={[styles.container, props.style]}>
    {props.children}
  </View>
);

DialogContent.displayName = 'Dialog.Content';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});

export default DialogContent;
