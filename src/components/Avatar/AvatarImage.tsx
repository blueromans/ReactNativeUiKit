import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

const defaultSize = 64;

export type AvatarImageSource =
  | ImageSourcePropType
  | ((props: { size: number }) => React.ReactNode);

export type Props = React.ComponentProps<typeof View> & {
  source: AvatarImageSource;
  size?: number;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const AvatarImage = ({
  size = defaultSize,
  source,
  style,
  theme,
  ...rest
}: Props) => {
  const { colors } = theme;

  const { backgroundColor = colors?.primary } = StyleSheet.flatten(style) || {};

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    >
      {typeof source === 'function' && source({ size })}
      {typeof source !== 'function' && (
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      )}
    </View>
  );
};

AvatarImage.displayName = 'Avatar.Image';

export default withTheme(AvatarImage);
