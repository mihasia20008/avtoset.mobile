import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import ValidateIcon from '../../ValidateIcon';
import ListItem from './blocks/ListItem';

import globalStyles from '../styles';

import { fetchCities, clearCitiesList } from '../../../redux/citypicker/actions';

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  cityList: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#eaebec',
    borderTopWidth: 0,
    backgroundColor: '#f7f7f7',
  },
  ios: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

class InputCityPicker extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayed: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    forceClose: PropTypes.bool,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = { editable: true };

  state = {
    displayed: this.props.displayed,
    open: false,
    // eslint-disable-next-line react/no-unused-state
    needClearField: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { forceClose } = props;
    const { needClearField, open } = state;
    if (needClearField) {
      return {
        displayed: '',
        needClearField: false,
      };
    }
    if (forceClose && open) {
      return {
        open: false,
      };
    }
    return {};
  }

  componentDidUpdate(prevProps) {
    const { forceClose: prevForceClose } = prevProps;
    const { forceClose: nowForceClose, name, onEvent, dispatch } = this.props;

    if (!prevForceClose && nowForceClose) {
      onEvent(name, {
        status: 'error',
        errorText: 'Поле обязательно для заполнения!',
        value: -1,
        displayed: '',
      });
      dispatch(clearCitiesList());
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearCitiesList());
  }

  handleFocus = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ open: true, needClearField: true });
    const { name, onEvent, onFocus } = this.props;
    onEvent(name, {
      status: '',
      errorText: '',
      value: -1,
      displayed: '',
    });
    onFocus(name);
  };

  handleChangeText = value => {
    const { name, status, onEvent, dispatch } = this.props;

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: -1,
        displayed: '',
      });
    }
    this.setState({ displayed: value });
    if (value.length > 2 && value.search(/\s/) === -1) {
      dispatch(fetchCities(value));
      this.setState({ open: true });
    }
  };

  handleSelectItem = (value, displayed) => {
    const { name, onEvent, dispatch } = this.props;
    onEvent(name, {
      status: 'success',
      errorText: '',
      displayed,
      value,
      focused: false,
    });
    this.setState({ open: false, displayed });
    dispatch(clearCitiesList());
  };

  renderCityItems = () => {
    const { list } = this.props;
    const listLength = list.length;

    if (listLength) {
      return list.map((item, index) => (
        <ListItem
          key={item.id}
          id={item.id}
          name={item.name}
          isLastItem={index + 1 === listLength}
          onSelect={this.handleSelectItem}
        />
      ));
    }
    return (
      <ListItem id={-1} name="Ничего не найдено..." isLastItem onSelect={this.handleSelectItem} />
    );
  };

  renderCityList(isIOS) {
    const { open, displayed } = this.state;

    if (open && displayed.length > 2) {
      return (
        <View style={[styles.cityList, isIOS ? styles.ios : '']}>{this.renderCityItems()}</View>
      );
    }

    return null;
  }

  render() {
    const { label, required, editable, status, errorText } = this.props;
    const { displayed } = this.state;
    const isIOS = Platform.OS !== 'android';

    return (
      <View style={[globalStyles.container, styles.container]}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <View>
          {isIOS && this.renderCityList()}
          <TextInput
            style={globalStyles.input}
            onFocus={this.handleFocus}
            onChangeText={this.handleChangeText}
            value={displayed}
            editable={editable}
            autoCorrect={false}
          />
        </View>
        {errorText ? (
          <View style={globalStyles.errorWrap}>
            <Text style={globalStyles.errorText}>{errorText}</Text>
          </View>
        ) : null}
        <ValidateIcon type={status} />
        {!isIOS && this.renderCityList()}
      </View>
    );
  }
}

const mapStateToProps = ({ CityPicker }) => {
  return {
    list: CityPicker.list,
  };
};

export default connect(mapStateToProps)(InputCityPicker);
