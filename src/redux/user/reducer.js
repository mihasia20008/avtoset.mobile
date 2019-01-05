import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  errorSign: '',
  errorAuth: '',
  isAuth: false,
  phone: '',
  lastName: '',
  firstName: '',
  email: '',
  card: '',
  birthday: '',
  gender: '',
  externalLink: '',
  callCenterPhone: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
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
        errorAuth: action.message,
      };
    }
    case T.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuth: true,
      };
    }
    default: {
      return { ...state };
    }
  }
};
