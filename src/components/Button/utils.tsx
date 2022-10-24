import { StyleSheet } from 'react-native';
import color from 'color';
import { black, white } from '../../styles/colors';
import type { Theme } from '../../types';

export type ButtonMode =
  | 'text'
  | 'outlined'
  | 'contained'
  | 'elevated'
  | 'contained-tonal';

type BaseProps = {
  isMode: (mode: ButtonMode) => boolean;
  theme: Theme;
  disabled?: boolean;
};

const isDark = ({
  dark,
  backgroundColor,
}: {
  dark?: boolean;
  backgroundColor?: string;
}) => {
  if (typeof dark === 'boolean') {
    return dark;
  }

  if (backgroundColor === 'transparent') {
    return false;
  }

  if (backgroundColor !== 'transparent') {
    return !color(backgroundColor).isLight();
  }

  return false;
};

const getButtonBackgroundColor = ({
  isMode,
  theme,
  disabled,
  customButtonColor,
}: BaseProps & {
  customButtonColor?: string;
}) => {
  if (customButtonColor && !disabled) {
    return customButtonColor;
  }

  if (isMode('contained')) {
    if (disabled) {
      return color(theme.dark ? white : black)
        .alpha(0.12)
        .rgb()
        .string();
    }

    return theme?.colors?.primary;
  }

  return 'transparent';
};

const getButtonTextColor = ({
  isMode,
  theme,
  disabled,
  customTextColor,
  dark,
}: BaseProps & {
  customTextColor?: string;
  dark?: boolean;
}) => {
  if (customTextColor && !disabled) {
    return customTextColor;
  }
  if (disabled) {
    return color(theme.dark ? white : black)
      .alpha(0.32)
      .rgb()
      .string();
  }

  if (isMode('contained')) {
    return isDark({ dark }) ? white : black;
  }

  return theme?.colors?.primary;
};

const getButtonBorderColor = ({ isMode, theme }: BaseProps) => {
  if (isMode('outlined')) {
    return color(theme.dark ? white : black)
      .alpha(0.29)
      .rgb()
      .string();
  }

  return 'transparent';
};

const getButtonBorderWidth = ({ isMode }: Omit<BaseProps, 'disabled'>) => {
  if (isMode('outlined')) {
    return StyleSheet.hairlineWidth;
  }
  return 0;
};

export const getButtonColors = ({
  theme,
  mode,
  customButtonColor,
  customTextColor,
  disabled,
  dark,
}: {
  theme: Theme;
  mode: ButtonMode;
  customButtonColor?: string;
  customTextColor?: string;
  disabled?: boolean;
  dark?: boolean;
}) => {
  const isMode = (modeToCompare: ButtonMode) => {
    return mode === modeToCompare;
  };

  const backgroundColor = getButtonBackgroundColor({
    isMode,
    theme,
    disabled,
    customButtonColor,
  });

  const textColor = getButtonTextColor({
    isMode,
    theme,
    disabled,
    customTextColor,
    dark,
  });

  const borderColor = getButtonBorderColor({ isMode, theme, disabled });

  const borderWidth = getButtonBorderWidth({ isMode, theme });

  return {
    backgroundColor,
    borderColor,
    textColor,
    borderWidth,
  };
};
