import color from 'color';
import * as React from 'react';
import {
  I18nManager,
  StyleProp,
  TextStyle,
  StyleSheet,
  ColorValue,
} from 'react-native';

import NativeText from './Text';
import { useTheme } from '../../core/theming';
import type { PositionProps } from '../../types';

type Props = React.ComponentProps<typeof NativeText> &
  PositionProps & {
    alpha?: number;
    family?:
      | 'regular'
      | 'medium'
      | 'light'
      | 'thin'
      | 'extralight'
      | 'bold'
      | 'black'
      | 'semibold'
      | 'extrabold';
    color?: ColorValue;
    style?: StyleProp<TextStyle>;
    fs?: number;
  };

const StyledText = ({
  alpha = 1,
  family = 'regular',
  style,
  color: overrideColor,
  fs = 14,
  mb,
  mt,
  ml,
  mr,
  mv,
  mh,
  p,
  m,
  pl,
  pr,
  pv,
  ph,
  pb,
  pt,
  ...rest
}: Props) => {
  const theme = useTheme();

  const textColor = color(overrideColor ? overrideColor : theme.colors?.text)
    .alpha(alpha)
    .rgb()
    .string();
  const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';
  return (
    <NativeText
      style={[
        styles.text,
        {
          fontSize: fs,
          color: textColor,
          ...theme.fonts?.[family || 'regular'],
          writingDirection,
        },
        typeof mb !== 'undefined' && { marginBottom: mb },
        typeof mt !== 'undefined' && { marginTop: mt },
        typeof ml !== 'undefined' && { marginLeft: ml },
        typeof mr !== 'undefined' && { marginRight: mr },
        typeof pr !== 'undefined' && { paddingRight: pr },
        typeof pl !== 'undefined' && { paddingLeft: pl },
        typeof pb !== 'undefined' && { paddingBottom: pb },
        typeof pt !== 'undefined' && { paddingTop: pt },
        typeof mh !== 'undefined' && { marginHorizontal: mh },
        typeof mv !== 'undefined' && { marginVertical: mv },
        typeof ph !== 'undefined' && { paddingHorizontal: ph },
        typeof pv !== 'undefined' && { paddingVertical: pv },
        typeof p !== 'undefined' && { padding: p },
        typeof m !== 'undefined' && { margin: m },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default StyledText;
