import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Platform } from 'react-native';

import TextInputMask from 'react-native-text-input-mask';
import globalStyles from '../styles';

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 1,
    left: 1,
    zIndex: 3,
    width: Platform.OS === 'android' ? 43 : 37,
    height: Platform.OS === 'android' ? 43 : 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderRightWidth: 1,
    borderRightColor: '#eaebec',
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 17,
  },
  input: {
    paddingLeft: Platform.OS === 'android' ? 45 : 39,
  },
});

class InputDisabledText extends Component {
  static propTypes = {
    useMask: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  };

  render() {
    const { label, value, useMask } = this.props;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
        </View>
        {useMask ? (
          <View>
            <View style={styles.wrap}>
              <Text style={styles.text}>+7</Text>
            </View>
            <TextInputMask
              style={[globalStyles.input, styles.input]}
              value={value.slice(1)}
              editable={false}
              selectTextOnFocus={false}
              mask="([000]) [000] [00] [00]"
            />
          </View>
        ) : (
          <Text style={globalStyles.input}>{value}</Text>
        )}
      </View>
    );
  }
}

export default InputDisabledText;
