import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

import ListSubheader from './ListSubheader';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  title?: string;
  children: React.ReactNode;
  theme: Theme;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

const ListSection = ({
  children,
  title,
  titleStyle,
  style,
  ...rest
}: Props) => (
  <View {...rest} style={[styles.container, style]}>
    {title ? <ListSubheader style={titleStyle}>{title}</ListSubheader> : null}
    {children}
  </View>
);

ListSection.displayName = 'List.Section';

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});

export default withTheme(ListSection);
