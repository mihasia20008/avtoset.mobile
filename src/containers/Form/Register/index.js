import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Confidential from '../../../components/Confidential';

import globalFormStyles from '../styles';
import { registerUser, resetRegisterData } from '../../../redux/user/actions';

class RegisterForm extends Component {
  static propTypes = {
    isSign: PropTypes.bool.isRequired,
    defaultPhone: PropTypes.string,
    infoMessage: PropTypes.string,
    errors: PropTypes.object.isRequired,
    onSuccessSign: PropTypes.func.isRequired,
    onRepeatPhone: PropTypes.func.isRequired,
    onGoToAuth: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    login: {
      type: 'phone-confirm',
      label: 'Номер телефона',
      value: this.props.defaultPhone || '',
      required: true,
      editable: true,
      status: '',
      errorText: '',
    },
    full_name: {
      type: 'name',
      label: 'Фамилия Имя Отчество',
      value: '',
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    email: {
      type: 'email',
      label: 'E-mail',
      value: '',
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    password: {
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    confirm_password: {
      type: 'password',
      label: 'Подтверждение пароля',
      value: '',
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    personal_birthday: {
      type: 'date-picker',
      label: 'Дата рождения',
      value: '',
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    location: {
      type: 'city-picker',
      label: 'Город',
      displayed: '',
      value: -1,
      required: true,
      editable: false,
      forceClose: false,
      focused: false,
      status: '',
      errorText: '',
    },
    personal_gender: {
      type: 'checkbox',
      label: 'Пол',
      value: '',
      values: [{ text: 'Мужской', value: 'M' }, { text: 'Женский', value: 'F' }],
      required: true,
      editable: false,
      status: '',
      errorText: '',
    },
    car: {
      type: 'car-picker',
      value: {},
      required: true,
      editable: false,
      complete: false,
      errorText: '',
    },
    confidential: {
      error: false,
      checked: false,
      errorText: '',
      // editable: false,
    },
    errors: {
      wasShow: false,
      text: '',
    },
  };

  static getDerivedStateFromProps(props, state) {
    const serverErrorKeys = Object.keys(props.errors);
    if (serverErrorKeys.length) {
      let notProcessedErrors = serverErrorKeys;
      const newState = Object.keys(state).reduce((acc, key) => {
        const filteredErrorKeys = serverErrorKeys.filter(error => error.search(`\\.${key}`) !== -1);
        notProcessedErrors = notProcessedErrors.filter(error => error.search(`\\.${key}`) === -1);
        if (key === 'car') {
          const carErrors = filteredErrorKeys.reduce(
            (list, error) =>
              Object.assign({}, list, {
                [`${error.split('.')[2]}`]: props.errors[error][0],
              }),
            {},
          );
          return Object.assign({}, acc, {
            [`${key}`]: Object.assign({}, state[key], { errorText: carErrors }),
          });
        }
        const errorText = filteredErrorKeys.reduce((text, error) => {
          if (text.length) {
            return `${text} \n${props.errors[error][0]}`;
          }
          return props.errors[error][0];
        }, '');
        return Object.assign({}, acc, {
          [`${key}`]: Object.assign({}, state[key], { errorText }),
        });
      }, {});
      const errorText = notProcessedErrors.reduce((text, error) => {
        if (text.length) {
          return `${text} \n${props.errors[error][0]}`;
        }
        return props.errors[error][0];
      }, '');
      newState.errors = Object.assign({}, state.errors, { wasShow: true, text: errorText });
      props.dispatch(resetRegisterData());
      return newState;
    }

    if (props.confirmPhoneStatus === 2 && state.login.editable) {
      return Object.keys(state).reduce((acc, key) => {
        acc[key] = Object.assign({}, state[key], { editable: key !== 'phone' });
        return acc;
      }, {});
    }
    return {};
  }

  componentDidUpdate(prevProps) {
    const { isSign: nowSignStatus, onSuccessSign, dispatch } = this.props;
    const { isSign: prevSignStatus } = prevProps;

    if (nowSignStatus && !prevSignStatus) {
      onSuccessSign();
      dispatch(resetRegisterData());
    }
  }

  handleGoToAuth = () => {
    const { onGoToAuth, dispatch } = this.props;
    onGoToAuth();
    dispatch(resetRegisterData());
  };

  handleInputBlur = (key, value, phoneConfirmStatus) => {
    const { password } = this.state;

    switch (true) {
      case key === 'confirm_password': {
        if (password.value && value.value !== password.value) {
          this.setState(prevState => ({
            confirm_password: Object.assign({}, prevState.confirm_password, {
              status: 'error',
              errorText: 'Пароли не совпадают!',
              value: value.value,
            }),
          }));
          return;
        }
        this.setState(prevState => ({
          [`${key}`]: Object.assign({}, prevState[key], value),
        }));
        return;
      }
      case key === 'login': {
        if (phoneConfirmStatus === 1) {
          const { onRepeatPhone } = this.props;
          onRepeatPhone({
            phone: value.value,
            message: 'Пользователь с таким номером телефона существует.',
          });
          return;
        }
        this.setState(prevState => ({
          [`${key}`]: Object.assign({}, prevState[key], value),
        }));
        return;
      }
      default: {
        this.setState(prevState => ({
          [`${key}`]: Object.assign({}, prevState[key], value),
        }));
      }
    }

    const { confirm_password: confirmPassword } = this.state;
    if (key === 'password' && confirmPassword.value) {
      if ((!value.value && this.state[key].required) || (value.value && value.value.length < 6)) {
        this.setState(prevState => ({
          confirm_password: Object.assign({}, prevState.confirm_password, {
            status: '',
            errorText: '',
          }),
        }));
        return;
      }
      if (confirmPassword.value && value.value !== confirmPassword.value) {
        this.setState(prevState => ({
          confirm_password: Object.assign({}, prevState.confirm_password, {
            status: 'error',
            errorText: 'Пароли не совпадают!',
          }),
        }));
        return;
      }
      this.setState(prevState => ({
        confirm_password: Object.assign({}, prevState.confirm_password, {
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

  handleToggleConfidentialStatus = () => {
    const { checked } = this.state.confidential;

    if (checked) {
      this.setState(prevState => ({
        confidential: Object.assign({}, prevState.confidential, {
          error: true,
          checked: !checked,
        }),
      }));
      return;
    }

    const resultValidation = this.validateFields();
    if (!resultValidation) {
      this.setState(prevState => ({
        confidential: Object.assign({}, prevState.confidential, {
          error: true,
          checked: false,
        }),
      }));
      return;
    }

    this.setState(prevState => ({
      confidential: Object.assign({}, prevState.confidential, {
        error: false,
        checked: !checked,
      }),
    }));
  };

  validateFields = checkConfirm => {
    let canSubmit = true;
    const submitObject = {
      user: {},
    };

    Object.keys(this.state).forEach(key => {
      const input = this.state[key];
      if (key === 'car') {
        if (!input.complete) {
          canSubmit = false;
          this.setState({
            [`${key}`]: Object.assign({}, input, {
              errorText: 'Поле обязательно для заполнения!',
            }),
          });
          return;
        }
        submitObject[key] = input.value;
        return;
      }
      if (key === 'confidential' && checkConfirm) {
        if (input.error) {
          canSubmit = false;
        }
        if (!input.checked) {
          canSubmit = false;
          this.setState({
            [`${key}`]: Object.assign({}, input, {
              error: true,
            }),
          });
        }
        submitObject[key] = input.checked;
        return;
      }
      if (input.status === 'error') {
        canSubmit = false;
        return;
      }
      if ((!input.value || input.value < 0) && input.required) {
        this.setState({
          [`${key}`]: Object.assign({}, input, {
            status: 'error',
            errorText: 'Поле обязательно для заполнения!',
          }),
        });
        canSubmit = false;
        return;
      }
      if (key === 'personal_birthday') {
        submitObject.user[key] = input.value.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1');
        return;
      }
      if (key === 'login') {
        submitObject.user[key] = `7${input.value}`;
        return;
      }
      submitObject.user[key] = input.value;
    });

    return canSubmit ? submitObject : canSubmit;
  };

  handleSubmitForm = () => {
    const resultValidation = this.validateFields(true);

    if (resultValidation) {
      const { dispatch } = this.props;
      dispatch(registerUser(resultValidation));
    }
  };

  render() {
    const { infoMessage } = this.props;
    const { errors, ...restState } = this.state;
    const { checked } = restState.confidential;

    return (
      <View onStartShouldSetResponder={this.handleTouchOutsideCityPicker}>
        {infoMessage ? <Text style={globalFormStyles.infoMessage}>{infoMessage}</Text> : null}
        {Object.keys(restState).map(key => {
          if (key === 'confidential') {
            return (
              <Confidential
                key={key}
                {...restState[key]}
                onToggleStatus={this.handleToggleConfidentialStatus}
              />
            );
          }
          return (
            <Input
              key={key}
              name={key}
              onEvent={this.handleInputBlur}
              onFocus={this.handleInputFocus}
              {...restState[key]}
            />
          );
        })}
        {errors.text ? <Text style={globalFormStyles.errorText}>{errors.text}</Text> : null}
        <View style={globalFormStyles.buttons}>
          <Button disabled={!checked} text="Зарегистироваться" onPress={this.handleSubmitForm} />
          <Button isShadow text="Назад" onPress={this.handleGoToAuth} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User, PhoneConfirm }) => {
  return {
    isSign: User.result.isSign,
    errors: User.errors.sign,
    confirmPhoneStatus: PhoneConfirm.status,
  };
};

export default connect(mapStateToProps)(RegisterForm);
