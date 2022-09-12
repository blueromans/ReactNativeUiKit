import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { $Omit } from '../../types';
import HeaderAction from './HeaderAction';
import HeaderBackIcon from './HeaderBackIcon';

export type Props = $Omit<
  React.ComponentProps<typeof HeaderAction>,
  'icon'
> & {
  color?: string;
  size?: number;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const HeaderBackAction = ({...rest }: Props) => (
  <HeaderAction
    {...rest}
    icon={HeaderBackIcon}
    isLeading
  />
);

HeaderBackAction.displayName = 'Header.BackAction';

export default HeaderBackAction;

export { HeaderBackAction };
