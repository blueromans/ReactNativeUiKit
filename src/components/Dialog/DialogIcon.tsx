import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon, { IconSource } from '../Icon/Icon';

export type Props = {
  color?: string;
  icon: IconSource;
  size?: number;
};

const DialogIcon = ({ size = 24, color, icon }: Props) => {
  //@ts-ignore
  const iconColor = color || theme.colors.secondary;

  return (
    <View style={styles.wrapper}>
      <Icon source={icon} color={iconColor} size={size} />
    </View>
  );
};

DialogIcon.displayName = 'Dialog.Icon';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
});

export default DialogIcon;

export { DialogIcon };
