import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import Text from '../Typography/Text';

import { withTheme } from '../../core/theming';
import { white } from '../../styles/colors';

import type { $RemoveChildren, Theme } from '../../types';

export type Props = $RemoveChildren<typeof View> & {
  color?: string;
  title: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  titleRef?: React.RefObject<Text>;
  subtitle?: React.ReactNode;
  subtitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const HeaderContent = ({
  color: titleColor,
  subtitle,
  subtitleStyle,
  onPress,
  style,
  titleRef,
  titleStyle,
  theme,
  title,
  mode = 'small',
  ...rest
}: Props) => {

  const titleTextColor = titleColor
    ? titleColor : white;

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={!onPress}>
      <View
        pointerEvents="box-none"
        style={[styles.container, style]}
        {...rest}
      >
        <Text
          ref={titleRef}
          style={[
            {
              color: titleTextColor,
                ...(Platform.OS === 'ios'
                ? theme?.fonts?.regular
                : theme?.fonts?.medium),
            },
            titleStyle,
          ]}
          numberOfLines={1}
          accessible
          // @ts-ignore Type '"heading"' is not assignable to type ...
          accessibilityRole={Platform.OS === 'web' ? 'heading' : 'header'}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

HeaderContent.displayName = 'Header.Content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  v3DefaultContainer: {
    paddingHorizontal: 0,
  },
  v3MediumContainer: {
    paddingHorizontal: 0,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  v3LargeContainer: {
    paddingHorizontal: 0,
    paddingTop: 36,
    justifyContent: 'flex-end',
    paddingBottom: 28,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 11 : 14,
  },
});

export default withTheme(HeaderContent);

// @component-docs ignore-next-line
const HeaderContentWithTheme = withTheme(HeaderContent);
// @component-docs ignore-next-line
export { HeaderContentWithTheme as HeaderContent };
