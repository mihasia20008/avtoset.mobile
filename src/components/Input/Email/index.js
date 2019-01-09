import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import ValidateIcon from '../../ValidateIcon';

import globalStyles from '../styles';

class InputEmail extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    editable: true,
    onFocus: () => {},
  };

  state = {
    value: this.props.value,
  };

  handleInputFocus = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
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
    if (value.length > 320) {
      onEvent(name, {
        status: 'error',
        errorText: 'Превышено максимальное количество символов!',
        value: '',
      });
      return;
    }
    // eslint-disable-next-line max-len
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value.toLowerCase())) {
      onEvent(name, {
        status: 'error',
        errorText: 'Введен неверный адрес электронной почты!',
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
    const { label, required, editable, status, errorText } = this.props;
    const { value } = this.state;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <TextInput
          style={globalStyles.input}
          keyboardType="email-address"
          onFocus={this.handleInputFocus}
          onChangeText={this.handleChangeText}
          onBlur={this.handleInputBlur}
          value={value}
          editable={editable}
          selectTextOnFocus={editable}
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

export default InputEmail;
