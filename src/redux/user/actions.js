import * as T from './actionTypes';

import { User } from '../../services/api';

export function authUser(authObject) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_LOGIN_FETCH });
      const { isSuccess, ...res } = await User.login(authObject);
      if (!isSuccess) {
        dispatch({ type: T.USER_LOGIN_ERROR, message: res.message });
        return;
      }
      dispatch({ type: T.USER_LOGIN_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_LOGIN_ERROR, message: 'Ошибка в процессе авторизации' });
    }
  };
}
