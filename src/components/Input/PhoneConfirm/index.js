import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import InputPhone from '../Phone';
import InputConfirmCode from './blocks/ConfirmCode';
import Control from './blocks/Control';

import {
  sendConfirmCode,
  checkConfirmCode,
  resetConfirmCode,
  resetConfirmProgress,
} from '../../../redux/code/actions';

class InputPhoneConfirm extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string,
    errorText: PropTypes.string,
    required: PropTypes.bool,
    editable: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    isFetching: PropTypes.bool,
    codeWasSend: PropTypes.bool,
    confirmStatus: PropTypes.number,
    confirmError: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    editable: true,
    onFocus: () => {},
  };

  state = {
    value: '',
    canSendCode: false,
    isTimerRunning: false,
    prevSendStatus: this.props.codeWasSend,
    prevConfirmError: this.props.confirmError,
    codeField: {
      label: 'Код подтверждения',
      value: '',
      required: true,
      status: '',
      errorText: '',
    },
  };

  static getDerivedStateFromProps(props, state) {
    const { codeWasSend: nowSendStatus, confirmError: nowConfirmError } = props;
    const { prevSendStatus, prevConfirmError } = state;

    if (prevSendStatus !== nowSendStatus) {
      return {
        prevSendStatus: nowSendStatus,
        isTimerRunning: true,
      };
    }

    if (prevConfirmError !== nowConfirmError) {
      return {
        prevConfirmError: nowConfirmError,
        codeField: Object.assign({}, state.codeField, {
          status: 'error',
          errorText: nowConfirmError,
        }),
      };
    }
    return {};
  }

  componentDidUpdate(prevProps) {
    const { confirmStatus: prevConfirmStatus } = prevProps;
    const { confirmStatus: nowConfirmStatus, name, onEvent } = this.props;
    const { value } = this.state;

    if (!prevConfirmStatus && nowConfirmStatus) {
      onEvent(
        name,
        {
          status: 'success',
          errorText: '',
          value,
        },
        nowConfirmStatus,
      );
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetConfirmProgress());
  }

  handleInputFocus = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
  };

  handleSendConfirmCode = () => {
    const { isFetching, dispatch } = this.props;
    const { value } = this.state;

    if (value && !isFetching) {
      dispatch(sendConfirmCode(value));
    }
  };

  handleTimerStop = () => {
    this.setState({ isTimerRunning: false });
  };

  handleClearCodeField = () => {
    const { dispatch } = this.props;
    dispatch(resetConfirmCode());
    this.setState(prevState => ({
      codeField: Object.assign({}, prevState.codeField, {
        status: '',
        errorText: '',
      }),
    }));
  };

  handlePhoneTyping = (name, value) => {
    const { onEvent } = this.props;
    if (value.status !== 'success') {
      onEvent(name, value);
      this.setState({ canSendCode: false });
      return;
    }
    onEvent(name, {
      status: 'success',
      errorText: '',
    });
    this.setState({
      value: value.value,
      canSendCode: true,
    });
  };

  handleCodeTyping = (key, value) => {
    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));
    if (value.status === 'success') {
      const { dispatch } = this.props;
      const { value: phone } = this.state;
      dispatch(checkConfirmCode(phone, value.value));
    }
  };

  renderConfirmField() {
    const { codeWasSend, confirmStatus } = this.props;
    const { codeField } = this.state;

    if (codeWasSend && !confirmStatus) {
      return (
        <InputConfirmCode
          name="codeField"
          onEvent={this.handleCodeTyping}
          onClearCode={this.handleClearCodeField}
          {...codeField}
        />
      );
    }

    return null;
  }

  render() {
    const {
      name,
      label,
      status,
      errorText,
      required,
      editable,
      onFocus,
      codeWasSend,
      confirmStatus,
    } = this.props;
    const { value, canSendCode, isTimerRunning } = this.state;

    return (
      <View>
        <InputPhone
          name={name}
          value={value}
          label={label}
          status={status}
          errorText={errorText}
          required={required}
          editable={editable}
          returnTypingValue
          onFocus={onFocus}
          onEvent={this.handlePhoneTyping}
        />
        <Control
          phoneConfirmed={confirmStatus === 2}
          codeWasSend={codeWasSend}
          canSendCode={canSendCode}
          isTimerRunning={isTimerRunning}
          onGetConfirmCode={this.handleSendConfirmCode}
          onTimerStop={this.handleTimerStop}
        />
        {this.renderConfirmField()}
      </View>
    );
  }
}

const mapStateToProps = ({ PhoneConfirm }) => {
  return {
    isFetching: PhoneConfirm.isFetching,
    codeWasSend: PhoneConfirm.codeWasSend,
    confirmStatus: PhoneConfirm.status,
    confirmError: PhoneConfirm.errors.confirm,
  };
};

export default connect(mapStateToProps)(InputPhoneConfirm);
