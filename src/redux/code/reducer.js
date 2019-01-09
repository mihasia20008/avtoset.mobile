import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  codeWasSend: false,
  status: 0,
  errors: {
    confirm: '',
    send: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.SEND_CONFIRM_CODE_FETCH: {
      return {
        ...state,
        isFetching: true,
        errors: initialState.errors,
      };
    }
    case T.SEND_CONFIRM_CODE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        codeWasSend: true,
      };
    }
    case T.SEND_CONFIRM_CODE_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { send: action.message }),
      };
    }
    case T.CHECK_CONFIRM_CODE_FETCH: {
      return {
        ...state,
        isFetching: true,
        errors: Object.assign({}, state.errors, { confirm: '' }),
      };
    }
    case T.CHECK_CONFIRM_CODE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        status: 2,
      };
    }
    case T.CHECK_CONFIRM_CODE_REPEAT: {
      return {
        ...state,
        isFetching: false,
        status: 1,
      };
    }
    case T.CHECK_CONFIRM_CODE_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { confirm: action.message }),
      };
    }
    case T.RESET_CONFIRM_CODE: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { confirm: '' }),
      };
    }
    case T.RESET_PROGRESS: {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...state };
    }
  }
};
