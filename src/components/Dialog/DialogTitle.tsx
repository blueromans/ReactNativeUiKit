import * as React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import Title from '../Typography/Title';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = React.ComponentPropsWithRef<typeof Title> & {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

const DialogTitle = ({ children, theme, style, ...rest }: Props) => {
  const TextComponent = Title;
  const textColor = theme.colors?.text;

  return (
    <TextComponent style={[styles.text, { color: textColor }, style]} {...rest}>
      {children}
    </TextComponent>
  );
};

DialogTitle.displayName = 'Dialog.Title';

const styles = StyleSheet.create({
  text: {
    marginTop: 22,
    marginBottom: 18,
    marginHorizontal: 24,
  },
  v3Text: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default withTheme(DialogTitle);

export { DialogTitle };
