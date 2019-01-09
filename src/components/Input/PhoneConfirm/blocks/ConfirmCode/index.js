import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import TextInputMask from 'react-native-text-input-mask';
import ValidateIcon from '../../../../ValidateIcon';

import globalStyles from '../../../styles';

class InputConfirmCode extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    returnTypingValue: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onClearCode: PropTypes.func.isRequired,
  };

  static defaultProps = { returnTypingValue: true };

  static validateValue(value, required) {
    if (value === '' && required) {
      return {
        status: 'error',
        errorText: 'Поле обязательно для заполнения!',
      };
    }
    if (value.length < 4) {
      return {
        status: 'error',
        errorText: 'Введен короткий код подтверждения!',
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

  handleFocus = () => {
    const { onClearCode } = this.props;
    onClearCode();
  };

  handleChangeText = value => {
    const { name, status, required, returnTypingValue, onEvent } = this.props;

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: '',
      });
    }
    this.setState({ value });

    if (returnTypingValue) {
      const validate = InputConfirmCode.validateValue(value, required);
      if (validate.status === 'success') {
        this.input.blur();
      }
    }
  };

  handleInputBlur = () => {
    const { value } = this.state;
    const { name, required, onEvent } = this.props;

    const validate = InputConfirmCode.validateValue(value, required);
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
    const { label, required, status, errorText } = this.props;
    const { value } = this.state;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <TextInputMask
          style={globalStyles.input}
          refInput={ref => {
            this.input = ref;
          }}
          keyboardType="number-pad"
          onFocus={this.handleFocus}
          onChangeText={this.handleChangeText}
          onBlur={this.handleInputBlur}
          value={value}
          mask="[0000]"
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

export default InputConfirmCode;
