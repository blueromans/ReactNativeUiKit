import * as Colors from './styles/colors';
export { Colors };

export { AppTheme } from './styles/theme';

export { default as Provider } from './core/Provider';
export { default as getFonts } from './styles/fonts';

import * as Avatar from './components/Avatar/Avatar';

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
  HelperText,
} from './components/Typography';

export { useForm } from 'react-hook-form';

export { ActivityIndicator } from './components/ActivityIndicator';
export { Avatar };
export { default as Button } from './components/Button/Button';
export { Divider } from './components/Divider';
export { Input } from './components/Form';
export { default as Header } from './components/Header';
export { default as Icon } from './components/Icon/Icon';
export { default as IconButton } from './components/IconButton/IconButton';
export { Layout } from './components/Layout';
export { ScrollView } from './components/ScrollView';
export { Snackbar } from './components/SnackBar';
export { default as Text } from './components/Typography/Text';
export { View } from './components/View';
