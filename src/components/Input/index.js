import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputPhone from './Phone';
import InputPhoneConfirm from './PhoneConfirm';
import InputPassword from './Password';
import InputName from './Name';
import InputEmail from './Email';
import InputCityPicker from './CityPicker';
import InputDatePicker from './DatePicker';
import InputCarPicker from './CarPicker';
import Checkbox from './Checkbox';

class Input extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type, ...rest } = this.props;
    switch (type) {
      case 'phone': {
        return <InputPhone {...rest} />;
      }
      case 'phone-confirm': {
        return <InputPhoneConfirm {...rest} />;
      }
      case 'password': {
        return <InputPassword {...rest} />;
      }
      case 'name': {
        return <InputName {...rest} />;
      }
      case 'email': {
        return <InputEmail {...rest} />;
      }
      case 'city-picker': {
        return <InputCityPicker {...rest} />;
      }
      case 'date-picker': {
        return <InputDatePicker {...rest} />;
      }
      case 'car-picker': {
        return <InputCarPicker {...rest} />;
      }
      case 'checkbox': {
        return <Checkbox {...rest} />;
      }
      default: {
        return null;
      }
    }
  }
}

export default Input;
