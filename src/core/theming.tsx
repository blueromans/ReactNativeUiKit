import { createTheming } from '@callstack/react-theme-provider';
import { AppTheme } from 'src/styles/theme';
import type { Theme } from 'src/types';

export const DefaultTheme = AppTheme;

export const { ThemeProvider, withTheme, useTheme } = createTheming<Theme>(
  DefaultTheme as ReactNativeUiKit.AppTheme
);
