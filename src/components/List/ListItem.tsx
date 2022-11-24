/* eslint-disable @typescript-eslint/no-shadow */
import color from 'color';
import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, EllipsizeProp } from '../../types';
import type { Theme } from '../../types';

type Title =
  | React.ReactNode
  | ((props: {
      selectable: boolean;
      ellipsizeMode: EllipsizeProp | undefined;
      color: string;
      fontSize: number;
    }) => React.ReactNode);

type Description =
  | React.ReactNode
  | ((props: {
      selectable: boolean;
      ellipsizeMode: EllipsizeProp | undefined;
      color: string;
      fontSize: number;
    }) => React.ReactNode);

export type Props = $RemoveChildren<typeof TouchableHighlight> & {
  title: Title;
  description?: Description;
  left?: (props: {
    color: string;
    style: {
      marginLeft: number;
      marginRight: number;
      marginVertical?: number;
    };
  }) => React.ReactNode;
  right?: (props: {
    color: string;
    style?: {
      marginRight: number;
      marginVertical?: number;
    };
  }) => React.ReactNode;
  onPress?: () => void;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  descriptionNumberOfLines?: number;
  titleEllipsizeMode?: EllipsizeProp;
  descriptionEllipsizeMode?: EllipsizeProp;
};

const ListItem = ({
  left,
  right,
  title,
  description,
  onPress,
  theme,
  style,
  titleStyle,
  titleNumberOfLines = 1,
  descriptionNumberOfLines = 2,
  titleEllipsizeMode,
  descriptionEllipsizeMode,
  descriptionStyle,
  ...rest
}: Props) => {
  const renderDescription = (
    descriptionColor: string,
    description?: Description | null
  ) => {
    return typeof description === 'function' ? (
      description({
        selectable: false,
        ellipsizeMode: descriptionEllipsizeMode,
        color: descriptionColor,
        fontSize: styles.description.fontSize,
      })
    ) : (
      <Text
        selectable={false}
        numberOfLines={descriptionNumberOfLines}
        ellipsizeMode={descriptionEllipsizeMode}
        style={[
          styles.description,
          { color: descriptionColor },
          descriptionStyle,
        ]}
      >
        {description}
      </Text>
    );
  };

  const renderTitle = () => {
    const titleColor = color(theme?.colors?.text).alpha(0.87).rgb().string();

    return typeof title === 'function' ? (
      title({
        selectable: false,
        ellipsizeMode: titleEllipsizeMode,
        color: titleColor,
        fontSize: styles.title.fontSize,
      })
    ) : (
      <Text
        selectable={false}
        ellipsizeMode={titleEllipsizeMode}
        numberOfLines={titleNumberOfLines}
        style={[styles.title, { color: titleColor }, titleStyle]}
      >
        {title}
      </Text>
    );
  };

  const descriptionColor = color(theme?.colors?.text)
    .alpha(0.54)
    .rgb()
    .string();

  return (
    <TouchableHighlight
      {...rest}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View style={styles.row}>
        {left
          ? left({
              color: descriptionColor,
              style: description
                ? styles.iconMarginLeft
                : {
                    ...styles.iconMarginLeft,
                    ...styles.marginVerticalNone,
                  },
            })
          : null}
        <View style={[styles.item, styles.content]}>
          {renderTitle()}

          {description
            ? renderDescription(descriptionColor, description)
            : null}
        </View>
        {right
          ? right({
              color: descriptionColor,
              style: description
                ? styles.iconMarginRight
                : {
                    ...styles.iconMarginRight,
                    ...styles.marginVerticalNone,
                  },
            })
          : null}
      </View>
    </TouchableHighlight>
  );
};

ListItem.displayName = 'List.Item';

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  marginVerticalNone: { marginVertical: 0 },
  iconMarginLeft: { marginLeft: 0, marginRight: 16 },
  iconMarginRight: { marginRight: 0 },
  item: {
    marginVertical: 6,
    paddingLeft: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withTheme(ListItem);
