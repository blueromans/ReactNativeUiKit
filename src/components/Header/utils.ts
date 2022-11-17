import React from 'react';
import color from 'color';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import HeaderContent from './HeaderContent';
import HeaderAction from './HeaderAction';
import HeaderBackAction from './HeaderBackAction';

import type { Theme } from '../../types';
import { black, white } from '../../styles/colors';

export type HeaderModes = 'small' | 'medium' | 'large' | 'center-aligned';

export const getHeaderColor = (theme: Theme, elevated?: boolean) => {
  const { colors } = theme;

  if (elevated) {
    return color(colors?.surface)
      .mix(color(colors?.primary), 0.08)
      .rgb()
      .string();
  }
  return colors?.surface;
};

type RenderHeaderContentProps = {
  children: React.ReactNode;
  isDark: boolean;
  shouldCenterContent?: boolean;
  renderOnly?: any;
  renderExcept?: any;
  mode?: HeaderModes;
};

export const DEFAULT_Header_HEIGHT = 56;

export const renderHeaderContent = ({
  children,
  isDark,
  shouldCenterContent = false,
  renderOnly,
  renderExcept,
  mode = 'small',
}: RenderHeaderContentProps) => {
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
          ![HeaderContent, HeaderAction, HeaderBackAction].includes(
            // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
            child.type
          )
        ) {
          return child;
        }

        const props: {
          color?: string;
          style?: StyleProp<ViewStyle>;
          mode?: HeaderModes;
        } = {
          color:
            typeof child.props.color !== 'undefined'
              ? child.props.color
              : isDark
              ? white
              : black,
        };

        if (child.type === HeaderContent) {
          props.mode = mode;
          props.style = [
            i !== 0 && styles.v2Spacing,
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
