import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { authUser, resetAuthData } from '../../../redux/user/actions';
import { checkNetwork } from '../../../services/utilities';

import globalFormStyles from '../styles';

class AuthForm extends Component {
  static propTypes = {
    defaultPhone: PropTypes.string,
    infoMessage: PropTypes.string,
    isAuth: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    onSuccessSubmit: PropTypes.func.isRequired,
    onGoToRestorePassword: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    login: {
      type: 'phone',
      label: 'Номер телефона',
      value: this.props.defaultPhone || '',
      required: true,
      status: '',
      errorText: '',
    },
    password: {
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      status: '',
      errorText: '',
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultPhone && props.defaultPhone.length > state.login.value.length) {
      return {
        login: Object.assign({}, state.login, { value: props.defaultPhone }),
      };
    }
    return {};
  }

  componentDidUpdate(prevProps) {
    const { isAuth: nowAuthStatus, onSuccessSubmit, dispatch } = this.props;
    const { isAuth: prevAuthStatus } = prevProps;

    if (nowAuthStatus && !prevAuthStatus) {
      onSuccessSubmit();
      dispatch(resetAuthData());
    }
  }

  handleInputBlur = (key, value) => {
    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));
  };

  handleSubmitForm = async () => {
    let canSubmit = true;
    const submitObject = {};

    Object.keys(this.state).forEach(key => {
      const input = this.state[key];
      if (input.status === 'error') {
        canSubmit = false;
        return;
      }
      if (!input.value && input.required) {
        this.setState({
          [`${key}`]: Object.assign({}, input, {
            status: 'error',
            errorText: 'Поле обязательно для заполнения!',
          }),
        });
        canSubmit = false;
        return;
      }
      if (key === 'login') {
        submitObject[key] = `7${input.value}`;
        return;
      }
      submitObject[key] = input.value;
    });

    if (canSubmit) {
      const hasNetwork = await checkNetwork();
      if (hasNetwork) {
        const { dispatch } = this.props;
        dispatch(authUser(submitObject));
      } else {
        // eslint-disable-next-line no-alert
        alert(
          'Для авторизации в приложении необходимо соединение с сетью Интернет. \n' +
            'Проверьте наличие соединения.',
        );
      }
    }
  };

  handleGoToRestorePassword = () => {
    const { onGoToRestorePassword } = this.props;
    onGoToRestorePassword();
  };

  render() {
    const { errorText, infoMessage } = this.props;

    return (
      <View>
        {infoMessage ? <Text style={globalFormStyles.infoMessage}>{infoMessage}</Text> : null}
        {Object.keys(this.state).map(key => (
          <Input key={key} name={key} onEvent={this.handleInputBlur} {...this.state[key]} />
        ))}
        {errorText ? <Text style={globalFormStyles.errorText}>{errorText}</Text> : null}
        <View style={globalFormStyles.buttons}>
          <Button text="Войти" onPress={this.handleSubmitForm} />
          <Button isShadow text="Забыли пароль?" onPress={this.handleGoToRestorePassword} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    isAuth: User.result.isAuth,
    errorText: User.errors.auth,
  };
};

export default connect(mapStateToProps)(AuthForm);
