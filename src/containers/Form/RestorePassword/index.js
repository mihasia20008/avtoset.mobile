import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { restorePassword, resetRestorePasswordData } from '../../../redux/user/actions';

import globalFormStyles from '../styles';

class RestorePasswordForm extends Component {
  static propTypes = {
    isRestore: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    restoreData: PropTypes.shape({
      phone: PropTypes.string,
      message: PropTypes.string,
    }),
    onGoToAuth: PropTypes.func.isRequired,
    onSuccessRestore: PropTypes.func.isRequired,
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
  };

  componentDidUpdate(prevProps) {
    const { isRestore: nowRestoreStatus, onSuccessRestore, restoreData, dispatch } = this.props;
    const { isRestore: prevRestoreStatus } = prevProps;

    if (nowRestoreStatus && !prevRestoreStatus) {
      onSuccessRestore(restoreData);
      dispatch(resetRestorePasswordData());
    }
  }

  handleInputBlur = (key, value) => {
    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));
  };

  handleSubmitForm = () => {
    let canSubmit = true;

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
      }
    });

    if (canSubmit) {
      const { dispatch } = this.props;
      const { value } = this.state.phone;
      dispatch(restorePassword(value));
    }
  };

  handleGoToAuth = () => {
    const { onGoToAuth, dispatch } = this.props;
    onGoToAuth();
    dispatch(resetRestorePasswordData());
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
          <Button text="Восстановить" onPress={this.handleSubmitForm} />
          <Button isShadow text="Назад" onPress={this.handleGoToAuth} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    isRestore: User.result.isRestore,
    errorText: User.errors.restore,
    restoreData: User.restoreData,
  };
};

export default connect(mapStateToProps)(RestorePasswordForm);
