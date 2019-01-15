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
  legacy: {
    isFetching: false,
    status: '',
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
    case T.USER_LOGIN_RESET: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { auth: '' }),
        result: Object.assign({}, state.result, { isAuth: false }),
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
    case T.USER_REGISTER_RESET: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { sign: '' }),
        result: Object.assign({}, state.result, { isSign: false }),
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
    case T.USER_EDIT_RESET: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { edit: '' }),
        result: Object.assign({}, state.result, { isEdited: false }),
      };
    }
    case T.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userData: Object.assign({}, state.userData, action.data),
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
    case T.USER_CHANGE_PASSWORD_RESET: {
      return {
        ...state,
        errors: Object.assign({}, state.errors, { change: '' }),
        result: Object.assign({}, state.result, { isChange: false }),
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
    case T.USER_LEGACY_UPDATE_FETCH: {
      return {
        ...state,
        legacy: Object.assign({}, state.legacy, {
          isFetching: true,
        }),
      };
    }
    case T.USER_LEGACY_UPDATE_ERROR: {
      return {
        ...state,
        legacy: Object.assign({}, state.legacy, {
          isFetching: false,
          status: 'error',
        }),
      };
    }
    case T.USER_LEGACY_UPDATE_SUCCESS: {
      return {
        ...state,
        legacy: Object.assign({}, state.legacy, {
          isFetching: false,
          status: 'success',
        }),
        userData: Object.assign({}, state.userData, action.data),
      };
    }
    default: {
      return { ...state };
    }
  }
};
