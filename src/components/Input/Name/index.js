import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import ValidateIcon from '../../ValidateIcon';

import globalStyles from '../styles';

class InputName extends Component {
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

    const item = value.split(' ');
    if (item.length < 2) {
      onEvent(name, {
        status: 'error',
        errorText: 'Фамилия и Имя являются обязательными!',
        value: '',
      });
      return;
    }
    if (item[0].length < 2) {
      onEvent(name, {
        status: 'error',
        errorText: 'Неверный ввод Фамилии!',
        value: '',
      });
      return;
    }
    if (item[1].length < 2) {
      onEvent(name, {
        status: 'error',
        errorText: 'Неверный ввод Имени!',
        value: '',
      });
      return;
    }
    if (item[2] && item[2].length < 2) {
      onEvent(name, {
        status: 'error',
        errorText: 'Неверный ввод Отчества!',
        value: '',
      });
      return;
    }
    if (!/^[а-яА-ЯёЁ]{2,}\s[а-яА-ЯёЁ\s]{2,}$/.test(value)) {
      onEvent(name, {
        status: 'error',
        errorText: 'Разрешен ввод только кириллических символов!',
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
          autoCapitalize="words"
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

export default InputName;
