import { createTheming } from '@callstack/react-theme-provider';
import type { Theme } from 'src/types';
import { AppTheme } from '../styles/theme';

export const DefaultTheme = AppTheme;

export const { ThemeProvider, withTheme, useTheme } = createTheming<Theme>(
  DefaultTheme as ReactNativeUiKit.AppTheme
);

export const getTheme = () => {
  return AppTheme;
};
