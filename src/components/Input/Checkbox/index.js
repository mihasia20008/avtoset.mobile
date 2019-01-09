import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import Item from './blocks/Item';

import globalStyles from '../styles';

const styles = StyleSheet.create({
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlWrap: {
    flexBasis: '46%',
  },
});

class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = { editable: true };

  handleSelect = value => {
    const { name, onEvent } = this.props;
    onEvent(name, {
      status: 'success',
      errorText: '',
      value,
    });
  };

  render() {
    const { label, required, editable, errorText, value, values } = this.props;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <View style={styles.controlContainer}>
          {values.map(item => (
            <View key={item.value} style={styles.controlWrap}>
              <Item
                text={item.text}
                value={item.value}
                isActive={item.value === value}
                editable={editable}
                onSelect={this.handleSelect}
              />
            </View>
          ))}
        </View>
        {errorText ? (
          <View style={globalStyles.errorWrap}>
            <Text style={globalStyles.errorText}>{errorText}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Checkbox;
