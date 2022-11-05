import type { Animated } from 'react-native';
import color from 'color';
import type { Theme } from '../../../types';

export type Padding = { paddingTop: number; paddingBottom: number };

export const calculateLabelTopPosition = (
  labelHeight: number,
  height: number = 0,
  optionalPadding: number = 0
): number => {
  const customHeight = height > 0 ? height : 0;

  return Math.floor((customHeight - labelHeight) / 2 + optionalPadding);
};

export const calculateInputHeight = (
  labelHeight: number,
  height: any = 0,
  minHeight: number
): number => {
  const finalHeight = height > 0 ? height : labelHeight;

  if (height > 0) {
    return height;
  }
  return finalHeight < minHeight ? minHeight : finalHeight;
};

export const interpolatePlaceholder = (
  labeled: Animated.Value,
  hasActiveOutline: boolean | undefined
) =>
  labeled.interpolate({
    inputRange: [0, 1],
    outputRange: [hasActiveOutline ? 0 : 1, 1],
  });

type BaseProps = {
  theme: Theme;
  disabled?: boolean;
};

const getInputTextColor = ({ theme, disabled }: BaseProps) => {
  if (disabled) {
    return color(theme?.colors?.text).alpha(0.54).rgb().string();
  }
  return theme?.colors?.text;
};

const getActiveColor = ({
  theme,
  disabled,
  error,
  activeOutlineColor,
}: BaseProps & {
  error?: boolean;
  activeOutlineColor?: string;
}) => {
  const modeColor = activeOutlineColor;

  if (error) {
    return theme?.colors?.error;
  }

  if (modeColor) {
    return modeColor;
  }

  if (disabled) {
    return color(theme.colors?.text).alpha(0.54).rgb().string();
  }

  return theme?.colors?.primary;
};

const getPlaceholderColor = ({ theme, disabled }: BaseProps) => {
  if (disabled) {
    return theme?.colors?.disabled;
  }
  return theme?.colors?.placeholder;
};

const getOutlinedOutlineInputColor = ({
  theme,
  disabled,
  customOutlineColor,
}: BaseProps & { customOutlineColor?: string }) => {
  const isTransparent = color(customOutlineColor).alpha() === 0;

  if (!disabled && customOutlineColor) {
    return customOutlineColor;
  }

  if (disabled) {
    if (isTransparent) {
      return customOutlineColor;
    }
    return theme?.colors?.disabled;
  }
  return theme?.colors?.placeholder;
};

export const getOutlinedInputColors = ({
  activeOutlineColor,
  customOutlineColor,
  disabled,
  error,
  theme,
}: {
  activeOutlineColor?: string;
  customOutlineColor?: string;
  disabled?: boolean;
  error?: boolean;
  theme: Theme;
}) => {
  const baseOutlinedColorProps = { theme, disabled };
  return {
    inputTextColor: getInputTextColor({
      ...baseOutlinedColorProps,
    }),
    activeColor: getActiveColor({
      ...baseOutlinedColorProps,
      error,
      activeOutlineColor,
    }),
    outlineColor: getOutlinedOutlineInputColor({
      ...baseOutlinedColorProps,
      customOutlineColor,
    }),
    placeholderColor: getPlaceholderColor(baseOutlinedColorProps),
    errorColor: theme?.colors?.error,
  };
};
