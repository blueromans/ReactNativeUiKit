import { createTheming } from '@blueromans/react-theme-provider';
import { AppTheme } from '../styles/theme';
import type { Theme } from '../types';

export const DefaultTheme = AppTheme;

export const { ThemeProvider, withTheme, useTheme } = createTheming<Theme>(
  DefaultTheme as ReactNativeUiKit.AppTheme
);
