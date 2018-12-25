// import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  errorSign: '',
  errorAuth: '',
  isAuth: false,
  phone: '',
  lastName: '',
  firstName: '',
  email: '',
  birthday: '',
  gender: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};
