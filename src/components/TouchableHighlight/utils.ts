/* eslint-disable @typescript-eslint/no-unused-vars */
import color from 'color';
import type { Theme } from '../../types';

const getUnderlayColor = ({
  calculatedRippleColor,
  underlayColor,
}: {
  calculatedRippleColor: string;
  underlayColor?: string;
}) => {
  if (underlayColor != null) {
    return underlayColor;
  }
  return color(calculatedRippleColor).fade(0.5).rgb().string();
};

const getRippleColor = ({
  theme,
  rippleColor,
}: {
  theme: Theme;
  rippleColor?: string;
}) => {
  if (rippleColor) {
    return rippleColor;
  }

  if (theme.dark) {
    return color(theme?.colors?.text).alpha(0.32).rgb().string();
  }
  return color(theme?.colors?.text).alpha(0.2).rgb().string();
};

export const getTouchableRippleColors = ({
  theme,
  rippleColor,
  underlayColor,
}: {
  theme: Theme;
  rippleColor?: string;
  underlayColor?: string;
}) => {
  const calculatedRippleColor = getRippleColor({ theme, rippleColor });
  return {
    calculatedRippleColor,
    calculatedUnderlayColor: getUnderlayColor({
      calculatedRippleColor,
      underlayColor,
    }),
  };
};
