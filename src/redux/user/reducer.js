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
  card: '9910000010286',
  birthday: '',
  gender: '',
  externalLink: 'https://avtoset.su',
  callCenterPhone: '+79996086897',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};
