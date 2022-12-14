import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '../Layout';
import type { Props } from '../Layout/types';

const ModalContent = ({ children, style, theme, ...rest }: Props) => {
  return (
    <Layout
      flex={0}
      style={[styles.wrapper, theme?.styles?.modal?.content, style]}
      {...rest}
    >
      {children}
    </Layout>
  );
};
ModalContent.displayName = 'Modal.Content';

export default ModalContent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
});
