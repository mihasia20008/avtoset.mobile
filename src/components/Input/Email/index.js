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
    returnTypingValue: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    editable: true,
    returnTypingValue: true,
    onFocus: () => {},
  };

  static validateValue(value, required) {
    if (!value && required) {
      return {
        status: 'error',
        errorText: 'Поле обязательно для заполнения!',
      };
    }
    if (value.length > 320) {
      return {
        status: 'error',
        errorText: 'Превышено максимальное количество символов!',
      };
    }
    // eslint-disable-next-line max-len
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value.toLowerCase())) {
      return {
        status: 'error',
        errorText: 'Введен неверный адрес электронной почты!',
      };
    }

    return {
      status: 'success',
      errorText: '',
    };
  }

  state = {
    value: this.props.value,
  };

  handleInputFocus = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
  };

  handleChangeText = value => {
    const { name, status, returnTypingValue, required, onEvent } = this.props;

    this.setState({ value });

    if (returnTypingValue) {
      const validate = InputEmail.validateValue(value, required);
      if (validate.status === 'success') {
        onEvent(name, {
          ...validate,
          value,
        });
        return;
      }
      if (validate.status !== 'success' && status) {
        onEvent(name, {
          status: '',
          errorText: '',
          value: '',
        });
        return;
      }
    }

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: '',
      });
    }
  };

  handleInputBlur = () => {
    const { value } = this.state;
    const { name, required, onEvent } = this.props;

    const validate = InputEmail.validateValue(value, required);

    if (validate.status !== 'success') {
      onEvent(name, {
        ...validate,
        value: '',
      });
      return;
    }
    onEvent(name, {
      ...validate,
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
