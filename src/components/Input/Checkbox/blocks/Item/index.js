import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2975c0',
    borderRadius: 2,
  },
  text: {
    color: '#2975c0',
    textAlign: 'center',
    fontFamily: 'PT Sans',
    fontSize: 16,
  },
  activeContainer: {
    backgroundColor: '#2975c0',
  },
  activeText: {
    color: '#fff',
  },
});

class Item extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    editable: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  handlePress = () => {
    const { value, isActive, editable, onSelect } = this.props;

    if (!isActive && editable) {
      onSelect(value);
    }
  };

  render() {
    const { text, isActive } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, isActive ? styles.activeContainer : '']}
        onPress={this.handlePress}
        // eslint-disable-next-line prettier/prettier
      >
        <Text style={[styles.text, isActive ? styles.activeText : '']}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Item;
