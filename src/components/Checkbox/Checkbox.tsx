import React from 'react';
import { Platform } from 'react-native';

import CheckboxIOS from './CheckboxIOS';
import CheckboxAndroid from './CheckboxAndroid';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  theme: Theme;
};

const Checkbox = (props: Props) =>
  Platform.OS === 'ios' ? (
    <CheckboxIOS {...props} />
  ) : (
    <CheckboxAndroid {...props} />
  );

export default withTheme(Checkbox);

const CheckboxWithTheme = withTheme(Checkbox);

export { CheckboxWithTheme as Checkbox };
