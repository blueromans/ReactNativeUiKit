import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { $Omit } from '../../types';
import AppBarAction from './AppBarAction';
import AppBarBackIcon from './AppBarBackIcon';

export type Props = $Omit<
  React.ComponentProps<typeof AppBarAction>,
  'icon'
> & {
  color?: string;
  size?: number;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const AppBarBackAction = ({...rest }: Props) => (
  <AppBarAction
    {...rest}
    icon={AppBarBackIcon}
    isLeading
  />
);

AppBarBackAction.displayName = 'AppBar.BackAction';

export default AppBarBackAction;

export { AppBarBackAction };
