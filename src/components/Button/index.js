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
  text: {
    fontFamily: 'PT Sans',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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
    isEmpty: PropTypes.bool,
    isShadow: PropTypes.bool,
  };

  render() {
    const { text, onPress, isEmpty, isShadow } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          isEmpty ? styles.emptyButton : '',
          isShadow ? styles.shadowButton : '',
        ]}
        onPress={onPress}
        // eslint-disable-next-line prettier/prettier
      >
        <Text
          style={[styles.text, isEmpty ? styles.emptyText : '', isShadow ? styles.shadowText : '']}
          // eslint-disable-next-line prettier/prettier
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
