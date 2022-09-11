import * as React from 'react';
import {
  Text as NativeText,
  TextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import type { Theme } from '../../types';

type Props = React.ComponentProps<typeof NativeText> & {
  style?: StyleProp<TextStyle>;
  theme?: Theme;
};

const Text: React.ForwardRefRenderFunction<{}, Props> = (
  { style, theme, ...rest }: Props,
  ref
) => {
  const root = React.useRef<NativeText | null>(null);

  React.useImperativeHandle(ref, () => ({
    setNativeProps: (args: Object) => root.current?.setNativeProps(args),
  }));
  return (
    <NativeText
      {...rest}
      ref={root}
      style={[
        {
          ...theme?.fonts?.regular,
          color: theme?.colors?.text,
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

export default React.forwardRef(Text);
