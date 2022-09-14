import React from 'react';
import { Platform } from 'react-native';

import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  theme: Theme;
};

const RadioButton = (props: Props) => {
  const Button = Platform.select({
    default: RadioButtonAndroid,
    ios: RadioButtonIOS,
  });

  return <Button {...props} />;
};

export default withTheme(RadioButton);

const RadioButtonWithTheme = withTheme(RadioButton);
export { RadioButtonWithTheme as RadioButton };
