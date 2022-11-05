import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import StyledText from '../Typography/StyledText';

import { withTheme } from '../../core/theming';

import type { Theme } from '../../types';

type Props = {
  color?: string;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  fs?: number;
  family?:
    | 'regular'
    | 'medium'
    | 'light'
    | 'thin'
    | 'extralight'
    | 'bold'
    | 'black'
    | 'semibold'
    | 'extrabold';
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const HeaderContent = ({
  color: titleColor,
  title,
  family = 'regular',
  fs,
  style,
  titleStyle,
  theme,
}: Props) => {
  const titleTextColor = titleColor
    ? titleColor
    : theme?.settings?.title?.color;

  return (
    <View style={[styles.container, style]}>
      <StyledText
        style={[
          {
            color: titleTextColor,
          },
          styles.title,
          titleStyle,
        ]}
        fs={fs}
        family={family}
        numberOfLines={1}
      >
        {title as string}
      </StyledText>
    </View>
  );
};

HeaderContent.displayName = 'Header.Content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
  },
});

export default withTheme(HeaderContent);

// @component-docs ignore-next-line
const HeaderContentWithTheme = withTheme(HeaderContent);
// @component-docs ignore-next-line
export { HeaderContentWithTheme as HeaderContent };
