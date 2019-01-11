import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ValidateIcon from '../../../../ValidateIcon';

import globalStyles from '../../../styles';

class SelectPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.oneOf(null), PropTypes.string]),
    values: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    value: null,
    editable: true,
    onFocus: () => {},
  };

  static validateValue(value, required) {
    if (!value && required) {
      return {
        status: 'error',
        errorText: 'Поле обязательно для заполнения!',
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

  componentDidMount() {
    const { values } = this.props;

    if (values.length === 1) {
      this.handleValueChange(values[0].value);
      if (Platform.OS !== 'android') {
        this.handleSelect(values[0].value);
      }
    }
  }

  handleValueChange = value => {
    this.setState({ value });
    if (Platform.OS === 'android') {
      this.handleSelect(value);
    }
  };

  handleOpenPicker = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
  };

  handleSelect = value => {
    const { name, required, onEvent } = this.props;
    const { value: stateValue } = this.state;

    value = value || stateValue;

    const validate = SelectPicker.validateValue(value, required);

    if (validate.status !== 'success') {
      onEvent(name, {
        ...validate,
        value: '',
      });
      return;
    }

    onEvent(name, {
      value,
      ...validate,
    });
  };

  render() {
    const { label, placeholder, required, values, editable, errorText, status } = this.props;
    const { value } = this.state;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <RNPickerSelect
          placeholder={{
            label: placeholder,
            value: null,
          }}
          placeholderTextColor="#383838"
          disabled={!editable}
          items={values}
          style={{
            inputIOS: globalStyles.input,
            inputAndroid: globalStyles.input,
          }}
          value={value}
          hideIcon
          hideDoneBar
          onClose={this.handleSelect}
          onValueChange={this.handleValueChange}
          pickerProps={{
            onStartShouldSetResponder: this.handleOpenPicker,
          }}
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

export default SelectPicker;
