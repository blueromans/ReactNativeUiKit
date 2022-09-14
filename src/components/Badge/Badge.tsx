import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  Text,
  useWindowDimensions,
} from 'react-native';
import { white, black } from '../../styles/colors';
import { withTheme } from '../../core/theming';
import getContrastingColor from '../../utils/getContrastingColor';
import type { Theme } from '../../types';

const defaultSize = 20;

export type Props = React.ComponentProps<typeof Text> & {
  visible?: boolean;
  children?: string | number;
  size?: number;
  style?: StyleProp<TextStyle>;
  theme: Theme;
};

const Badge = ({
  children,
  size = defaultSize,
  style,
  theme,
  visible = true,
  ...rest
}: Props) => {
  const { fontScale } = useWindowDimensions();

  const { backgroundColor = theme.colors?.notification, ...restStyle } =
    (StyleSheet.flatten(style) || {}) as TextStyle;

  const textColor = getContrastingColor(backgroundColor!!, white, black);

  const borderRadius = size / 2;

  const paddingHorizontal = 4;

  return (
    <Text
      numberOfLines={1}
      style={[
        {
          backgroundColor,
          color: textColor,
          fontSize: size * 0.5,
          ...theme?.fonts?.regular,
          lineHeight: size / fontScale,
          height: size,
          minWidth: size,
          borderRadius,
          paddingHorizontal,
        },
        styles.container,
        restStyle,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default withTheme(Badge);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
});
