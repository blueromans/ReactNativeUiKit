import React from 'react';
import { View, StyleSheet } from 'react-native';

import MaterialCommunityIcon from '../Icon/MaterialCommunityIcon';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, Theme } from '../../types';
import { getAndroidSelectionControlColor } from './utils';

export type Props = $RemoveChildren<typeof TouchableHighlight> & {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  theme: Theme;
};

const CheckboxAndroid = ({
  status,
  theme,
  disabled,
  onPress,
  testID,
  ...rest
}: Props) => {
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';

  const { rippleColor, selectionControlColor } =
    getAndroidSelectionControlColor({
      theme,
      disabled,
      checked,
      customColor: rest.color,
      customUncheckedColor: rest.uncheckedColor,
    });

  const icon = indeterminate
    ? 'minus-box'
    : checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  return (
    <TouchableHighlight
      {...rest}
      borderless
      rippleColor={rippleColor}
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <View>
        <MaterialCommunityIcon
          allowFontScaling={false}
          name={icon}
          size={24}
          color={selectionControlColor}
          direction="ltr"
        />
        <View style={[StyleSheet.absoluteFill, styles.fillContainer]}>
          <View style={[styles.fill, { borderColor: selectionControlColor }]} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

CheckboxAndroid.displayName = 'Checkbox.Android';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    width: 36,
    height: 36,
    padding: 6,
  },
  fillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: 14,
    width: 14,
  },
});

export default withTheme(CheckboxAndroid);

const CheckboxAndroidWithTheme = withTheme(CheckboxAndroid);

export { CheckboxAndroidWithTheme as CheckboxAndroid };
