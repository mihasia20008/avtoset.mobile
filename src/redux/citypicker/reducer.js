import * as T from './actionTypes';

const initialState = {
  fetching: false,
  list: [],
  errorText: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.GET_CITY_LIST_FETCH: {
      return {
        ...state,
        fetching: true,
      };
    }
    case T.GET_CITY_LIST_SUCCESS: {
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    }
    case T.GET_CITY_LIST_ERROR: {
      return {
        ...state,
        fetching: false,
        errorText: action.message,
      };
    }
    case T.CLEAR_CITY_LIST: {
      return {
        ...state,
        list: [],
      };
    }
    default: {
      return { ...state };
    }
  }
};
