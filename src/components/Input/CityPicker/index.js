import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import ValidateIcon from '../../ValidateIcon';
import ListItem from './blocks/ListItem';

import globalStyles from '../styles';

import { fetchCities, clearCitiesList } from '../../../redux/citypicker/actions';

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  cityList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#eaebec',
    borderTopWidth: 0,
    backgroundColor: '#f7f7f7',
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
    isFetching: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = { editable: true };

  state = {
    displayed: this.props.displayed,
    open: false,
    // eslint-disable-next-line react/no-unused-state
    needFetch: false,
    // eslint-disable-next-line react/no-unused-state
    needClearField: false,
    // eslint-disable-next-line react/no-unused-state
    prevFetchStatus: this.props.isFetching,
  };

  static getDerivedStateFromProps(props, state) {
    const { displayed: propsDisplayed, forceClose, isFetching, dispatch } = props;
    const { needClearField, displayed: stateDisplayed, open, needFetch, prevFetchStatus } = state;
    if (needClearField) {
      return {
        displayed: '',
        needClearField: false,
      };
    }
    if (propsDisplayed.search(stateDisplayed) !== -1) {
      return {
        displayed: propsDisplayed,
      };
    }
    if (forceClose && open) {
      return {
        open: false,
      };
    }
    if (needFetch && prevFetchStatus && !isFetching) {
      dispatch(fetchCities(stateDisplayed));
      return {
        needFetch: false,
        prevFetchStatus: isFetching,
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
    const { isFetching, name, status, onEvent, dispatch } = this.props;

    if (status) {
      onEvent(name, {
        status: '',
        errorText: '',
        value: -1,
        displayed: '',
      });
    }
    if (isFetching) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ displayed: value, needFetch: true });
      return;
    }
    this.setState({ displayed: value });
    if (value.length > 2) {
      dispatch(fetchCities(value));
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
    this.setState({ open: false });
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

  renderCityList() {
    const { open, displayed } = this.state;

    if (open && displayed.length > 2) {
      return <View style={styles.cityList}>{this.renderCityItems()}</View>;
    }

    return null;
  }

  render() {
    const { label, required, editable, status, errorText } = this.props;
    const { displayed } = this.state;

    return (
      <View style={[globalStyles.container, styles.container]}>
        <View style={globalStyles.labelWrap}>
          <Text style={globalStyles.labelText}>{label}</Text>
          {required ? <Text style={globalStyles.star}>*</Text> : null}
        </View>
        <View>
          <TextInput
            style={globalStyles.input}
            onFocus={this.handleFocus}
            onChangeText={this.handleChangeText}
            value={displayed}
            editable={editable}
            selectTextOnFocus={editable}
            autoCorrect={false}
          />
          {this.renderCityList()}
        </View>
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

const mapStateToProps = ({ CityPicker }) => {
  return {
    isFetching: CityPicker.fetching,
    list: CityPicker.list,
  };
};

export default connect(mapStateToProps)(InputCityPicker);
