import color from 'color';
import type { Theme } from '../../types';

type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';

type BaseProps = {
  theme: Theme;
  isMode: (mode: IconButtonMode) => boolean;
  disabled?: boolean;
  selected?: boolean;
};

const getBorderColor = () => {
  return undefined;
};

const getBackgroundColor = ({
  customContainerColor,
}: BaseProps & { customContainerColor?: string }) => {
  if (typeof customContainerColor !== 'undefined') {
    return customContainerColor;
  }

  return undefined;
};

const getIconColor = ({
  theme,
  customIconColor,
}: BaseProps & { customIconColor?: string }) => {
  if (typeof customIconColor !== 'undefined') {
    return customIconColor;
  }

  return theme?.colors?.text;
};

const getRippleColor = ({ iconColor }: { iconColor?: string }) => {
  return color(iconColor).alpha(0.32).rgb().string();
};

export const getIconButtonColor = ({
  theme,
  disabled,
  mode,
  selected,
  customIconColor,
  customContainerColor,
}: {
  theme: Theme;
  disabled?: boolean;
  selected?: boolean;
  mode?: IconButtonMode;
  customIconColor?: string;
  customContainerColor?: string;
}) => {
  const isMode = (modeToCompare: IconButtonMode) => {
    return mode === modeToCompare;
  };

  const baseIconColorProps = {
    theme,
    isMode,
    disabled,
    selected,
  };

  const iconColor = getIconColor({
    ...baseIconColorProps,
    customIconColor,
  });

  return {
    iconColor,
    backgroundColor: getBackgroundColor({
      ...baseIconColorProps,
      customContainerColor,
    }),
    rippleColor: getRippleColor({
      iconColor: iconColor !== undefined ? iconColor : '',
    }),
    borderColor: getBorderColor(),
  };
};
