import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { authUser } from '../../../redux/user/actions';

const styles = StyleSheet.create({
  registerContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class AuthForm extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    onSuccessSubmit: PropTypes.func.isRequired,
    onGoToRestorePassword: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    phone: {
      type: 'phone',
      label: 'Номер телефона',
      value: '',
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

  componentDidUpdate(prevProps) {
    const { isAuth: nowAuthStatus, onSuccessSubmit } = this.props;
    const { isAuth: prevAuthStatus } = prevProps;

    if (nowAuthStatus && !prevAuthStatus) {
      onSuccessSubmit();
    }
  }

  handleInputBlur = (key, value) => {
    const prevValue = this.state[key];
    this.setState({
      [`${key}`]: Object.assign({}, prevValue, value),
    });
  };

  handleSubmitForm = () => {
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
      submitObject[key] = input.value;
    });

    if (canSubmit) {
      const { dispatch } = this.props;
      dispatch(authUser(submitObject));
    }
  };

  handleGoToForgetPassword = () => {
    const { onGoToRestorePassword } = this.props;
    onGoToRestorePassword();
  };

  render() {
    const { errorText } = this.props;

    return (
      <View>
        <View>
          {Object.keys(this.state).map(key => (
            <Input key={key} name={key} onEvent={this.handleInputBlur} {...this.state[key]} />
          ))}
        </View>
        {errorText ? (
          <View>
            <Text>{errorText}</Text>
          </View>
        ) : null}
        <View style={styles.registerContainer}>
          <Button text="Войти" onPress={this.handleSubmitForm} />
          <Button isShadow text="Забыли пароль?" onPress={this.handleGoToForgetPassword} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    isAuth: User.isAuth,
    errorText: User.errorAuth,
  };
};

export default connect(mapStateToProps)(AuthForm);
