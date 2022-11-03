import * as React from 'react';
import { StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import RnModal from '../Modal/Modal';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import DialogIcon from './DialogIcon';
import DialogTitle from './DialogTitle';
import DialogScrollArea from './DialogScrollArea';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import type { Direction } from 'react-native-modal';
import ModalContent from '../Modal/ModalContent';

export type Props = {
  visible: boolean;
  children?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  swipeDirection?: Direction;
  backdropOpacity?: any;
  backdropColor?: string;
  modalStyle?: StyleProp<ViewStyle>;
  theme: Theme;
};

const DIALOG_ELEVATION: number = 24;

const Dialog = ({
  children,
  visible = false,
  contentStyle,
  modalStyle,
  backdropColor,
  backdropOpacity,
  theme,
}: Props) => {
  const { colors, roundness } = theme;

  const borderRadius = roundness;

  const backgroundColor = colors?.surface;

  return (
    <RnModal
      backdropOpacity={backdropOpacity}
      backdropColor={backdropColor as string}
      visible={visible}
      style={modalStyle}
    >
      <ModalContent
        theme={theme}
        style={[
          {
            borderRadius,
            backgroundColor,
          },
          styles.container,
          contentStyle,
        ]}
      >
        {children}
      </ModalContent>
    </RnModal>
  );
};

// @component ./DialogContent.tsx
Dialog.Content = DialogContent;
// @component ./DialogActions.tsx
Dialog.Actions = DialogActions;
// @component ./DialogTitle.tsx
Dialog.Title = DialogTitle;
// @component ./DialogScrollArea.tsx
Dialog.ScrollArea = DialogScrollArea;
// @component ./DialogIcon.tsx
Dialog.Icon = DialogIcon;

const styles = StyleSheet.create({
  container: {
    marginVertical: Platform.OS === 'android' ? 44 : 0,
    marginHorizontal: 26,
    elevation: DIALOG_ELEVATION,
    justifyContent: 'flex-start',
  },
});

export default withTheme(Dialog);
