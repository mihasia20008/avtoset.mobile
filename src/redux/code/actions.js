import * as T from './actionTypes';

import { PhoneConfirm } from '../../services/api';

export function sendConfirmCode(phone) {
  return async dispatch => {
    try {
      dispatch({ type: T.SEND_CONFIRM_CODE_FETCH });
      const { isSuccess, ...rest } = await PhoneConfirm.sendConfirmCode(`7${phone}`);
      if (!isSuccess) {
        dispatch({ type: T.SEND_CONFIRM_CODE_ERROR, message: rest.message });
        return;
      }
      dispatch({ type: T.SEND_CONFIRM_CODE_SUCCESS });
    } catch (err) {
      dispatch({ type: T.SEND_CONFIRM_CODE_ERROR, message: err.message });
    }
  };
}

export function checkConfirmCode(phone, code) {
  return async dispatch => {
    try {
      dispatch({ type: T.CHECK_CONFIRM_CODE_FETCH });
      const { isSuccess, ...rest } = await PhoneConfirm.checkConfirmCode(`7${phone}`, code);
      if (!isSuccess) {
        dispatch({ type: T.CHECK_CONFIRM_CODE_ERROR, message: rest.message });
        return;
      }
      if (rest.status === 'repeat') {
        dispatch({ type: T.CHECK_CONFIRM_CODE_REPEAT });
        return;
      }
      dispatch({ type: T.CHECK_CONFIRM_CODE_SUCCESS });
    } catch (err) {
      dispatch({ type: T.CHECK_CONFIRM_CODE_ERROR, message: err.message });
    }
  };
}

export function resetConfirmCode() {
  return dispatch => dispatch({ type: T.RESET_CONFIRM_CODE });
}

export function resetConfirmProgress() {
  return dispatch => dispatch({ type: T.RESET_PROGRESS });
}
