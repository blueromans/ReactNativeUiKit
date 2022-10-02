import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

import Snackbar from './Snackbar';
import { View } from '../View';
import Text from '../Typography/Text';
import type { Theme } from '../../types';

const DURATION_SHORT = 4000;

class SnackBarWrapper extends React.PureComponent {
  state = {
    duration: DURATION_SHORT,
    isVisible: false,
    title: '',
    subTitle: '',
    image: '',
    action: {},
    type: 'success',
    onDismiss: () => null,
    titleStyle: {} as TextStyle,
    subTitleStyle: {} as TextStyle,
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
    action: any,
    onDismiss: () => void,
    titleStyle: TextStyle,
    subTitleStyle: TextStyle
  ) {
    if (this._ref !== null) {
      this._ref.show(
        title,
        subTitle,
        image,
        type,
        duration,
        action,
        onDismiss,
        titleStyle,
        subTitleStyle
      );
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
    action: any,
    onDismiss: any,
    titleStyle: TextStyle,
    subTitleStyle: TextStyle
  ) {
    await this._setState({
      isVisible: true,
      title,
      subTitle,
      image,
      type,
      duration,
      action,
      onDismiss,
      titleStyle,
      subTitleStyle,
    });
  }

  async hide() {
    await this._setState({ isVisible: false });
  }

  async toggle() {
    await this._setState({ isVisible: !this.state.isVisible });
  }

  constructor(props: any) {
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
    const {
      isVisible,
      title,
      subTitle,
      action,
      duration,
      onDismiss,
      titleStyle,
      subTitleStyle,
    } = this.state;
    return (
      <Snackbar
        visible={isVisible}
        action={action}
        onDismiss={() => {
          onDismiss?.();
          this.hide();
        }}
        duration={duration}
      >
        <View pv={5}>
          <View row mr={action ? 0 : 16}>
            <View middle>
              <Text
                style={[
                  styles.content,
                  { color: this.theme?.colors?.surface },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
              {subTitle !== '' && (
                <Text
                  style={[
                    styles.content,
                    { color: this.theme?.colors?.surface },
                    subTitleStyle,
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
  content: {
    marginLeft: 16,
  },
});
export default SnackBarWrapper;
