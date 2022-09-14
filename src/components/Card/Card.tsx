import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  View as RNView,
  ViewStyle,
} from 'react-native';

import CardContent from './CardContent';
import CardActions from './CardActions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardCover, { CardCover as _CardCover } from './CardCover';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardTitle, { CardTitle as _CardTitle } from './CardTitle';
import View from '../View/View';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { getCardColors } from './utils';

type OutlinedCardProps = {
  mode: 'outlined';
  elevation?: never;
};

type ElevatedCardProps = {
  mode?: 'elevated';
  elevation?: number;
};

type ContainedCardProps = {
  mode?: 'contained';
  elevation?: never;
};

type Mode = 'elevated' | 'outlined' | 'contained';

export type Props = React.ComponentProps<typeof View> & {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
  onPress?: () => void;
  mode?: Mode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const Card = ({
  elevation: cardElevation = 1,
  onPress,
  mode: cardMode = 'elevated',
  children,
  style,
  theme,
  ...rest
}: (OutlinedCardProps | ElevatedCardProps | ContainedCardProps) & Props) => {
  const isMode = React.useCallback(
    (modeToCompare: Mode) => {
      return cardMode === modeToCompare;
    },
    [cardMode]
  );

  const { dark, roundness } = theme;

  const prevDarkRef = React.useRef<boolean>(dark);
  React.useEffect(() => {
    prevDarkRef.current = dark;
  });

  const { borderColor } = getCardColors({
    theme,
    mode: cardMode,
  });

  return (
    <View
      style={[
        {
          borderRadius: roundness,
        },
        isMode('outlined') && styles.resetElevation,
        style,
      ]}
      {...rest}
    >
      {isMode('outlined') && (
        <RNView
          style={[
            {
              borderRadius: roundness,
              borderColor,
            },
            styles.outline,
          ]}
        />
      )}
      <TouchableWithoutFeedback
        delayPressIn={0}
        disabled={!onPress}
        onPress={onPress}
      >
        <RNView style={styles.innerContainer}>{children}</RNView>
      </TouchableWithoutFeedback>
    </View>
  );
};

Card.Content = CardContent;
Card.Actions = CardActions;
Card.Cover = CardCover;
Card.Title = CardTitle;

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  outline: {
    borderWidth: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  resetElevation: {
    elevation: 0,
  },
});

export default withTheme(Card);
