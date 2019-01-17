import * as T from './actionTypes';

const initialState = {
  fetch: false,
  needUpdate: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.START_FETCH: {
      return {
        ...state,
        fetch: true,
      };
    }
    case T.STOP_FETCH: {
      return {
        ...state,
        fetch: false,
      };
    }
    case T.NEED_UPDATE: {
      return {
        ...state,
        fetch: false,
        needUpdate: true,
      };
    }
    case T.RESET: {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
};
