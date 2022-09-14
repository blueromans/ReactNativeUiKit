import color from 'color';
import type { Theme } from '../../types';
import { white, black } from '../../styles/colors';
import type { IconSource } from '../Icon/Icon';

export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

type ContentProps = {
  iconWidth: number;
  leadingIcon?: IconSource;
};

type ColorProps = {
  theme: Theme;
  disabled?: boolean;
};

const getDisabledColor = (theme: Theme) => {
  return color(theme.dark ? white : black)
    .alpha(0.32)
    .rgb()
    .string();
};

const getTitleColor = ({ theme, disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor(theme);
  }

  return color(theme?.colors?.text).alpha(0.87).rgb().string();
};

const getIconColor = ({ theme, disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor(theme);
  }
  return color(theme?.colors?.text).alpha(0.54).rgb().string();
};

export const getMenuItemColor = ({ theme, disabled }: ColorProps) => {
  return {
    titleColor: getTitleColor({ theme, disabled }),
    iconColor: getIconColor({ theme, disabled }),
    underlayColor: undefined,
  };
};

export const getContentMaxWidth = ({
  iconWidth,
  leadingIcon,
}: ContentProps) => {
  if (leadingIcon) {
    return MAX_WIDTH - (iconWidth + 48);
  }
  return MAX_WIDTH - 16;
};
