import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Platform } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import ValidateIcon from '../../ValidateIcon';

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

class InputPhone extends Component {
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
    if (value.length < 10) {
      return {
        status: 'error',
        errorText: 'Введен неверный номер телефона!',
      };
    }
    if (value[0] !== '9') {
      return {
        status: 'error',
        errorText: 'Номер телефона должен начинаться с 9!',
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

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value && props.value.length > state.value.length) {
      return {
        value: props.value,
      };
    }
    return {};
  }

  handleInputFocus = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
  };

  handleChangeText = (formatted, extracted) => {
    const { name, status, required, returnTypingValue, onEvent } = this.props;

    this.setState({ value: extracted });

    if (returnTypingValue) {
      const validate = InputPhone.validateValue(extracted, required);
      if (validate.status === 'success') {
        onEvent(name, {
          ...validate,
          value: extracted,
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

    const validate = InputPhone.validateValue(value, required);

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
        <View>
          <View style={styles.wrap}>
            <Text style={styles.text}>+7</Text>
          </View>
          <TextInputMask
            style={[globalStyles.input, styles.input]}
            keyboardType="number-pad"
            onFocus={this.handleInputFocus}
            onChangeText={this.handleChangeText}
            onBlur={this.handleInputBlur}
            value={value}
            editable={editable}
            selectTextOnFocus={false}
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
