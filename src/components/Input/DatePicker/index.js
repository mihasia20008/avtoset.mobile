import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

import ValidateIcon from '../../ValidateIcon';

import globalStyles from '../styles';

const styles = StyleSheet.create({
  dateContainer: {
    width: '100%',
  },
  dateInput: {
    alignItems: 'stretch',
  },
  dateText: {
    color: '#383838',
    fontFamily: 'PT Sans',
    fontSize: 18,
  },
  dateTextHidden: {
    opacity: 0,
  },
  btnTextConfirm: {
    color: '#0065BF',
  },
});

class InputDatePicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    editable: true,
    onFocus: () => {},
  };

  state = {
    value: '',
  };

  static getDerivedStateFromProps(props) {
    return {
      value: props.value,
    };
  }

  static getMinDate() {
    const dateNow = new Date();
    return new Date(dateNow.setFullYear(dateNow.getFullYear() - 100));
  }

  static getMaxDate() {
    const dateNow = new Date();
    return new Date(dateNow.setFullYear(dateNow.getFullYear() - 16));
  }

  handleInputFocus = () => {
    const { name, onFocus } = this.props;
    onFocus(name);
  };

  handleCancelSelect = () => {
    setTimeout(() => {
      const { name, onEvent } = this.props;
      const { value } = this.state;

      if (!value) {
        onEvent(name, {
          status: 'error',
          errorText: 'Поле обязательно для заполнения!',
          value: '',
        });
      }
    }, 500);
  };

  handleSelectDate = value => {
    const { name, onEvent } = this.props;

    onEvent(name, {
      status: 'success',
      errorText: '',
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
        <DatePicker
          style={styles.dateContainer}
          mode="date"
          date={value}
          locale="ru"
          format="DD.MM.YYYY"
          minDate={InputDatePicker.getMinDate()}
          maxDate={InputDatePicker.getMaxDate()}
          confirmBtnText="Подтвердить"
          cancelBtnText="Отменить"
          showIcon={false}
          customStyles={{
            dateInput: [globalStyles.input, styles.dateInput],
            dateText: value ? styles.dateText : styles.dateTextHidden,
            btnTextConfirm: styles.btnTextConfirm,
          }}
          disabled={!editable}
          onOpenModal={this.handleInputFocus}
          onCloseModal={this.handleCancelSelect}
          onDateChange={this.handleSelectDate}
        />
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

export default InputDatePicker;
