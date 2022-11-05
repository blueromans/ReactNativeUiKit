import React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

export type Props = React.ComponentProps<typeof View> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardActions = (props: Props) => {
  const justifyContent = 'flex-start';
  const { children, style } = props;
  return (
    <View {...props} style={[styles.container, style, { justifyContent }]}>
      {children}
    </View>
  );
};

CardActions.displayName = 'Card.Actions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});

export default CardActions;
