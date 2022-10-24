import color from 'color';
import * as React from 'react';
import {
  I18nManager,
  StyleProp,
  TextStyle,
  StyleSheet,
  Falsy,
} from 'react-native';

import NativeText from './Text';
import { useTheme } from '../../core/theming';

type Props = React.ComponentProps<typeof NativeText> & {
  alpha?: number;
  family: 'regular' | 'medium' | 'light' | 'thin';
  style?: StyleProp<TextStyle>;
  fs?: number;
};

const StyledText = ({ alpha = 1, family, style, fs, ...rest }: Props) => {
  const theme = useTheme();

  const textColor = color(theme.colors?.text).alpha(alpha).rgb().string();
  const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

  return (
    <NativeText
      {...rest}
      style={[
        styles.text,
        {
          fontSize: fs,
          color: textColor,
          ...theme.fonts?.[family],
          writingDirection,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default StyledText;
