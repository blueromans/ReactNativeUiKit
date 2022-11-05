import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Icon, { IconSource } from '../Icon/Icon';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import {
  getContentMaxWidth,
  getMenuItemColor,
  MAX_WIDTH,
  MIN_WIDTH,
} from './utils';

export type Props = {
  title: React.ReactNode;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
  disabled?: boolean;
  dense?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  theme: Theme;
};

const MenuItem = ({
  leadingIcon,
  dense,
  title,
  disabled,
  onPress,
  style,
  contentStyle,
  titleStyle,
  theme,
}: Props) => {
  const { titleColor, iconColor, underlayColor } = getMenuItemColor({
    theme,
    disabled,
  });

  const containerPadding = 8;

  const iconWidth = 40;

  const minWidth = MIN_WIDTH - 16;

  const maxWidth = getContentMaxWidth({ iconWidth, leadingIcon });

  return (
    <TouchableHighlight
      style={[
        styles.container,
        { paddingHorizontal: containerPadding },
        dense && styles.md3DenseContainer,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      underlayColor={underlayColor}
    >
      <View style={styles.row}>
        {leadingIcon ? (
          <View
            style={[styles.item, { width: iconWidth }]}
            pointerEvents="box-none"
          >
            <Icon source={leadingIcon} size={24} color={iconColor} />
          </View>
        ) : null}
        <View
          style={[
            styles.item,
            styles.content,
            { minWidth, maxWidth },
            styles.md3WithoutLeadingIcon,
            contentStyle,
          ]}
          pointerEvents="none"
        >
          <Text
            selectable={false}
            numberOfLines={1}
            style={[styles.title, { color: titleColor }, titleStyle]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

MenuItem.displayName = 'Menu.Item';

const styles = StyleSheet.create({
  container: {
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    height: 48,
    justifyContent: 'center',
  },
  md3DenseContainer: {
    height: 32,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  item: {
    marginHorizontal: 8,
  },
  content: {
    justifyContent: 'center',
  },
  md3WithoutLeadingIcon: {
    marginLeft: 4,
  },
});

export default withTheme(MenuItem);
