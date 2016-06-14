/*
  1. 支持点击事件。
  2. 支持长按事件。
  3. 点击时样式变化。
  4. 外部设置按钮disable。
    4.1 disable时样式变化。
  5. customStyle。
*/

import React, {
   Component,
   propTypes
} from 'react';

import {
   AppRegistry,
   StyleSheet,
   View,
   TouchableWithoutFeedback
} from 'react-native';

const BUTTON_STATUS = {
   normal: 'normal',
   focus: 'focus',
   disabled: 'disabled'
};

let styles = StyleSheet.create({
   wrapper: {
      borderWidth: 1,
      padding: 6,
      paddingLeft: 12,
      paddingRight: 12,
      borderRadius: 4,
   }
});

class Button extends Component {
   static propTypes = {
      focusStart: React.PropTypes.func,
      focusEnd: React.PropTypes.func,
      click: React.PropTypes.func,
      longClick: React.PropTypes.func,
      
      disabled: React.PropTypes.bool,
      normalStyle: React.PropTypes.object,
      focusStyle: React.PropTypes.object,
      disabledStyle: React.PropTypes.object
   };

   static defaultProps = {
      focusStart: () => {},
      focusEnd: () => {},
      click: () => {},
      longClick: () => {},

      disabled: false,
      normalStyle: {},
      focusStyle: {},
      disabledStyle: {}
   };

   constructor() {
      super();

      this.state = {
         status: BUTTON_STATUS.normal
      };

      this.pressIn = this.pressIn.bind(this);
      this.pressOut = this.pressOut.bind(this);
      this.press = this.press.bind(this);
      this.longPress = this.longPress.bind(this);
   }

   pressIn() {
      this.setState({
         status: BUTTON_STATUS.focus
      });

      this.props.focusStart();
   }

   pressOut() {
      this.setState({
         status: BUTTON_STATUS.normal
      });

      this.props.focusEnd();
   }

   press() {
      this.props.click();
   }

   longPress() {
      this.props.longClick();
   }

   getButtonStatus() {
      if (this.props.disabled) {
         return BUTTON_STATUS.disabled;
      } else {
         return this.state.status;
      }
   }

   getWrapperStatusInfluencedStyle(status) {
      switch (status) {
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
      return [styles.wrapper, this.props.normalStyle, this.props.focusStyle];    
   }

   getDisabledStyle() {
      return [styles.wrapper, this.props.normalStyle, this.props.disabledStyle];s
   }

   getNormalStyle() {
      return [styles.wrapper, this.props.normalStyle];
   }

   render() {
      let buttonStatus = this.getButtonStatus();
      let wrapperStyle = this.getWrapperStatusInfluencedStyle(buttonStatus);

      return (
         <TouchableWithoutFeedback
        onPressIn = {this.pressIn}
        onPressOut = {this.pressOut}
        onPress = {this.press}
        onLongPress = {this.longPress}
        disabled = {this.props.disabled}
      >
        <View style = {wrapperStyle}>
         {this.props.children}
        </View>
      </TouchableWithoutFeedback>
      );
   }
}

export default Button;