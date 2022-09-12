import React from 'react';
import color from 'color';
import type {
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';

import { black } from '../../styles/colors';
import IconButton from '../IconButton/IconButton';
import type { IconSource } from '../Icon/Icon';

export type Props = React.ComponentProps<typeof IconButton> & {
  color?: string;
  icon: IconSource;
  size?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  onPress?: () => void;
  isLeading?: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
};


const AppBarAction = ({
  size = 24,
  color: iconColor,
  icon,
  disabled,
  onPress,
  isLeading,
  ...rest
}: Props) => {

  const actionIconColor = iconColor
    ? iconColor
    : color(black).alpha(0.54).rgb().string();

  return (
    <IconButton
      size={size}
      onPress={onPress}
      iconColor={actionIconColor}
      icon={icon}
      disabled={disabled}
      {...rest}
    />
  );
};

AppBarAction.displayName = 'AppBar.Action';

export default AppBarAction;

export { AppBarAction };
