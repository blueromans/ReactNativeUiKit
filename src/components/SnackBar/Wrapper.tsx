import React from 'react';

import Snackbar from './Snackbar';
import { View } from '../View';
import type { Theme } from '../../types';

const DURATION_SHORT = 4000;

class SnackBarWrapper extends React.PureComponent<{
  theme: Theme;
}> {
  state = {
    duration: DURATION_SHORT,
    isVisible: false,
    position: 'bottom',
    content: null,
  };
  theme: Theme;
  static _ref: any = null;

  static setRef(ref: any) {
    this._ref = ref;
  }

  static show(
    content: React.ReactNode,
    position: 'bottom' | 'top',
    duration: number
  ) {
    if (this._ref !== null) {
      this._ref.show(content, position, duration);
    }
  }

  static hide() {
    this._ref.hide();
  }

  async show(
    content: React.ReactNode,
    position: 'bottom' | 'top',
    duration: number
  ) {
    await this._setState({
      isVisible: true,
      content,
      position,
      duration,
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
    const { isVisible, content, duration, position } = this.state;

    return (
      <Snackbar
        position={position as 'bottom' | 'top'}
        visible={isVisible}
        onDismiss={() => {
          this.hide();
        }}
        duration={duration}
      >
        <View>{content}</View>
      </Snackbar>
    );
  }
}

export default SnackBarWrapper;
