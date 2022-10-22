import * as React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DialogActions = (props: Props) => {
  const actionsLength = React.Children.toArray(props.children).length;

  return (
    <View {...props} style={[styles.container, props.style]}>
      {React.Children.map(props.children, (child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              //@ts-ignore
              uppercase: true,
              style: {
                paddingRight: i + 1 === actionsLength ? 0 : 8,
              },
            })
          : child
      )}
    </View>
  );
};

DialogActions.displayName = 'Dialog.Actions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 8,
  },
});

export default DialogActions;
