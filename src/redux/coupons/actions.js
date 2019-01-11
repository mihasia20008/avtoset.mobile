import * as T from './actionTypes';

import { User } from '../../services/api';

export function fetchCouponsList(id) {
  return async dispatch => {
    try {
      dispatch({ type: T.GET_COUPONS_FETCH });
      const { isSuccess, ...rest } = await User.fetchCoupons(id);
      if (!isSuccess) {
        dispatch({ type: T.GET_COUPONS_ERROR, message: rest.message });
        return;
      }
      dispatch({ type: T.GET_COUPONS_SUCCESS, data: rest });
    } catch (err) {
      dispatch({ type: T.GET_COUPONS_ERROR, message: err.message });
    }
  };
}

export function selectCoupon(index) {
  return dispatch => dispatch({ type: T.SELECT_COUPON, data: index });
}

export function closeSelectCoupon() {
  return dispatch => dispatch({ type: T.CLOSE_COUPON });
}
