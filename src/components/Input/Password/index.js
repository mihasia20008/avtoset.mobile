import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import ValidateIcon from '../../ValidateIcon';

import { styles as globalStyles } from '../index';

class InputPassword extends Component {
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

  handleChangeText = value => {
    const { name, status, onEvent } = this.props;

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: '',
      });
    }
    this.setState({ value });
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
    if (value.length < 6) {
      onEvent(name, {
        status: 'error',
        errorText: 'Пароль слишком короткий!',
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
        <TextInput
          style={globalStyles.input}
          secureTextEntry
          onChangeText={this.handleChangeText}
          onBlur={this.handleInputBlur}
          value={value}
          autoCorrect={false}
        />
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

export default InputPassword;
