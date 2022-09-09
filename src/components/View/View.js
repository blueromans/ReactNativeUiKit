import React from 'react';
import { View as RnView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import styles from './Style';

const View = ({
  flex,
  row,
  column,
  style,
  children,
  center,
  end,
  start,
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
  bc,
  full,
  br,
  btlr,
  btrr,
  bblr,
  bbrr,
  scroll = false,
  ...otherProps
}) => {
  const viewStyles = [
    typeof flex != 'undefined' && { flex },
    typeof row != 'undefined' && styles.row,
    typeof column != 'undefined' && styles.column,
    typeof full != 'undefined' && styles.full,
    typeof center != 'undefined' && styles.center,
    typeof end != 'undefined' && styles.end,
    typeof start != 'undefined' && styles.start,
    typeof middle != 'undefined' && styles.middle,
    typeof bottom != 'undefined' && styles.bottom,
    typeof top != 'undefined' && styles.top,
    typeof between != 'undefined' && styles.between,
    typeof around != 'undefined' && styles.around,
    typeof mb != 'undefined' && { marginBottom: mb },
    typeof mt != 'undefined' && { marginTop: mt },
    typeof ml != 'undefined' && { marginLeft: ml },
    typeof mr != 'undefined' && { marginRight: mr },
    typeof pr != 'undefined' && { paddingRight: pr },
    typeof pl != 'undefined' && { paddingLeft: pl },
    typeof pb != 'undefined' && { paddingBottom: pb },
    typeof pt != 'undefined' && { paddingTop: pt },
    typeof mh != 'undefined' && { marginHorizontal: mh },
    typeof mv != 'undefined' && { marginVertical: mv },
    typeof ph != 'undefined' && { paddingHorizontal: ph },
    typeof pv != 'undefined' && { paddingVertical: pv },
    typeof p != 'undefined' && { padding: p },
    typeof m != 'undefined' && { margin: m },
    typeof bc != 'undefined' && { backgroundColor: bc },
    typeof br != 'undefined' && { borderRadius: br },
    typeof btlr != 'undefined' && { borderTopLeftRadius: btlr },
    typeof btrr != 'undefined' && { borderTopRightRadius: btrr },
    typeof bblr != 'undefined' && { borderBottomLeftRadius: bblr },
    typeof bbrr != 'undefined' && { borderBottomRightRadius: bbrr },
    style,
  ];
  if (scroll) {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={viewStyles}
        {...otherProps}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
  return (
    <RnView style={viewStyles} {...otherProps}>
      {children}
    </RnView>
  );
};

export default View;
