import color from 'color';
import type { Theme } from '../types';
import getFonts from './fonts';
import { black, pinkA100, white } from './colors';

export const AppTheme: Theme = {
  dark: true,
  mode: 'adaptive',
  roundness: 12,
  colors: {
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    text: white,
    disabled: color(white).alpha(0.38).rgb().string(),
    placeholder: color(white).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA100,
  },
  fonts: getFonts(),
};
