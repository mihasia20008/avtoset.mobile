import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import SelectPicker from './blocks/SelectPicker';

import { fetchCarList, resetAllFields } from '../../../redux/auto/actions';

class InputCarPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    complete: PropTypes.bool.isRequired,
    relations: PropTypes.object.isRequired,
    currentStep: PropTypes.string.isRequired,
    onEvent: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    result: {},
    // eslint-disable-next-line react/no-unused-state
    prevStep: '',
    updatedStep: '',
    fields: {},
  };

  static getDerivedStateFromProps(props, state) {
    // const { isFetching, fields, relations, dispatch } = props;
    const { fields } = props;
    // const { fields: stateFields, prevStep, result, updatedStep } = state;
    const { fields: stateFields } = state;

    const updatedState = {};

    // const index = Object.keys(relations).findIndex(item => item === updatedStep) + 1;
    // if (!isFetching && updatedStep && updatedStep !== prevStep && index !== fields.length) {
    //   dispatch(deleteUnusedFields(index));
    //   let needResultKey = true;
    //   updatedState.result = Object.keys(result).reduce((acc, item) => {
    //     console.log(needResultKey, item, updatedStep);
    //     if (needResultKey) {
    //       needResultKey = updatedStep !== item;
    //       return Object.assign(acc, {
    //         [`${item}`]: result[item]
    //       })
    //     }
    //   }, {});
    // }

    if (fields.length !== Object.keys(stateFields).length) {
      updatedState.fields = fields.reduce((acc, field) => {
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
    const { complete: nowCompleteStatus, relations, dispatch } = this.props;
    const { result: prevResult } = prevState;
    const { result: nowResult, updatedStep } = this.state;

    if (Object.keys(prevResult).length !== Object.keys(nowResult).length) {
      dispatch(
        fetchCarList({
          step: relations[updatedStep],
          result: nowResult,
        }),
      );
    }

    if (!prevCompleteStatus && nowCompleteStatus) {
      const { name, onEvent } = this.props;
      onEvent(name, {
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
    const { currentStep } = this.props;
    this.setState(prevState => ({
      prevStep: currentStep,
      updatedStep: key.split('_')[0],
      result: value
        ? Object.assign({}, prevState.result, { [`${key}`]: +value })
        : prevState.result,
      fields: Object.assign({}, prevState.fields, {
        [`${key}`]: Object.assign({}, prevState.fields[key], rest),
      }),
    }));
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
    isFetching: CarPicker.isFetching,
    complete: CarPicker.complete,
    currentStep: CarPicker.currentStep,
    fields: CarPicker.fields,
    relations: CarPicker.relations,
  };
};

export default connect(mapStateToProps)(InputCarPicker);
