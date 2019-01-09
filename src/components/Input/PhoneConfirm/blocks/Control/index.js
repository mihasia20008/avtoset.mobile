import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../../../Button';
import Timer from '../../../../Timer';

const styles = StyleSheet.create({
  controlContainer: {
    marginBottom: 15,
  },
  controlTextWrap: {
    marginTop: 10,
  },
  controlText: {
    fontFamily: 'PT Sans',
    fontSize: 13,
    color: '#888',
  },
});

class Control extends Component {
  static propTypes = {
    canSendCode: PropTypes.bool,
    codeWasSend: PropTypes.bool,
    isTimerRunning: PropTypes.bool,
    phoneConfirmed: PropTypes.bool,
    onGetConfirmCode: PropTypes.func.isRequired,
    onTimerStop: PropTypes.func.isRequired,
  };

  render() {
    const {
      canSendCode,
      codeWasSend,
      isTimerRunning,
      onGetConfirmCode,
      onTimerStop,
      phoneConfirmed,
    } = this.props;

    if (phoneConfirmed) {
      return null;
    }
    if (!codeWasSend) {
      return (
        <View style={styles.controlContainer}>
          <Button disabled={!canSendCode} text="Подтвердить номер" onPress={onGetConfirmCode} />
          <View style={styles.controlTextWrap}>
            <Text style={styles.controlText}>
              На Ваш номер телефона будет отправлена SMS с кодом подтверждения
            </Text>
          </View>
        </View>
      );
    }
    if (isTimerRunning) {
      return (
        <View style={styles.controlContainer}>
          <Button text="Отправить повторно" disabled onPress={onGetConfirmCode} />
          <View style={styles.controlTextWrap}>
            <Text style={styles.controlText}>
              Повторная отправка SMS возможна через: <Timer onTimerStop={onTimerStop} />
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.controlContainer}>
        <Button text="Отправить повторно" onPress={onGetConfirmCode} />
        <View style={styles.controlTextWrap}>
          <Text style={styles.controlText}>
            На Ваш номер телефона будет отправлена SMS с кодом подтверждения
          </Text>
        </View>
      </View>
    );
  }
}

export default Control;
