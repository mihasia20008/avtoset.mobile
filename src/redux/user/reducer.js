import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  phone: '',
  lastName: '',
  firstName: '',
  email: '',
  card: '',
  birthday: '',
  gender: '',
  externalLink: '',
  callCenterPhone: '',
  result: {
    isAuth: false,
    isRestore: false,
    isSign: false,
  },
  errors: {
    sign: '',
    auth: '',
    restore: '',
  },
  restoreData: {
    phone: '',
    message: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.USER_RESTORE_PASSWORD_FETCH:
    case T.USER_LOGIN_FETCH: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case T.USER_LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { auth: action.message }),
      };
    }
    case T.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        result: Object.assign({}, state.result, { isAuth: true }),
      };
    }
    case T.USER_RESTORE_PASSWORD_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { restore: action.message }),
      };
    }
    case T.USER_RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { restore: '' }),
        result: Object.assign({}, state.result, { isRestore: true }),
        restoreData: action.data,
      };
    }
    case T.USER_RESTORE_PASSWORD_RESET: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { restore: '' }),
        result: Object.assign({}, state.result, { isRestore: false }),
        restoreData: Object.assign({}, initialState.restoreData),
      };
    }
    default: {
      return { ...state };
    }
  }
};
