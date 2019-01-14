import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import SelectPicker from './blocks/SelectPicker';

import { fetchCarList, resetAllFields } from '../../../redux/auto/actions';

class InputCarPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    complete: PropTypes.bool.isRequired,
    relations: PropTypes.object.isRequired,
    currentStep: PropTypes.string.isRequired,
    nextStep: PropTypes.string.isRequired,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  };

  static isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    if (keys1.length !== Object.keys(obj2).length) {
      return false;
    }
    let isEqual = true;
    const keysLength = keys1.length - 1;
    for (let i = keysLength; i >= 0; i--) {
      const key = keys1[i];
      if (obj1[key] !== obj2[key]) {
        isEqual = false;
        break;
      }
    }
    return isEqual;
  }

  state = {
    result: {},
    // eslint-disable-next-line react/no-unused-state
    prevStep: '',
    // eslint-disable-next-line react/no-unused-state
    currentStep: '',
    updatedStep: '',
    fields: {},
  };

  static getDerivedStateFromProps(props, state) {
    const { fields: propsFields, errorText } = props;
    const { fields: stateFields, prevStep, currentStep, result, updatedStep } = state;

    const updatedState = {};

    if (updatedStep && updatedStep !== prevStep && updatedStep !== currentStep) {
      let needResultKey = true;
      updatedState.result = Object.keys(result).reduce((acc, item) => {
        if (needResultKey) {
          if (updatedStep === item.split('_')[0]) {
            needResultKey = false;
          }
          return Object.assign(acc, {
            [`${item}`]: result[item],
          });
        }
        return acc;
      }, {});
    }

    const fieldsLength = propsFields.length - 1;
    if (propsFields.length !== Object.keys(stateFields).length || errorText) {
      updatedState.fields = propsFields.reduce((acc, field, index) => {
        if (errorText && fieldsLength === index) {
          return Object.assign(acc, {
            [`${field.id}`]: {
              errorText,
              status: 'error',
            },
          });
        }
        if (typeof stateFields[field.id] !== 'undefined') {
          return Object.assign(acc, {
            [`${field.id}`]: stateFields[field.id],
          });
        }
        return Object.assign(acc, {
          [`${field.id}`]: {
            errorText: '',
            status: '',
          },
        });
      }, {});
    }
    return Object.assign({}, state, updatedState);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      fetchCarList({
        step: 'first',
        result: [],
      }),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { complete: prevCompleteStatus } = prevProps;
    const { complete: nowCompleteStatus, fields, relations, dispatch } = this.props;
    const { result: prevResult } = prevState;
    const { result: nowResult, updatedStep } = this.state;

    if (!InputCarPicker.isEqual(prevResult, nowResult)) {
      const index = Object.keys(relations).findIndex(item => item === updatedStep) + 1;
      dispatch(
        fetchCarList(
          {
            step: relations[updatedStep],
            result: nowResult,
          },
          index < fields.length,
          index,
        ),
      );
    }

    if (!prevCompleteStatus && nowCompleteStatus) {
      const { name, onEvent } = this.props;
      onEvent(name, {
        errorText: '',
        complete: true,
        value: nowResult,
      });
    }

    if (prevCompleteStatus && !nowCompleteStatus) {
      const { name, onEvent } = this.props;
      onEvent(name, {
        complete: false,
        value: {},
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetAllFields());
  }

  handleSelectItem = (key, { value, ...rest }) => {
    const { currentStep, nextStep, name, errorText, onEvent } = this.props;
    const { result } = this.state;

    if (result[key] !== +value) {
      this.setState(prevState => ({
        prevStep: currentStep,
        currentStep: nextStep,
        updatedStep: key.split('_')[0],
        result: value
          ? Object.assign({}, prevState.result, { [`${key}`]: +value })
          : prevState.result,
        fields: Object.assign({}, prevState.fields, {
          [`${key}`]: Object.assign({}, prevState.fields[key], rest),
        }),
      }));
      if (errorText) {
        onEvent(name, {
          errorText: '',
        });
      }
    }
  };

  render() {
    const { fields, editable, onFocus } = this.props;
    const fieldsLength = fields.length;

    const { result, fields: stateFields } = this.state;

    if (fieldsLength) {
      return (
        <View>
          {fields.map(({ id, ...item }) => (
            <SelectPicker
              key={id}
              name={id}
              label={item.label}
              placeholder={item.placeholder}
              editable={editable}
              value={result[id]}
              required
              values={item.items}
              onEvent={this.handleSelectItem}
              onFocus={onFocus}
              errorText={stateFields[id].errorText}
              status={stateFields[id].status}
            />
          ))}
        </View>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ CarPicker }) => {
  return {
    complete: CarPicker.complete,
    currentStep: CarPicker.currentStep,
    nextStep: CarPicker.nextStep,
    fields: CarPicker.fields,
    relations: CarPicker.relations,
  };
};

export default connect(mapStateToProps)(InputCarPicker);
