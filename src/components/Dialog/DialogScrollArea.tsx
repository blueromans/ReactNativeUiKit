import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DialogScrollArea = (props: Props) => {
  const borderStyles = {
    borderColor: 'rgba(0, 0, 0, .12)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };
  return (
    <View {...props} style={[styles.container, borderStyles, props.style]}>
      {props.children}
    </View>
  );
};

DialogScrollArea.displayName = 'Dialog.ScrollArea';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default DialogScrollArea;
