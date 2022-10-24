import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import IconButton from '../../IconButton/IconButton';
import type { $Omit, Theme } from '../../../types';
import type { IconSource } from '../../Icon/Icon';
import { useTheme } from '../../../core/theming';
import { ICON_SIZE } from './constants';

export type Props = $Omit<
  React.ComponentProps<typeof IconButton>,
  'icon' | 'theme' | 'color'
> & {
  icon: IconSource;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
};

const TextInputIcon = ({ icon, onPress, color, style, ...rest }: Props) => {
  const theme = useTheme();

  let iconColor = theme?.colors?.text;

  return (
    <View style={[styles.container, style]}>
      <IconButton
        icon={icon}
        style={styles.iconButton}
        size={ICON_SIZE}
        onPress={onPress}
        iconColor={iconColor}
        {...rest}
      />
    </View>
  );
};

TextInputIcon.displayName = 'TextInput.Icon';

TextInputIcon.defaultProps = {
  forceTextInputFocus: true,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
  },
});

export default TextInputIcon;

// @component-docs ignore-next-line
export { TextInputIcon };
