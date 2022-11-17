import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import color from 'color';

import HeaderContent from './HeaderContent';
import HeaderAction from './HeaderAction';
import HeaderBackAction from './HeaderBackAction';

import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

import {
  getHeaderColor,
  renderHeaderContent,
  DEFAULT_Header_HEIGHT,
  HeaderModes,
} from './utils';

import HeaderWrapper from './HeaderWrapper';

export type Props = Partial<React.ComponentPropsWithRef<typeof View>> & {
  dark?: boolean;
  children: React.ReactNode;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
  elevated?: boolean;
  safeAreaInsets?: {
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
  };
  theme: Theme;
  style?: StyleProp<ViewStyle>;
};

const Header = ({
  children,
  dark,
  style,
  theme,
  mode = 'small',
  elevated,
  safeAreaInsets,
  ...rest
}: Props) => {
  const { ...restStyle }: ViewStyle = StyleSheet.flatten(style) || {};

  let isDark: boolean;

  const backgroundColor = getHeaderColor(theme, elevated);

  const isMode = (modeToCompare: HeaderModes) => {
    return mode === modeToCompare;
  };

  if (typeof dark === 'boolean') {
    isDark = dark;
  } else {
    isDark =
      backgroundColor === 'transparent'
        ? false
        : typeof backgroundColor === 'string'
        ? !color(backgroundColor).isLight()
        : true;
  }

  let shouldCenterContent = false;
  let shouldAddLeftSpacing = false;
  let shouldAddRightSpacing = false;
  let hasHeaderContent = false;
  let leftItemsCount = 0;
  let rightItemsCount = 0;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === HeaderContent) {
        hasHeaderContent = true;
      } else if (hasHeaderContent) {
        rightItemsCount++;
      } else {
        leftItemsCount++;
      }
    }
  });

  shouldCenterContent =
    hasHeaderContent && leftItemsCount < 2 && rightItemsCount < 2;
  shouldAddLeftSpacing = shouldCenterContent && leftItemsCount === 0;
  shouldAddRightSpacing = shouldCenterContent && rightItemsCount === 0;

  const filterHeaderActions = React.useCallback(
    (isLeading = false) =>
      React.Children.toArray(children).filter((child) =>
        // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
        isLeading ? child.props.isLeading : !child.props.isLeading
      ),
    [children]
  );

  const spacingStyle = styles.spacing;

  const insets = {
    paddingBottom: safeAreaInsets?.bottom,
    paddingTop: safeAreaInsets?.top,
    paddingLeft: safeAreaInsets?.left,
    paddingRight: safeAreaInsets?.right,
  };

  return (
    <View
      style={[
        { backgroundColor },
        styles.Header,
        {
          height: DEFAULT_Header_HEIGHT,
        },
        insets,
        restStyle,
      ]}
      {...rest}
    >
      {shouldAddLeftSpacing ? <View style={spacingStyle} /> : null}
      {(isMode('small') || isMode('center-aligned')) &&
        renderHeaderContent({
          children,
          isDark,
          shouldCenterContent,
        })}
      {(isMode('medium') || isMode('large')) && (
        <View
          style={[
            styles.columnContainer,
            isMode('center-aligned') && styles.centerAlignedContainer,
          ]}
        >
          {/* Header top row with controls */}
          <View style={styles.controlsRow}>
            {/* Left side of row container, can contain HeaderBackAction or HeaderAction if it's leading icon  */}
            {renderHeaderContent({
              children,
              isDark,
              renderOnly: [HeaderBackAction],
              mode,
            })}
            {renderHeaderContent({
              children: filterHeaderActions(true),
              isDark,
              renderOnly: [HeaderAction],
              mode,
            })}
            {/* Right side of row container, can contain other HeaderAction if they are not leading icons */}
            <View style={styles.rightActionControls}>
              {renderHeaderContent({
                children: filterHeaderActions(false),
                isDark,
                renderExcept: [
                  Header,
                  HeaderBackAction,
                  HeaderContent,
                  HeaderWrapper,
                ],
                mode,
              })}
            </View>
          </View>
          {/* Middle of the row, can contain only HeaderContent */}
          {renderHeaderContent({
            children,
            isDark,
            renderOnly: [HeaderContent],
            mode,
          })}
        </View>
      )}
      {shouldAddRightSpacing ? <View style={spacingStyle} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  spacing: {
    width: 48,
  },
  controlsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightActionControls: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 8,
  },
  centerAlignedContainer: {
    paddingTop: 0,
  },
});

export default withTheme(Header);
// @component-docs ignore-next-line
const HeaderWithTheme = withTheme(Header);
// @component-docs ignore-next-line
export { HeaderWithTheme as Header };
