import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  userData: {
    authToken: '',
    card: '',
    cars: [],
    id: 0,
    profile: {},
    region: {
      domain: 'https://avtoset.su',
      logo: 'default_logo',
      callCenterPhone: '',
    },
  },
  result: {
    isAuth: false,
    isRestore: false,
    isSign: false,
    isEdited: false,
    isChange: false,
  },
  errors: {
    sign: '',
    auth: '',
    restore: '',
    edit: '',
    change: '',
  },
  restoreData: {
    phone: '',
    message: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.USER_ACTION_FETCH: {
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
        userData: Object.assign({}, state.userData, action.data),
        result: Object.assign({}, state.result, { isAuth: true }),
      };
    }
    case T.USER_REGISTER_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { sign: action.message }),
      };
    }
    case T.USER_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userData: Object.assign({}, state.userData, action.data),
        result: Object.assign({}, state.result, { isSign: true }),
      };
    }
    case T.USER_EDIT_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { edit: action.message }),
      };
    }
    case T.USER_EDIT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userData: Object.assign({}, state.userData, action.data),
        result: Object.assign({}, state.result, { isEdited: true }),
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
    case T.USER_CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        isFetching: false,
        errors: Object.assign({}, state.errors, { change: action.message }),
      };
    }
    case T.USER_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        result: Object.assign({}, state.result, { isChange: true }),
      };
    }
    case T.USER_GET_LOCAL_DATA: {
      return {
        ...state,
        userData: Object.assign({}, state.userData, action.data),
      };
    }
    case T.USER_LOGOUT: {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...state };
    }
  }
};
