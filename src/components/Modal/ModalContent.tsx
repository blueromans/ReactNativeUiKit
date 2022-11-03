import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '../Layout';
import type { Props } from '../Layout/types';

function ModalContent({ children, style, theme }: Props) {
  return (
    <Layout style={[styles.wrapper, theme?.styles?.modal?.content, style]}>
      {children}
    </Layout>
  );
}
ModalContent.displayName = 'Modal.Content';

export default ModalContent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
});
