import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import MaterialCommunityIcon from '../Icon/MaterialCommunityIcon';
import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, Theme } from '../../types';
import { getSelectionControlIOSColor } from '../Checkbox/utils';

export type Props = $RemoveChildren<typeof TouchableHighlight> & {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: () => void;
  color?: string;
  theme: Theme;
};

const RadioButtonIOS = ({
  disabled,
  onPress,
  theme,
  status,
  value,
  testID,
  ...rest
}: Props) => {
  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';

        const { checkedColor, rippleColor } = getSelectionControlIOSColor({
          theme,
          disabled,
          customColor: rest.color,
        });

        return (
          <TouchableHighlight
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      value,
                      onValueChange: context?.onValueChange,
                    });
                  }
            }
            style={styles.container}
          >
            <View style={{ opacity: checked ? 1 : 0 }}>
              <MaterialCommunityIcon
                allowFontScaling={false}
                name="check"
                size={24}
                color={checkedColor}
                direction="ltr"
              />
            </View>
          </TouchableHighlight>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonIOS.displayName = 'RadioButton.IOS';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6,
  },
});

export default withTheme(RadioButtonIOS);

const RadioButtonIOSWithTheme = withTheme(RadioButtonIOS);

export { RadioButtonIOSWithTheme as RadioButtonIOS };
