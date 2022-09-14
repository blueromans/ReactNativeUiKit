import color from 'color';
import { black, white } from '../../styles/colors';
import type { Theme } from '../../types';

type CardMode = 'elevated' | 'outlined' | 'contained';

export const getCardCoverStyle = ({
  theme,
  index,
  total,
}: {
  theme: Theme;
  index?: number;
  total?: number;
}) => {
  const { roundness } = theme;

  if (index === 0) {
    if (total === 1) {
      return {
        borderRadius: roundness,
      };
    }
    return {
      borderTopLeftRadius: roundness,
      borderTopRightRadius: roundness,
    };
  }

  if (typeof total === 'number' && index === total - 1) {
    return {
      borderBottomLeftRadius: roundness,
    };
  }

  return undefined;
};

const getBorderColor = ({ theme }: { theme: Theme }) => {
  if (theme.dark) {
    return color(white).alpha(0.12).rgb().string();
  }
  return color(black).alpha(0.12).rgb().string();
};

const getBackgroundColor = ({
  theme,
}: {
  theme: Theme;
  isMode: (mode: CardMode) => boolean;
}) => {
  return theme?.colors?.surface;
};

export const getCardColors = ({
  theme,
  mode,
}: {
  theme: Theme;
  mode: CardMode;
}) => {
  const isMode = (modeToCompare: CardMode) => {
    return mode === modeToCompare;
  };

  return {
    backgroundColor: getBackgroundColor({
      theme,
      isMode,
    }),
    borderColor: getBorderColor({ theme }),
  };
};
