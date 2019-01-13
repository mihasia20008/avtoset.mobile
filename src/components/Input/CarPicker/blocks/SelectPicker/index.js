import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import ValidateIcon from '../../../../ValidateIcon';

import globalStyles from '../../../styles';

const styles = StyleSheet.create({
  inputIOS: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    color: '#383838',
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#eaebec',
    borderRadius: 2,
    fontFamily: 'PT Sans',
    fontSize: 16,
  },
  inputAndroid: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 11,
    paddingRight: 11,
    height: 45,
    color: '#383838',
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#eaebec',
    borderRadius: 2,
  },
});

class SelectPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
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
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
            viewContainer: {
              borderWidth: 1,
              borderColor: '#eaebec',
              borderRadius: 2,
            },
            underline: { borderTopWidth: 0 },
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
