import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import ValidateIcon from '../../ValidateIcon';

import globalStyles from '../styles';

class InputPassword extends Component {
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
    if (value.length < 6) {
      return {
        status: 'error',
        errorText: 'Пароль слишком короткий!',
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
      const validate = InputPassword.validateValue(value, required);
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
        });
        return;
      }
    }

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
      });
    }
  };

  handleInputBlur = () => {
    const { value } = this.state;
    const { name, required, onEvent } = this.props;

    const validate = InputPassword.validateValue(value, required);

    if (validate.status !== 'success') {
      onEvent(name, {
        ...validate,
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
          secureTextEntry
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

export default InputPassword;
