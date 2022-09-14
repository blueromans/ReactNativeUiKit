import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import type { Theme } from '../../types';

import { withTheme } from '../../core/theming';

import Caption from '../Typography/Caption';
import Title from '../Typography/Title';

export type Props = React.ComponentProps<typeof View> & {
  title: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  subtitle?: React.ReactNode;
  subtitleStyle?: StyleProp<TextStyle>;
  subtitleNumberOfLines?: number;
  left?: (props: { size: number }) => React.ReactNode;
  leftStyle?: StyleProp<ViewStyle>;
  right?: (props: { size: number }) => React.ReactNode;
  rightStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

const LEFT_SIZE = 40;

const CardTitle = ({
  title,
  titleStyle,
  titleNumberOfLines = 1,
  subtitle,
  subtitleStyle,
  subtitleNumberOfLines = 1,
  left,
  leftStyle,
  right,
  rightStyle,
  style,
}: Props) => {
  const titleComponent = (props: any) => <Title {...props} />;

  const subtitleComponent = (props: any) => <Caption {...props} />;

  const TextComponent = React.memo(({ component, ...rest }: any) =>
    React.createElement(component, rest)
  );
  return (
    <View
      style={[
        styles.container,
        { minHeight: subtitle || left || right ? 72 : 50 },
        style,
      ]}
    >
      {left ? (
        <View style={[styles.left, leftStyle]}>
          {left({
            size: LEFT_SIZE,
          })}
        </View>
      ) : null}

      <View style={[styles.titles]}>
        {title && (
          <TextComponent
            component={titleComponent}
            style={[
              styles.title,
              { marginBottom: subtitle ? 0 : 2 },
              titleStyle,
            ]}
            numberOfLines={titleNumberOfLines}
          >
            {title}
          </TextComponent>
        )}
        {subtitle && (
          <TextComponent
            component={subtitleComponent}
            style={[styles.subtitle, subtitleStyle]}
            numberOfLines={subtitleNumberOfLines}
          >
            {subtitle}
          </TextComponent>
        )}
      </View>
      <View style={rightStyle}>{right ? right({ size: 24 }) : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },

  left: {
    justifyContent: 'center',
    marginRight: 16,
    height: LEFT_SIZE,
    width: LEFT_SIZE,
  },

  titles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    minHeight: 30,
    paddingRight: 16,
  },

  subtitle: {
    minHeight: 20,
    marginVertical: 0,
    paddingRight: 16,
  },
});

CardTitle.displayName = 'Card.Title';

export default withTheme(CardTitle);

export { CardTitle };
