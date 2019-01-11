import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import globalFormStyles from '../styles';
import { editUser } from '../../../redux/user/actions';

class EditForm extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    isEdited: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    onSuccessEdit: PropTypes.func.isRequired,
    onGoToPersonal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    name: {
      type: 'name',
      label: 'Фамилия Имя Отчество',
      value: this.props.profile.name.value,
      required: true,
      status: '',
      errorText: '',
    },
    email: {
      type: 'email',
      label: 'E-mail',
      value: this.props.profile.email.value,
      required: true,
      status: '',
      errorText: '',
    },
    birthday: {
      type: 'date-picker',
      label: 'Дата рождения',
      value: this.props.profile.birthday.value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1'),
      required: true,
      status: '',
      errorText: '',
    },
    location: {
      type: 'city-picker',
      label: 'Город',
      displayed: this.props.profile.location.value || '',
      value: this.props.profile.location.id || -1,
      required: true,
      forceClose: false,
      focused: false,
      status: '',
      errorText: '',
    },
    gender: {
      type: 'checkbox',
      label: 'Пол',
      value: this.props.profile.gender.value === 'Мужской' ? 'M' : 'F',
      values: [{ text: 'Мужской', value: 'M' }, { text: 'Женский', value: 'F' }],
      required: true,
      status: '',
      errorText: '',
    },
  };

  componentDidUpdate(prevProps) {
    const { isEdited: nowEditedStatus, onSuccessEdit } = this.props;
    const { isEdited: prevEditedStatus } = prevProps;

    if (nowEditedStatus && !prevEditedStatus) {
      onSuccessEdit();
    }
  }

  handleGoToPersonal = () => {
    const { onGoToPersonal } = this.props;
    onGoToPersonal();
  };

  handleInputBlur = (key, value) => {
    this.setState(prevState => ({
      [`${key}`]: Object.assign({}, prevState[key], value),
    }));
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

  validateFields = () => {
    let canSubmit = true;
    const submitObject = {
      user: {},
    };

    Object.keys(this.state).forEach(key => {
      const input = this.state[key];
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
      if (key === 'birthday') {
        submitObject.user[key] = input.value.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1');
        return;
      }
      if (key === 'location') {
        submitObject.user.location_id = input.value;
        return;
      }
      submitObject.user[key] = input.value;
    });

    return canSubmit ? submitObject : canSubmit;
  };

  handleSubmitForm = () => {
    const resultValidation = this.validateFields();

    if (resultValidation) {
      const { id, dispatch } = this.props;
      dispatch(editUser(id, resultValidation));
    }
  };

  render() {
    const { errorText } = this.props;

    return (
      <View onStartShouldSetResponder={this.handleTouchOutsideCityPicker}>
        {Object.keys(this.state).map(key => (
          <Input
            key={key}
            name={key}
            onEvent={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            {...this.state[key]}
          />
        ))}
        {errorText ? <Text style={globalFormStyles.errorText}>{errorText}</Text> : null}
        <View style={globalFormStyles.buttons}>
          <Button text="Сохранить" onPress={this.handleSubmitForm} />
          <Button isShadow text="Отменить" onPress={this.handleGoToPersonal} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    id: User.userData.id,
    isEdited: User.result.isEdited,
    errorText: User.errors.edit,
    profile: User.userData.profile,
  };
};

export default connect(mapStateToProps)(EditForm);
