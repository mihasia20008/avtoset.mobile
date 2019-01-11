import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import globalFormStyles from '../styles';
import { changePassword } from '../../../redux/user/actions';

class ChangePasswordForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isChange: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    onSuccessChange: PropTypes.func.isRequired,
    onGoToProfile: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    password: {
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      status: '',
      errorText: '',
    },
    confirm_password: {
      type: 'password',
      label: 'Подтверждение пароля',
      value: '',
      required: true,
      status: '',
      errorText: '',
    },
  };

  componentDidUpdate(prevProps) {
    const { isChange: nowChangeStatus, onSuccessChange } = this.props;
    const { isChange: prevChangeStatus } = prevProps;

    if (nowChangeStatus && !prevChangeStatus) {
      onSuccessChange();
    }
  }

  handleGoToProfile = () => {
    const { onGoToProfile } = this.props;
    onGoToProfile();
  };

  handleInputBlur = (key, value) => {
    const { password } = this.state;

    if (key === 'confirm_password' && value.value !== password.value) {
      this.setState(prevState => ({
        confirm_password: Object.assign({}, prevState.confirm_password, {
          status: 'error',
          errorText: 'Пароли не совпадают!',
        }),
      }));
      return;
    }

    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));

    const { confirm_password: confirmPassword } = this.state;
    if (key === 'password' && confirmPassword.value !== '') {
      if ((value.value === '' && this.state[key].required) || value.value.length < 6) {
        this.setState(prevState => ({
          confirm_password: Object.assign({}, prevState.confirm_password, {
            status: '',
            errorText: '',
          }),
        }));
        return;
      }
      if (value.value !== confirmPassword.value) {
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

  validateFields = () => {
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

    return canSubmit ? submitObject : canSubmit;
  };

  handleSubmitForm = () => {
    const resultValidation = this.validateFields();
    if (resultValidation) {
      const { id, dispatch } = this.props;
      dispatch(changePassword(id, resultValidation));
    }
  };

  render() {
    const { errorText } = this.props;

    return (
      <View>
        {Object.keys(this.state).map(key => (
          <Input key={key} name={key} onEvent={this.handleInputBlur} {...this.state[key]} />
        ))}
        {errorText ? <Text style={globalFormStyles.errorText}>{errorText}</Text> : null}
        <View style={globalFormStyles.buttons}>
          <Button text="Сохранить изменения" onPress={this.handleSubmitForm} />
          <Button isShadow text="Назад" onPress={this.handleGoToProfile} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    id: User.userData.id,
    isChange: User.result.isChange,
    errorText: User.errors.change,
  };
};

export default connect(mapStateToProps)(ChangePasswordForm);
