import React from 'react';
import {
  NativeModules,
  Platform,
  StyleProp,
  Switch as NativeSwitch,
  ViewStyle,
} from 'react-native';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { getSwitchColor } from './utils';

const version = NativeModules.PlatformConstants
  ? NativeModules.PlatformConstants.reactNativeVersion
  : undefined;

export type Props = React.ComponentPropsWithRef<typeof NativeSwitch> & {
  disabled?: boolean;
  value?: boolean;
  color?: string;
  onValueChange?: Function;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const Switch = ({
  value,
  disabled,
  onValueChange,
  color,
  theme,
  ...rest
}: Props) => {
  const { checkedColor, onTintColor, thumbTintColor } = getSwitchColor({
    theme,
    disabled,
    value,
    color,
  });

  const props =
    version && version.major === 0 && version.minor <= 56
      ? {
          onTintColor,
          thumbTintColor,
        }
      : Platform.OS === 'web'
      ? {
          activeTrackColor: onTintColor,
          thumbColor: thumbTintColor,
          activeThumbColor: checkedColor,
        }
      : {
          thumbColor: thumbTintColor,
          trackColor: {
            true: onTintColor,
            false: onTintColor,
          },
        };

  return (
    <NativeSwitch
      value={value}
      disabled={disabled}
      onValueChange={disabled ? undefined : onValueChange}
      {...props}
      {...rest}
    />
  );
};

export default withTheme(Switch);
