import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  complete: false,
  currentStep: '',
  nextStep: '',
  fields: [],
  relations: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.CAR_GET_FETCH: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case T.CAR_GET_ERROR: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case T.CAR_GET_SUCCESS: {
      const { fields, current_step: currentStep, next_step: nextStep } = action.data;
      return {
        ...state,
        isFetching: false,
        complete: false,
        currentStep,
        nextStep,
        fields: state.fields.concat(fields),
        relations: Object.assign({}, state.relations, { [`${currentStep}`]: nextStep }),
      };
    }
    case T.CAR_GET_FINAL: {
      return {
        ...state,
        isFetching: false,
        complete: true,
      };
    }
    case T.CAR_RESET_FIELDS: {
      return {
        ...state,
        fields: state.fields.slice(0, action.index),
      };
    }
    case T.CAR_RESET: {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...state };
    }
  }
};
