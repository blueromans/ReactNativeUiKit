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
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
};

const HeaderAction = ({
  size = 24,
  color: iconColor,
  icon,
  disabled,
  onPress,
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

HeaderAction.displayName = 'Header.Action';

export default HeaderAction;

export { HeaderAction };
