import React from 'react';
import { StyleSheet, View } from 'react-native';

import MaterialCommunityIcon from '../Icon/MaterialCommunityIcon';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, Theme } from '../../types';
import { getSelectionControlIOSColor } from './utils';

export type Props = $RemoveChildren<typeof TouchableHighlight> & {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  theme: Theme;
};

const CheckboxIOS = ({ status, disabled, onPress, theme, ...rest }: Props) => {
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';

  const { checkedColor, rippleColor } = getSelectionControlIOSColor({
    theme,
    disabled,
    customColor: rest.color,
  });

  const icon = indeterminate ? 'minus' : 'check';

  return (
    <TouchableHighlight
      {...rest}
      borderless
      rippleColor={rippleColor}
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <View style={{ opacity: indeterminate || checked ? 1 : 0 }}>
        <MaterialCommunityIcon
          allowFontScaling={false}
          name={icon}
          size={24}
          color={checkedColor}
          direction="ltr"
        />
      </View>
    </TouchableHighlight>
  );
};

CheckboxIOS.displayName = 'Checkbox.IOS';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6,
  },
});

export default withTheme(CheckboxIOS);

const CheckboxIOSWithTheme = withTheme(CheckboxIOS);

export { CheckboxIOSWithTheme as CheckboxIOS };
