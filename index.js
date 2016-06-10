/*
  1. 支持点击事件。
  2. 点击时样式变化。
  3. 外部设置按钮disable。
    3.1 disable时样式变化。
  4. customStyle。
*/

import React, {
  Component,
  propTypes
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

var ObjectAssign = require('object-assign');

const BUTTON_STATUS = {
  normal: 'normal',
  focus: 'focus',
  disabled: 'disabled'
};

export default class Button extends Component {
  constructor() {
    super();

    this.state = {
      status: BUTTON_STATUS.normal
    };

    this.pressIn = this.pressIn.bind(this);
    this.pressOut = this.pressOut.bind(this);
  }

  pressIn() {
    this.setState({
      status: BUTTON_STATUS.focus
    });
  }

  pressOut(e) {
    this.setState({
      status: BUTTON_STATUS.normal
    });
    this.props.click(e);
  }

  getWrapperStyle(statusInfluencedStyle) {
    return ObjectAssign({}, styles.wrapper, statusInfluencedStyle, this.props.wrapperCustomStyle);
  }

  getButtonStatus() {
    if(this.props.disabled) {
      return BUTTON_STATUS.disabled;
    } else {
      return this.state.status;
    }
  }

  getWrapperStatusInfluencedStyle(status) {
    switch(status) {
      case BUTTON_STATUS.normal:
        return this.getNormalStyle();
      case BUTTON_STATUS.focus:
        return this.getFocusStyle();
      case BUTTON_STATUS.disabled:
        return this.getDisabledStyle();
      default:
        return this.getNormalStyle();
    }
  }

  getFocusStyle() {
    const FOCUS_BACKGROUND_COLOR = '#31b0d5';
    const FOCUS_BORDER_COLOR = '#1b6d85'

    return {
      backgroundColor: FOCUS_BACKGROUND_COLOR,
      borderColor: FOCUS_BORDER_COLOR,
    };
  }

  getDisabledStyle() {
    const DISABLED_BACKGROUND_COLOR = '#5bc0de';
    const DISABLED_BORDER_COLOR = '#46b8da';

    return {
      backgroundColor: DISABLED_BACKGROUND_COLOR,
      borderColor: DISABLED_BORDER_COLOR,
    };
  }

  getNormalStyle() {
    const NORMAL_BACKGROUND_COLOR = '#5bc0de';
    const NORMAL_BORDER_COLOR = '#46b8da'

    return {
      backgroundColor: NORMAL_BACKGROUND_COLOR,
      borderColor: NORMAL_BORDER_COLOR,
    };
  }

  render() {
    let buttonStatus = this.getButtonStatus();
    let wrapperStatusInfluencedStyle = this.getWrapperStatusInfluencedStyle(buttonStatus);
    let wrapperStyle = this.getWrapperStyle(wrapperStatusInfluencedStyle);

    return (
      <TouchableWithoutFeedback
        onPressIn = {this.pressIn}
        onPressOut = {this.pressOut}
        disabled = {this.props.disabled}
      >
        <View style = {wrapperStyle}>
          <Text style = {styles.text}>
            {this.props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  click: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  wrapperCustomStyle: React.PropTypes.object,
};

Button.defaultProps = {
  text: '',
  click: () => {},
  disabled: false,
  wrapperCustomStyle: {},
};

let styles = {
  wrapper: {
    flex: 1,
    borderWidth: 1,
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  }
};
