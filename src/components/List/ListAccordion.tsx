import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
  I18nManager,
} from 'react-native';
import color from 'color';

import TouchableHighlight from '../TouchableHighlight/TouchableHighlight';
import MaterialCommunityIcon from '../Icon/MaterialCommunityIcon';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { ListAccordionGroupContext } from './ListAccordionGroup';

export type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
  left?: (props: { color: string }) => React.ReactNode;
  right?: (props: { isExpanded: boolean }) => React.ReactNode;
  expanded?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  descriptionNumberOfLines?: number;
  id?: string | number;
};

const ListAccordion = ({
  left,
  right,
  title,
  description,
  children,
  theme,
  titleStyle,
  descriptionStyle,
  titleNumberOfLines = 1,
  descriptionNumberOfLines = 2,
  style,
  id,
  onPress,
  expanded: expandedProp,
}: Props) => {
  const [expanded, setExpanded] = React.useState<boolean>(
    expandedProp || false
  );

  const handlePressAction = () => {
    onPress?.();
    if (expandedProp === undefined) {
      setExpanded((expanded) => !expanded);
    }
  };

  const titleColor = color(theme?.colors?.text).alpha(0.87).rgb().string();
  const descriptionColor = color(theme?.colors?.text)
    .alpha(0.54)
    .rgb()
    .string();

  const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;

  const groupContext = React.useContext(ListAccordionGroupContext);
  if (groupContext !== null && !id) {
    throw new Error(
      'List.Accordion is used inside a List.AccordionGroup without specifying an id prop.'
    );
  }
  const isExpanded = groupContext
    ? groupContext.expandedId === id
    : expandedInternal;
  const handlePress =
    groupContext && id !== undefined
      ? () => groupContext.onAccordionPress(id)
      : handlePressAction;
  return (
    <View>
      <View style={{ backgroundColor: theme?.colors?.background }}>
        <TouchableHighlight
          style={[styles.container, style]}
          onPress={handlePress}
          delayPressIn={0}
          borderless
        >
          <View style={styles.row} pointerEvents="none">
            {left
              ? left({
                  color: descriptionColor,
                  //color: isExpanded ? theme?.colors?.primary : descriptionColor,
                })
              : null}
            <View style={[styles.item, styles.content]}>
              <Text
                selectable={false}
                numberOfLines={titleNumberOfLines}
                style={[
                  styles.title,
                  {
                    color: isExpanded ? theme.colors?.primary : titleColor,
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
              {description ? (
                <Text
                  selectable={false}
                  numberOfLines={descriptionNumberOfLines}
                  style={[
                    styles.description,
                    {
                      color: descriptionColor,
                    },
                    descriptionStyle,
                  ]}
                >
                  {description}
                </Text>
              ) : null}
            </View>
            <View
              style={[styles.item, description ? styles.multiline : undefined]}
            >
              {right ? (
                right({
                  isExpanded: isExpanded,
                })
              ) : (
                <MaterialCommunityIcon
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  color={titleColor}
                  size={24}
                  direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
                />
              )}
            </View>
          </View>
        </TouchableHighlight>
      </View>

      {isExpanded
        ? React.Children.map(children, (child) => {
            if (
              left &&
              React.isValidElement(child) &&
              !child.props.left &&
              !child.props.right
            ) {
              const style = {
                style: [styles.child, child.props.style],
              };
              return React.cloneElement(child, style);
            }

            return child;
          })
        : null}
    </View>
  );
};

ListAccordion.displayName = 'List.Accordion';

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiline: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  item: {
    margin: 8,
  },
  child: {
    paddingLeft: 64,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withTheme(ListAccordion);
