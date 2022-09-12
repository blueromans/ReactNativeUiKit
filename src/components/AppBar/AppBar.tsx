import React from 'react';
import { View, ViewStyle, Platform, StyleSheet, StyleProp } from 'react-native';
import color from 'color';

import AppBarContent from './AppBarContent';
import AppBarAction from './AppBarAction';
import AppBarBackAction from './AppBarBackAction';

import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

import {
  getAppBarColor,
  renderAppBarContent,
  DEFAULT_AppBar_HEIGHT,
  AppBarModes,
} from './utils';

import AppBarHeader from './AppBarHeader';

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

const AppBar = ({
  children,
  dark,
  style,
  theme,
  mode = 'small',
  elevated,
  safeAreaInsets,
  ...rest
}: Props) => {
  const {
    backgroundColor: customBackground,
    elevation = 4,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  let isDark: boolean;

  const backgroundColor = getAppBarColor(
    theme,
    elevated
  );

  const isMode = (modeToCompare: AppBarModes) => {
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
  if ((Platform.OS === 'ios')) {
    let hasAppBarContent = false;
    let leftItemsCount = 0;
    let rightItemsCount = 0;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === AppBarContent) {
          hasAppBarContent = true;
        } else if (hasAppBarContent) {
          rightItemsCount++;
        } else {
          leftItemsCount++;
        }
      }
    });

    shouldCenterContent =
      hasAppBarContent &&
      leftItemsCount < 2 &&
      rightItemsCount < (2);
    shouldAddLeftSpacing = shouldCenterContent && leftItemsCount === 0;
    shouldAddRightSpacing = shouldCenterContent && rightItemsCount === 0;
  }

  const filterAppBarActions = React.useCallback(
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
        styles.AppBar,
        {
          height: DEFAULT_AppBar_HEIGHT,
        },
        insets,
        restStyle,
      ]}
      {...rest}
    >
      {shouldAddLeftSpacing ? <View style={spacingStyle} /> : null}
      {(isMode('small') || isMode('center-aligned')) &&
        renderAppBarContent({
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
          {/* AppBar top row with controls */}
          <View style={styles.controlsRow}>
            {/* Left side of row container, can contain AppBarBackAction or AppBarAction if it's leading icon  */}
            {renderAppBarContent({
              children,
              isDark,
              renderOnly: [AppBarBackAction],
              mode,
            })}
            {renderAppBarContent({
              children: filterAppBarActions(true),
              isDark,
              renderOnly: [AppBarAction],
              mode,
            })}
            {/* Right side of row container, can contain other AppBarAction if they are not leading icons */}
            <View style={styles.rightActionControls}>
              {renderAppBarContent({
                children: filterAppBarActions(false),
                isDark,
                renderExcept: [
                  AppBar,
                  AppBarBackAction,
                  AppBarContent,
                  AppBarHeader,
                ],
                mode,
              })}
            </View>
          </View>
          {/* Middle of the row, can contain only AppBarContent */}
          {renderAppBarContent({
            children,
            isDark,
            renderOnly: [AppBarContent],
            mode,
          })}
        </View>
      )}
      {shouldAddRightSpacing ? <View style={spacingStyle} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  AppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  spacing: {
    width: 48,
  },
  v3Spacing: {
    width: 52,
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

export default withTheme(AppBar);
// @component-docs ignore-next-line
const AppBarWithTheme = withTheme(AppBar);
// @component-docs ignore-next-line
export { AppBarWithTheme as AppBar };
