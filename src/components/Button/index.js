import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#006ac5',
    borderWidth: 1,
    borderColor: '#006ac5',
    borderRadius: 2,
  },
  bigButton: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  emptyButton: {
    backgroundColor: 'transparent',
    borderColor: '#2975c0',
  },
  shadowButton: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: 'rgb(198, 198, 198)',
    borderColor: 'rgb(198, 198, 198)',
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  bigText: {
    fontSize: 20,
  },
  emptyText: {
    color: '#005fb1',
  },
  shadowText: {
    color: '#005fb1',
  },
});

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    big: PropTypes.bool,
    isEmpty: PropTypes.bool,
    isShadow: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  handlePress = () => {
    const { disabled, onPress } = this.props;
    if (!disabled) {
      onPress();
    }
  };

  render() {
    const { text, big, isEmpty, isShadow, disabled } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          big ? styles.bigButton : '',
          isEmpty ? styles.emptyButton : '',
          isShadow ? styles.shadowButton : '',
          disabled ? styles.disabledButton : '',
        ]}
        onPress={this.handlePress}
        // eslint-disable-next-line prettier/prettier
      >
        <Text
          style={[
            styles.text,
            big ? styles.bigText : '',
            isEmpty ? styles.emptyText : '',
            isShadow ? styles.shadowText : '',
          ]}
          // eslint-disable-next-line prettier/prettier
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
