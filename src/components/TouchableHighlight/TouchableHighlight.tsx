import * as React from 'react';
import {
  StyleProp,
  TouchableHighlight as RNTouchableHighlight,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { getTouchableRippleColors } from './utils';

type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
  borderless?: boolean;
  disabled?: boolean;
  onPress?: () => void | null;
  rippleColor?: string;
  underlayColor?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const TouchableHighlight = ({
  style,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  theme,
  ...rest
}: Props) => {
  const disabled = disabledProp || !rest.onPress;
  const { calculatedUnderlayColor } = getTouchableRippleColors({
    theme,
    rippleColor,
    underlayColor,
  });

  return (
    <RNTouchableHighlight
      {...rest}
      disabled={disabled}
      style={[borderless && styles.overflowHidden, style]}
      underlayColor={calculatedUnderlayColor}
    >
      {React.Children.only(children)}
    </RNTouchableHighlight>
  );
};

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
});

export default withTheme(TouchableHighlight);
