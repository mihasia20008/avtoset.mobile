import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  lastItem: {
    marginBottom: 0,
  },
  text: {
    color: '#3d3d3d',
    fontFamily: 'PT Sans',
    fontSize: 16,
  },
});

class ListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isLastItem: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  handlePress = () => {
    const { id, name, onSelect } = this.props;
    onSelect(id, name);
  };

  render() {
    const { name, isLastItem } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, isLastItem ? styles.lastItem : '']}
        onPress={this.handlePress}
        // eslint-disable-next-line prettier/prettier
      >
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

export default ListItem;
