import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Icon from '../Icon';

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#0065BF',
  },
});

class Item extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    const { name, isActive, onPress } = this.props;
    if (!isActive) {
      onPress(name);
    }
  };

  render() {
    const { name, isActive } = this.props;

    return (
      <TouchableOpacity
        style={[styles.item, isActive ? styles.active : '']}
        onPress={this.handlePress}
        // eslint-disable-next-line prettier/prettier
      >
        <Icon type={name} />
      </TouchableOpacity>
    );
  }
}

export default Item;
