import * as Colors from './styles/colors';
export { Colors };

export { AppTheme } from './styles/theme';

export { default as Provider } from './core/Provider';
export { default as configureFonts } from './styles/fonts';

export {
  useTheme,
  withTheme,
  ThemeProvider,
  DefaultTheme,
} from './core/theming';

export type { Theme } from './types';

export {
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from './components/Typography';

export { default as Text } from './components/Typography/Text';
