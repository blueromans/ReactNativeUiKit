import * as Colors from './styles/colors';
export { Colors };

export { AppTheme } from './styles/theme';

export { default as Provider } from './core/Provider';
export { default as getFonts } from './styles/fonts';

import * as Avatar from './components/Avatar/Avatar';
import * as List from './components/List/List';

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
export { AppWrapper } from './components/AppWrapper';
export { Avatar, List };
export { default as Badge } from './components/Badge/Badge';
export { default as Button } from './components/Button/Button';
export { default as Card } from './components/Card/Card';
export { default as Checkbox } from './components/Checkbox';
export { Divider } from './components/Divider';
export { Input } from './components/Form';
export { default as Header } from './components/Header';
export { default as Icon } from './components/Icon/Icon';
export { default as IconButton } from './components/IconButton/IconButton';
export { Layout } from './components/Layout';
export { default as Menu } from './components/Menu/Menu';

export { default as RadioButton } from './components/RadioButton';
export { ScrollView } from './components/ScrollView';
export { Snackbar } from './components/SnackBar';
export { default as Switch } from './components/Switch/Switch';
export { default as ToggleButton } from './components/ToggleButton';
export { default as SegmentedButtons } from './components/SegmentedButtons/SegmentedButtons';
export { default as Text } from './components/Typography/Text';
export { View } from './components/View';

export {
  ViewPager,
  ScalingDot,
  ExpandingDot,
  SlidingBorder,
  SlidingDot,
  LiquidLike,
} from './components/ViewPager';
export {
  RecyclerListView as LisView,
  LayoutProvider,
  DataProvider,
} from 'recyclerlistview';
export { showToast, layoutMaker } from './utils/common';
