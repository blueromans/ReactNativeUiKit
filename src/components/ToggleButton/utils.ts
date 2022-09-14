import type { Theme } from '../../types';

export const getToggleButtonColor = ({
  theme,
  checked,
}: {
  theme: Theme;
  checked: boolean | null;
}) => {
  if (checked) {
    if (theme.dark) {
      return 'rgba(255, 255, 255, .12)';
    }
    return 'rgba(0, 0, 0, .08)';
  }
  return 'transparent';
};
