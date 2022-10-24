import * as React from 'react';
import { Text as RNText, TextStyle, StyleProp, StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import { useTheme } from '../../core/theming';

type Props = React.ComponentProps<typeof RNText> & {
  style?: StyleProp<TextStyle>;
  theme?: Theme;
};

const NativeText = ({ style, theme: overrideTheme, ...rest }: Props) => {
  const theme = useTheme(overrideTheme);

  return (
    <RNText
      {...rest}
      style={[
        //@ts-ignore
        {
          ...theme.fonts?.regular,
          color: theme.colors.text,
        },
        styles.text,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default NativeText;
