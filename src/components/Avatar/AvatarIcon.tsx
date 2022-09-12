import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp, ColorValue } from 'react-native';

import Icon, { IconSource } from '../Icon/Icon';
import { withTheme } from '../../core/theming';
import { white } from '../../styles/colors';
import getContrastingColor from '../../utils/getContrastingColor';
import type { Theme } from '../../types';

const defaultSize = 64;

export type Props = React.ComponentProps<typeof View> & {
  icon: IconSource;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const Avatar = ({ icon, size = defaultSize, style, theme, ...rest }: Props) => {
  const { backgroundColor = theme.colors?.primary, ...restStyle } = StyleSheet.flatten(style) || {};
  const textColor = rest.color ?? getContrastingColor(backgroundColor as ColorValue, white, 'rgba(0, 0, 0, .54)');

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        styles.container,
        restStyle,
      ]}
      {...rest}
    >
      <Icon source={icon} color={textColor} size={size * 0.6} />
    </View>
  );
};

Avatar.displayName = 'Avatar.Icon';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(Avatar);
