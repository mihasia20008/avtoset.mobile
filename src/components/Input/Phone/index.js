import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import ValidateIcon from '../../ValidateIcon';

import { styles as globalStyles } from '../index';

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 1,
    left: 1,
    zIndex: 3,
    width: 39,
    height: 39,
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
    paddingLeft: 42,
  },
});

class InputPhone extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    onEvent: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
  };

  handleChangeText = (formatted, extracted) => {
    const { name, status, onEvent } = this.props;

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: '',
      });
    }
    this.setState({ value: extracted });
  };

  handleInputBlur = () => {
    const { value } = this.state;
    const { name, required, onEvent } = this.props;

    if (value === '' && required) {
      onEvent(name, {
        status: 'error',
        errorText: 'Поле обязательно для заполнения!',
        value: '',
      });
      return;
    }
    if (value.length < 10) {
      onEvent(name, {
        status: 'error',
        errorText: 'Введен неверный номер телефона!',
        value: '',
      });
      return;
    }
    if (value[0] !== '9') {
      onEvent(name, {
        status: 'error',
        errorText: 'Номер телефона должен начинаться с 9!',
        value: '',
      });
      return;
    }
    onEvent(name, {
      status: 'success',
      errorText: '',
      value,
    });
  };

  render() {
    const { label, required, status, errorText } = this.props;
    const { value } = this.state;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <View>
          <View style={styles.wrap}>
            <Text style={styles.text}>+7</Text>
          </View>
          <TextInputMask
            style={[globalStyles.input, styles.input]}
            refInput={ref => {
              this.input = ref;
            }}
            keyboardType="number-pad"
            onChangeText={this.handleChangeText}
            onBlur={this.handleInputBlur}
            value={value}
            mask="([000]) [000] [00] [00]"
          />
        </View>
        {errorText ? (
          <View style={globalStyles.errorWrap}>
            <Text style={globalStyles.errorText}>{errorText}</Text>
          </View>
        ) : null}
        <ValidateIcon type={status} />
      </View>
    );
  }
}

export default InputPhone;
