import React from 'react';
import { ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native';
import color from 'color';

import { ActivityIndicator } from '../ActivityIndicator';
import Icon, { IconSource } from '../Icon/Icon';
import Text from '../Typography/Text';
import { TouchableHighlight } from '../TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { getButtonColors } from './utils';
import { TouchableOpacity } from '../TouchableOpacity';
import { View } from '../View';

export type Props = React.ComponentProps<typeof View> & {
  mode?: 'text' | 'outlined' | 'contained';
  type?: 'highlight' | 'opacity';
  dark?: boolean;
  activeOpacity?: number;
  compact?: boolean;
  color?: string;
  buttonColor?: string;
  textColor?: string;
  loading?: boolean;
  icon?: IconSource;
  disabled?: boolean;
  children: React.ReactNode;
  uppercase?: boolean;
  onPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme: Theme;
};

const Button = ({
  disabled,
  compact,
  mode = 'text',
  type = 'highlight',
  dark,
  activeOpacity = 1,
  loading,
  icon,
  buttonColor: customButtonColor,
  textColor: customTextColor,
  children,
  onPress,
  style,
  theme,
  uppercase,
  contentStyle,
  labelStyle,
  ...rest
}: Props) => {
  const { roundness } = theme;
  const _type = theme?.settings?.button?.type
    ? theme?.settings?.button?.type
    : type;
  const borderRadius = roundness;
  const iconSize = 16;

  const { backgroundColor, borderColor, textColor, borderWidth } =
    getButtonColors({
      customButtonColor,
      customTextColor,
      theme,
      mode,
      disabled,
      dark,
    });

  const rippleColor = color(textColor).alpha(0.12).rgb().string();

  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
  };
  const touchableStyle = {
    borderRadius: style
      ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius ||
        borderRadius
      : borderRadius,
  };

  const { color: customLabelColor, fontSize: customLabelSize } =
    StyleSheet.flatten(labelStyle) || {};

  const textStyle = {
    color: textColor,
    ...theme?.fonts?.medium,
  };
  const iconStyle =
    StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse'
      ? [styles.iconReverse]
      : [styles.icon];
  const ButtonComponent =
    _type === 'highlight' ? TouchableHighlight : TouchableOpacity;
  return (
    <View
      {...rest}
      style={[
        styles.button,
        compact && styles.compact,
        buttonStyle,
        style,
        theme?.styles?.button?.content,
      ]}
    >
      <ButtonComponent
        borderless
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={disabled}
        rippleColor={rippleColor}
        style={touchableStyle}
        delayPressIn={0}
      >
        <View style={[styles.content, contentStyle]}>
          {icon && loading !== true ? (
            <View style={iconStyle}>
              <Icon
                source={icon}
                size={customLabelSize ?? iconSize}
                color={
                  typeof customLabelColor === 'string'
                    ? customLabelColor
                    : textColor
                }
              />
            </View>
          ) : null}
          {loading ? (
            <ActivityIndicator
              size={customLabelSize ?? iconSize}
              color={
                typeof customLabelColor === 'string'
                  ? customLabelColor
                  : textColor
              }
              style={iconStyle}
            />
          ) : null}
          <Text
            selectable={false}
            numberOfLines={1}
            style={[
              styles.label,
              compact && styles.compactLabel,
              uppercase && styles.uppercaseLabel,
              textStyle,
              labelStyle,
              theme?.styles?.button?.label,
            ]}
          >
            {children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  compact: {
    minWidth: 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 12,
    marginRight: -4,
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -4,
  },
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
});

export default withTheme(Button);
