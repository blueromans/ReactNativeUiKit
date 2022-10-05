import color from 'color';
import * as React from 'react';
import { I18nManager, StyleProp, TextStyle, StyleSheet } from 'react-native';

import Text from './Text';
import { useTheme } from '../../core/theming';

type Props = React.ComponentProps<typeof Text> & {
  alpha?: number;
  color?: string;
  family: 'regular' | 'medium' | 'light' | 'thin';
  style?: StyleProp<TextStyle>;
};

const StyledText = ({
  alpha = 1,
  family,
  color: TextColor,
  style,
  ...rest
}: Props) => {
  const theme = useTheme();

  const textColor = TextColor
    ? TextColor
    : color(theme.colors?.text).alpha(alpha).rgb().string();
  const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

  return (
    <Text
      {...rest}
      style={[
        styles.text,
        {
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
