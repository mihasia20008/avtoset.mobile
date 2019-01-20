import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { checkNetwork } from '../../../services/utilities';

class FirstRunForm extends Component {
  static propTypes = {
    onEnterPhone: PropTypes.func.isRequired,
    onGoToAuth: PropTypes.func.isRequired,
  };

  state = {
    login: {
      type: 'phone',
      label: 'Номер телефона',
      value: '',
      required: true,
      status: '',
      errorText: '',
    },
  };

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
      submitObject[key] = `7${input.value}`;
    });

    if (canSubmit) {
      const hasNetwork = await checkNetwork();
      if (hasNetwork) {
        const { onEnterPhone } = this.props;
        const { value } = this.state.login;
        onEnterPhone(value);
      } else {
        // eslint-disable-next-line no-alert
        alert(
          'Для перехода к следующему шагу необходимо соединение с сетью Интернет. \n' +
            'Проверьте наличие соединения.',
        );
      }
    }
  };

  handleGoToAuth = () => {
    const { onGoToAuth } = this.props;
    onGoToAuth();
  };

  render() {
    return (
      <View>
        {Object.keys(this.state).map(key => (
          <Input key={key} name={key} onEvent={this.handleInputBlur} {...this.state[key]} />
        ))}
        <View>
          <Button text="Далее" onPress={this.handleSubmitForm} />
        </View>
        <View style={{ marginTop: 15 }}>
          <Button isShadow text="Вернуться" onPress={this.handleGoToAuth} />
        </View>
      </View>
    );
  }
}

export default FirstRunForm;
