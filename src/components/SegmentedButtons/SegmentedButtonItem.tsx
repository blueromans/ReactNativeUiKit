import React from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  TextStyle,
  Animated,
} from 'react-native';

import { useTheme } from '../../core/theming';
import Text from '../Typography/Text';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import type { IconSource } from '../Icon/Icon';
import color from 'color';
import Icon from '../Icon/Icon';
import {
  getSegmentedButtonBorderRadius,
  getSegmentedButtonColors,
  getSegmentedButtonDensityPadding,
} from './utils';

export type Props = {
  checked: boolean;
  icon?: IconSource;
  disabled?: boolean;
  onPress?: () => void;
  value: string;
  label?: string;
  segment?: 'first' | 'last';
  showSelectedCheck?: boolean;
  density?: 'regular' | 'small' | 'medium' | 'high';
  style?: StyleProp<ViewStyle>;
};

const SegmentedButtonItem = ({
  checked,
  disabled,
  style,
  showSelectedCheck,
  icon,
  label,
  onPress,
  segment,
  density = 'regular',
}: Props) => {
  const theme = useTheme();

  const checkScale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!showSelectedCheck) {
      return;
    }
    if (checked) {
      Animated.spring(checkScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(checkScale, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [checked, checkScale, showSelectedCheck]);

  const { roundness } = theme;
  const { borderColor, textColor, borderWidth, backgroundColor } =
    getSegmentedButtonColors({
      checked,
      theme,
      disabled,
    });

  const borderRadius = 1 * roundness;
  const segmentBorderRadius = getSegmentedButtonBorderRadius({
    segment,
  });
  const rippleColor = color(textColor).alpha(0.12).rgb().string();

  const iconSize = 16;
  const iconStyle = {
    marginRight: label ? 5 : checked && showSelectedCheck ? 3 : 0,
    ...(label && {
      transform: [
        {
          scale: checkScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ],
    }),
  };

  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    ...segmentBorderRadius,
  };
  const paddingVertical = getSegmentedButtonDensityPadding({ density });
  const rippleStyle: ViewStyle = {
    borderRadius,
    ...segmentBorderRadius,
  };
  const showIcon = icon && !label ? true : checked ? !showSelectedCheck : true;
  const textStyle: TextStyle = {
    ...{
      textTransform: 'uppercase',
      fontWeight: '500',
    },
    color: textColor,
  };

  return (
    <View style={[buttonStyle, styles.button, style]}>
      <TouchableHighlight
        borderless
        delayPressIn={0}
        onPress={onPress}
        disabled={disabled}
        rippleColor={rippleColor}
        style={rippleStyle}
      >
        <View style={[styles.content, { paddingVertical }]}>
          {checked && showSelectedCheck ? (
            <Animated.View
              style={[iconStyle, { transform: [{ scale: checkScale }] }]}
            >
              <Icon source={'check'} size={iconSize} />
            </Animated.View>
          ) : null}
          {showIcon ? (
            <Animated.View style={iconStyle}>
              <Icon
                source={icon}
                size={iconSize}
                color={disabled ? textColor : undefined}
              />
            </Animated.View>
          ) : null}
          <Text
            style={[styles.label, textStyle]}
            selectable={false}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 76,
    borderStyle: 'solid',
  },
  label: {
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
});

export default SegmentedButtonItem;

const SegmentedButtonWithTheme = SegmentedButtonItem;
export { SegmentedButtonWithTheme as SegmentedButton };
