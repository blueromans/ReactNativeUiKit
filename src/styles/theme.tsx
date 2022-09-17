import color from 'color';
import type { Theme } from '../types';
import getFonts from './fonts';
import { black, pinkA400, white } from './colors';
import { BASE_HEIGHT } from '../constants';

export const AppTheme: Theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: white,
    surface: white,
    onSurface: black,
    error: '#B00020',
    text: black,
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA400,
  },
  fonts: getFonts(),
  baseHeight: BASE_HEIGHT,
};
