import React from 'react';
import color from 'color';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import AppBarContent from './AppBarContent';
import AppBarAction from './AppBarAction';
import AppBarBackAction from './AppBarBackAction';

import type { Theme } from '../../types';
import { black, white } from '../../styles/colors';

export type AppBarModes = 'small' | 'medium' | 'large' | 'center-aligned';

export const getAppBarColor = (
  theme: Theme,
  elevated?: boolean
) => {
  const { colors } = theme;

  if (elevated) {
    return color(colors?.surface)
      .mix(color(colors?.primary), 0.08)
      .rgb()
      .string();
  }
  return colors?.surface;
};

type RenderAppBarContentProps = {
  children: React.ReactNode;
  isDark: boolean;
  shouldCenterContent?: boolean;
  renderOnly?: any;
  renderExcept?: any;
  mode?: AppBarModes;
};

export const DEFAULT_AppBar_HEIGHT = 56;

export const modeTextVariant = {
  small: 'titleLarge',
  medium: 'headlineSmall',
  large: 'headlineMedium',
  'center-aligned': 'titleLarge',
};

export const renderAppBarContent = ({
  children,
  isDark,
  shouldCenterContent = false,
  renderOnly,
  renderExcept,
  mode = 'small',
}: RenderAppBarContentProps) => {
  return (
    React.Children.toArray(children)
      .filter((child) => child != null && typeof child !== 'boolean')
      .filter((child) =>
        // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
        renderExcept ? !renderExcept.includes(child.type) : child
      )
      // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
      .filter((child) => (renderOnly ? renderOnly.includes(child.type) : child))
      .map((child, i) => {
        if (
          !React.isValidElement(child) ||
          ![AppBarContent, AppBarAction, AppBarBackAction].includes(
            // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
            child.type
          )
        ) {
          return child;
        }

        const props: {
          color?: string;
          style?: StyleProp<ViewStyle>;
          mode?: AppBarModes;
        } = {
          color: undefined
            ? typeof child.props.color !== 'undefined'
            ? child.props.color
            : isDark
            ? white
            : black
            : null
        };

        if (child.type === AppBarContent) {
          props.mode = mode;
          props.style = [i !== 0 && styles.v2Spacing,
            shouldCenterContent && styles.centerAlignedContent,
            child.props.style,
          ];
        }
        return React.cloneElement(child, props);
      })
  );
};

const styles = StyleSheet.create({
  centerAlignedContent: {
    alignItems: 'center',
  },
  v2Spacing: {
    marginLeft: 8,
  },
  v3Spacing: {
    marginLeft: 12,
  },
});
