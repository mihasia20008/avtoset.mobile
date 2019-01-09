import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import globalFormStyles from '../styles';

class RegisterForm extends Component {
  static propTypes = {
    onRepeatPhone: PropTypes.func.isRequired,
    onGoToAuth: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    // phone: {
    //   type: 'phone-confirm',
    //   label: 'Номер телефона',
    //   value: '',
    //   required: true,
    //   editable: true,
    //   status: '',
    //   errorText: '',
    // },
    name: {
      type: 'name',
      label: 'Фамилия Имя Отчество',
      value: '',
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    email: {
      type: 'email',
      label: 'E-mail',
      value: '',
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    password: {
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    confirmPassword: {
      type: 'password',
      label: 'Подтверждение пароля',
      value: '',
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    location: {
      type: 'city-picker',
      label: 'Город',
      id: -1,
      value: '',
      required: true,
      // editable: false,
      forceClose: false,
      focused: false,
      status: '',
      errorText: '',
    },
    birthday: {
      type: 'date-picker',
      label: 'Дата рождения',
      value: '',
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    gender: {
      type: 'checkbox',
      label: 'Пол',
      value: '',
      values: [{ text: 'Мужской', value: 'M' }, { text: 'Женский', value: 'F' }],
      required: true,
      // editable: false,
      status: '',
      errorText: '',
    },
    car: {
      type: 'car-picker',
      value: '',
      required: true,
      // editable: false,
      complete: false,
      status: '',
      errorText: '',
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (props.confirmPhoneStatus === 2 && state.phone.editable) {
      return Object.keys(state).reduce((acc, key) => {
        acc[key] = Object.assign({}, state[key], { editable: key !== 'phone' });
        return acc;
      }, {});
    }
    return {};
  }

  handleGoToAuth = () => {
    const { onGoToAuth } = this.props;
    onGoToAuth();
  };

  handleInputBlur = (key, value, phoneConfirmStatus) => {
    const { password } = this.state;
    if (key === 'confirmPassword' && value.value !== password.value) {
      this.setState(prevState => ({
        confirmPassword: Object.assign({}, prevState.confirmPassword, {
          status: 'error',
          errorText: 'Пароли не совпадают!',
        }),
      }));
      return;
    }

    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));

    if (key === 'phone' && phoneConfirmStatus === 1) {
      const { onRepeatPhone } = this.props;
      onRepeatPhone({
        phone: value.value,
        message: 'Пользователь с таким номером телефона существует.',
      });
    }

    const { confirmPassword } = this.state;
    if (key === 'password' && confirmPassword.value !== '') {
      if ((value.value === '' && this.state[key].required) || value.value.length < 6) {
        this.setState(prevState => ({
          confirmPassword: Object.assign({}, prevState.confirmPassword, {
            status: '',
            errorText: '',
          }),
        }));
        return;
      }
      if (value.value !== confirmPassword.value) {
        this.setState(prevState => ({
          confirmPassword: Object.assign({}, prevState.confirmPassword, {
            status: 'error',
            errorText: 'Пароли не совпадают!',
          }),
        }));
        return;
      }
      this.setState(prevState => ({
        confirmPassword: Object.assign({}, prevState.confirmPassword, {
          status: 'success',
          errorText: '',
        }),
      }));
    }
  };

  handleInputFocus = name => {
    if (name === 'location') {
      this.setState(prevState => ({
        location: Object.assign({}, prevState.location, {
          forceClose: false,
          focused: true,
        }),
      }));
      return;
    }
    this.handleTouchOutsideCityPicker();
  };

  handleTouchOutsideCityPicker = () => {
    const { focused } = this.state.location;
    if (focused) {
      this.setState(prevState => ({
        location: Object.assign({}, prevState.location, {
          forceClose: true,
          focused: false,
        }),
      }));
    }
  };

  handleSubmitForm = () => {
    // alert('submit');
  };

  render() {
    return (
      <View onStartShouldSetResponder={this.handleTouchOutsideCityPicker}>
        {Object.keys(this.state).map(key => (
          <Input
            key={key}
            name={key}
            onEvent={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            {...this.state[key]}
          />
        ))}
        <View style={globalFormStyles.buttons}>
          <Button text="Зарегистироваться" onPress={this.handleSubmitForm} />
          <Button isShadow text="Назад" onPress={this.handleGoToAuth} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ PhoneConfirm }) => {
  return {
    confirmPhoneStatus: PhoneConfirm.status,
  };
};

export default connect(mapStateToProps)(RegisterForm);
