import React from 'react';
import {
  StyleProp,
  TouchableOpacity as RNTouchableOpacity,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

type Props = React.ComponentProps<typeof RNTouchableOpacity> & {
  borderless?: boolean;
  disabled?: boolean;
  onPress?: () => void | null;
  activeOpacity?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const TouchableOpacity = ({
  style,
  borderless = false,
  disabled: disabledProp,
  activeOpacity,
  children,
  ...rest
}: Props) => {
  const disabled = disabledProp || !rest.onPress;

  return (
    <RNTouchableOpacity
      {...rest}
      disabled={disabled}
      style={[borderless && styles.overflowHidden, style]}
      activeOpacity={activeOpacity}
    >
      {React.Children.only(children)}
    </RNTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
});

export default withTheme(TouchableOpacity);
