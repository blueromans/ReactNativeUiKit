import color from 'color';
import type { Theme } from '../../types';

const getAndroidCheckedColor = ({
  theme,
  customColor,
}: {
  theme: Theme;
  customColor?: string;
}) => {
  if (customColor) {
    return customColor;
  }
  return theme?.colors?.accent;
};

const getAndroidUncheckedColor = ({
  theme,
  customUncheckedColor,
}: {
  theme: Theme;
  customUncheckedColor?: string;
}) => {
  if (customUncheckedColor) {
    return customUncheckedColor;
  }

  if (theme.dark) {
    return color(theme?.colors?.text).alpha(0.7).rgb().string();
  }

  return color(theme?.colors?.text).alpha(0.54).rgb().string();
};

const getAndroidRippleColor = ({
  theme,
  checkedColor,
  disabled,
}: {
  theme: Theme;
  checkedColor?: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return color(theme?.colors?.text).alpha(0.16).rgb().string();
  }
  return color(checkedColor).fade(0.32).rgb().string();
};

const getAndroidControlColor = ({
  theme,
  checked,
  disabled,
  checkedColor,
  uncheckedColor,
}: {
  theme: Theme;
  checked: boolean;
  checkedColor?: string;
  uncheckedColor: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return theme?.colors?.text;
  }

  if (checked) {
    return checkedColor;
  }
  return uncheckedColor;
};

export const getAndroidSelectionControlColor = ({
  theme,
  disabled,
  checked,
  customColor,
  customUncheckedColor,
}: {
  theme: Theme;
  checked: boolean;
  disabled?: boolean;
  customColor?: string;
  customUncheckedColor?: string;
}) => {
  const checkedColor = getAndroidCheckedColor({ theme, customColor });
  const uncheckedColor = getAndroidUncheckedColor({
    theme,
    customUncheckedColor,
  });
  return {
    rippleColor: getAndroidRippleColor({ theme, checkedColor, disabled }),
    selectionControlColor: getAndroidControlColor({
      theme,
      disabled,
      checked,
      checkedColor,
      uncheckedColor,
    }),
  };
};

const getIOSCheckedColor = ({
  theme,
  disabled,
  customColor,
}: {
  theme: Theme;
  customColor?: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return theme?.colors?.disabled;
  }

  if (customColor) {
    return customColor;
  }

  return theme?.colors?.accent;
};

const getIOSRippleColor = ({
  theme,
  checkedColor,
  disabled,
}: {
  theme: Theme;
  checkedColor?: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return color(theme?.colors?.text).alpha(0.16).rgb().string();
  }
  return color(checkedColor).fade(0.32).rgb().string();
};

export const getSelectionControlIOSColor = ({
  theme,
  disabled,
  customColor,
}: {
  theme: Theme;
  disabled?: boolean;
  customColor?: string;
}) => {
  const checkedColor = getIOSCheckedColor({ theme, disabled, customColor });
  return {
    checkedColor,
    rippleColor: getIOSRippleColor({
      theme,
      checkedColor,
      disabled,
    }),
  };
};
