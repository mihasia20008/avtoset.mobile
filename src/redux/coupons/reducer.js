import * as T from './actionTypes';

const initialState = {
  isFetching: false,
  list: [],
  active: -1,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.GET_COUPONS_FETCH: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case T.GET_COUPONS_ERROR: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case T.GET_COUPONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.data.items,
      };
    }
    case T.SELECT_COUPON: {
      return {
        ...state,
        active: action.data,
      };
    }
    case T.CLOSE_COUPON: {
      return {
        ...state,
        active: -1,
      };
    }
    default: {
      return { ...state };
    }
  }
};
