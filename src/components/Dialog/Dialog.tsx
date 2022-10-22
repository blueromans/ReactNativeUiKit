import * as React from 'react';
import { StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import Modal from '../Modal/Modal';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import DialogIcon from './DialogIcon';
import DialogTitle from './DialogTitle';
import DialogScrollArea from './DialogScrollArea';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';

export type Props = {
  dismissable?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const DIALOG_ELEVATION: number = 24;

const Dialog = ({
  children,
  dismissable = true,
  onDismiss,
  visible = false,
  style,
  theme,
}: Props) => {
  const { colors, roundness } = theme;

  const borderRadius = roundness;

  const backgroundColor = colors?.surface;

  return (
    <Modal
      dismissable={dismissable}
      onDismiss={onDismiss}
      visible={visible}
      contentContainerStyle={[
        {
          borderRadius,
          backgroundColor,
        },
        styles.container,
        style,
      ]}
      theme={theme}
    >
      {React.Children.toArray(children)
        .filter((child) => child != null && typeof child !== 'boolean')
        .map((child, i) => {
          if (
            i === 0 &&
            React.isValidElement(child) &&
            child.type === DialogContent
          ) {
            // Dialog content is the first item, so we add a top padding
            //@ts-ignore
            return React.cloneElement(child, {
              //@ts-ignore
              style: [{ paddingTop: 24 }, child.props.style],
            });
          }
          return child;
        })}
    </Modal>
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
