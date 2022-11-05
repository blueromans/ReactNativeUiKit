import React from 'react';
import { Image, I18nManager, ImageSourcePropType } from 'react-native';

import MaterialCommunityIcon, {
  accessibilityProps,
} from './MaterialCommunityIcon';
import { withTheme } from '../../core/theming';
import { isImageSource } from './utils';

import type { Theme } from '../../types';

type IconSourceBase = string | ImageSourcePropType;

export type IconSource =
  | IconSourceBase
  | Readonly<{ source: IconSourceBase; direction: 'rtl' | 'ltr' | 'auto' }>
  | ((props: IconProps & { color: string }) => React.ReactNode);

type IconProps = {
  size: number;
  allowFontScaling?: boolean;
};

type Props = IconProps & {
  color?: string;
  source: any;
  theme: Theme;
};

const Icon = ({ source, color, size, theme, ...rest }: Props) => {
  const direction =
    typeof source === 'object' && source.direction && source.source
      ? source.direction === 'auto'
        ? I18nManager.isRTL
          ? 'rtl'
          : 'ltr'
        : source.direction
      : null;
  const s =
    typeof source === 'object' && source.direction && source.source
      ? source.source
      : source;
  const iconColor = color || theme?.colors?.text;

  if (isImageSource(s)) {
    return (
      <Image
        {...rest}
        source={s}
        style={[
          {
            transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
          },
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: size,
            height: size,
            tintColor: color,
            resizeMode: 'contain',
          },
        ]}
        {...accessibilityProps}
      />
    );
  } else if (typeof s === 'string') {
    return (
      <MaterialCommunityIcon
        name={s}
        color={iconColor}
        size={size}
        direction={direction}
      />
    );
  } else if (typeof s === 'function') {
    return s({ color: iconColor, size, direction });
  }

  return null;
};

export default withTheme(Icon);
