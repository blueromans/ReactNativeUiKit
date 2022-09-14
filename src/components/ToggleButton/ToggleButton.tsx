import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { withTheme } from '../../core/theming';
import color from 'color';
import IconButton from '../IconButton/IconButton';
import { ToggleButtonGroupContext } from './ToggleButtonGroup';
import { black, white } from '../../styles/colors';
import type { IconSource } from '../Icon/Icon';
import type { Theme } from '../../types';
import { getToggleButtonColor } from './utils';

export type Props = {
  icon: IconSource;
  size?: number;
  color?: string;
  disabled?: boolean;
  onPress?: (value?: GestureResponderEvent | string) => void;
  value?: string;
  status?: 'checked' | 'unchecked';
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const ToggleButton = ({
  icon,
  size,
  theme,
  disabled,
  style,
  value,
  status,
  onPress,
  ...rest
}: Props) => {
  const borderRadius = theme.roundness;

  return (
    <ToggleButtonGroupContext.Consumer>
      {(context: { value: string | null; onValueChange: Function } | null) => {
        const checked: boolean | null =
          (context && context.value === value) || status === 'checked';

        const backgroundColor = getToggleButtonColor({ theme, checked });
        const borderColor = color(theme.dark ? white : black)
          .alpha(0.29)
          .rgb()
          .string();

        return (
          <IconButton
            borderless={false}
            icon={icon}
            onPress={(e?: GestureResponderEvent | string) => {
              if (onPress) {
                onPress(e);
              }

              if (context) {
                context.onValueChange(!checked ? value : null);
              }
            }}
            size={size}
            disabled={disabled}
            style={[
              styles.content,
              {
                backgroundColor,
                borderRadius,
                borderColor,
              },
              style,
            ]}
            {...rest}
          />
        );
      }}
    </ToggleButtonGroupContext.Consumer>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 42,
    height: 42,
    margin: 0,
  },
});

export default withTheme(ToggleButton);

const ToggleButtonWithTheme = withTheme(ToggleButton);
export { ToggleButtonWithTheme as ToggleButton };
