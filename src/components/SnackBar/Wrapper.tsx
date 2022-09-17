import React from 'react';
import { StyleSheet } from 'react-native';
import type { Animated, StyleProp, ViewStyle } from 'react-native';

import Snackbar from './Snackbar';
import { View } from '../View';
import Text from '../Typography/Text';
import type Button from '../Button/Button';
import type { Theme } from '../../types';

const DURATION_SHORT = 4000;

export type Props = React.ComponentPropsWithRef<typeof View> & {
  visible?: boolean;
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
  duration?: number;
  onDismiss?: () => void;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
};

class SnackBarWrapper extends React.PureComponent {
  state = {
    duration: DURATION_SHORT,
    isVisible: false,
    title: '',
    subTitle: '',
    image: '',
    action: () => null,
    type: 'success',
  };
  theme: Theme;
  static _ref: any = null;

  static setRef(ref: any) {
    this._ref = ref;
  }

  static show(
    title: string,
    subTitle: string,
    image: string,
    type: string,
    duration: number,
    action: () => null
  ) {
    if (this._ref !== null) {
      this._ref.show(title, subTitle, image, type, duration, action);
    }
  }

  static hide() {
    this._ref.hide();
  }

  async show(
    title: string,
    subTitle: string,
    image: string,
    type: string,
    duration: number,
    action: () => null
  ) {
    await this._setState({
      isVisible: true,
      title,
      subTitle,
      image,
      type,
      duration,
      action,
    });
  }

  async hide() {
    await this._setState({ isVisible: false });
  }

  async toggle() {
    await this._setState({ isVisible: !this.state.isVisible });
  }

  constructor(props: Props) {
    super(props);
    const { theme } = props;
    this.theme = theme;
    this._setState = this._setState.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  _setState(reducer: any) {
    return new Promise<void>((resolve) =>
      this.setState(reducer, () => resolve())
    );
  }

  render() {
    const { isVisible, title, subTitle, image, action, duration } = this.state;
    return (
      <Snackbar visible={isVisible} duration={duration}>
        <View pv={5}>
          <View row mr={action() ? 0 : 16}>
            {image !== null && <View middle ml={10} children={undefined} />}
            <View middle>
              <Text
                style={[styles.content, { color: this.theme?.colors?.surface }]}
              >
                {title}
              </Text>
              {subTitle !== null && (
                <Text
                  style={[
                    styles.content,
                    { color: this.theme?.colors?.surface },
                  ]}
                >
                  {subTitle}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Snackbar>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  content: {
    marginLeft: 16,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
});
export default SnackBarWrapper;
