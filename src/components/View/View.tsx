import * as React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import type { ViewProps } from '../../types';

export type Props = ViewProps & {
  children?: React.ReactNode;
};

const View = ({
  flex,
  row,
  style,
  children,
  center,
  start,
  end,
  middle,
  bottom,
  top,
  between,
  around,
  mb,
  mt,
  ml,
  mr,
  mv,
  mh,
  p,
  m,
  pl,
  pr,
  pv,
  ph,
  pb,
  pt,
  bg,
  bc,
  full,
  br,
  btlr,
  btrr,
  bblr,
  bbrr,
  ...rest
}: Props) => {
  const viewStyles = [
    typeof flex !== 'undefined' && { flex },
    typeof row !== 'undefined' && styles.row,
    typeof full !== 'undefined' && styles.full,
    typeof center !== 'undefined' && styles.center,
    typeof start !== 'undefined' && styles.start,
    typeof end !== 'undefined' && styles.end,
    typeof middle !== 'undefined' && styles.middle,
    typeof top !== 'undefined' && styles.top,
    typeof bottom !== 'undefined' && styles.bottom,
    typeof between !== 'undefined' && styles.between,
    typeof around !== 'undefined' && styles.around,
    typeof mb !== 'undefined' && { marginBottom: mb },
    typeof mt !== 'undefined' && { marginTop: mt },
    typeof ml !== 'undefined' && { marginLeft: ml },
    typeof mr !== 'undefined' && { marginRight: mr },
    typeof pr !== 'undefined' && { paddingRight: pr },
    typeof pl !== 'undefined' && { paddingLeft: pl },
    typeof pb !== 'undefined' && { paddingBottom: pb },
    typeof pt !== 'undefined' && { paddingTop: pt },
    typeof mh !== 'undefined' && { marginHorizontal: mh },
    typeof mv !== 'undefined' && { marginVertical: mv },
    typeof ph !== 'undefined' && { paddingHorizontal: ph },
    typeof pv !== 'undefined' && { paddingVertical: pv },
    typeof p !== 'undefined' && { padding: p },
    typeof m !== 'undefined' && { margin: m },
    typeof bg !== 'undefined' && { backgroundColor: bg },
    typeof bc !== 'undefined' && { borderColor: bc },
    typeof br !== 'undefined' && { borderRadius: br },
    typeof btlr !== 'undefined' && { borderTopLeftRadius: btlr },
    typeof btrr !== 'undefined' && { borderTopRightRadius: btrr },
    typeof bblr !== 'undefined' && { borderBottomLeftRadius: bblr },
    typeof bbrr !== 'undefined' && { borderBottomRightRadius: bbrr },
    style,
  ];
  return (
    <RNView style={viewStyles} {...rest}>
      {children}
    </RNView>
  );
};

const styles = StyleSheet.create({
  full: { width: '100%' },
  row: { flexDirection: 'row' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  start: { alignItems: 'flex-start' },
  middle: { justifyContent: 'center' },
  bottom: { justifyContent: 'flex-end' },
  top: { justifyContent: 'flex-start' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
});

export default View;
