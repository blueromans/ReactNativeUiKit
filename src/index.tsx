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

export { default as ActivityIndicator } from './components/ActivityIndicator/ActivityIndicator';
export { default as AppWrapper } from './components/AppWrapper/AppWrapper';
export { Avatar, List };
export { default as Badge } from './components/Badge/Badge';
export { default as Button } from './components/Button/Button';
export { default as Card } from './components/Card/Card';
export { default as Checkbox } from './components/Checkbox';
export { default as Dialog } from './components/Dialog/Dialog';
export { default as Divider } from './components/Divider/Divider';
export { default as TextInput } from './components/Form/Input/TextInput';
export { default as Header } from './components/Header';
export { default as Icon } from './components/Icon/Icon';
export { default as IconButton } from './components/IconButton/IconButton';
export { default as Layout } from './components/Layout/LayoutWrapper';
export { default as Menu } from './components/Menu/Menu';
export { default as Modal } from './components/Modal/Modal';
export { default as RadioButton } from './components/RadioButton';
export { default as ScrollView } from './components/ScrollView/ScrollView';
export { default as Snackbar } from './components/SnackBar/Snackbar';
export { default as SnackbarWrapper } from './components/SnackBar/Wrapper';
export { default as Switch } from './components/Switch/Switch';
export { default as ToggleButton } from './components/ToggleButton';
export { default as SegmentedButtons } from './components/SegmentedButtons/SegmentedButtons';
export { default as Text } from './components/Typography/StyledText';
export { default as NativeText } from './components/Typography/Text';
export { default as View } from './components/View/View';
export { default as Select } from './components/Select';

export { showToast, layoutMaker } from './utils/common';

//THIRD PARTY PLUGINS
export { useForm } from 'react-hook-form';

export {
  ScalingDot,
  ExpandingDot,
  SlidingBorder,
  SlidingDot,
  LiquidLike,
} from './components/PagerView';

export {
  RecyclerListView as LisView,
  LayoutProvider,
  DataProvider,
} from 'recyclerlistview';
