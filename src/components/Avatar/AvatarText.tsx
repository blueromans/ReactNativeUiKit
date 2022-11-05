import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  ColorValue,
  TextStyle,
  useWindowDimensions,
} from 'react-native';

import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import { white } from '../../styles/colors';
import getContrastingColor from '../../utils/getContrastingColor';
import type { Theme } from '../../types';

const defaultSize = 64;

export type Props = React.ComponentProps<typeof View> & {
  label: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme: Theme;
};

const AvatarText = ({
  label,
  size = defaultSize,
  style,
  theme,
  labelStyle,
  color: customColor,
  ...rest
}: Props) => {
  const {
    backgroundColor = theme.colors?.primary as ColorValue,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const textColor =
    customColor ??
    getContrastingColor(backgroundColor, white, 'rgba(0, 0, 0, .54)');
  const { fontScale } = useWindowDimensions();

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
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: size / 2,
            lineHeight: size / fontScale,
          },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

AvatarText.displayName = 'Avatar.Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default withTheme(AvatarText);
