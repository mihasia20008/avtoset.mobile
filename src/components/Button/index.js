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
    borderWidth: 1,
    borderColor: '#2975c0',
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
});

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool,
  };

  render() {
    const { text, onPress, isEmpty } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, isEmpty ? styles.emptyButton : '']}
        onPress={onPress}
        // eslint-disable-next-line prettier/prettier
      >
        <Text style={[styles.text, isEmpty ? styles.emptyText : '']}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
