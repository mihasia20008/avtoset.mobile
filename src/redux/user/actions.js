import { AsyncStorage } from 'react-native';
import * as T from './actionTypes';

import { User } from '../../services/api';

export function authUser(authObject) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.login(authObject);
      if (!isSuccess) {
        dispatch({ type: T.USER_LOGIN_ERROR, message: res.message });
        return;
      }
      await AsyncStorage.setItem('authToken', res.authToken);
      dispatch({ type: T.USER_LOGIN_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_LOGIN_ERROR, message: 'Ошибка в процессе авторизации' });
    }
  };
}

export function restorePassword(restoreObject) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.restorePassword(restoreObject);
      if (!isSuccess) {
        dispatch({ type: T.USER_RESTORE_PASSWORD_ERROR, message: res.message });
        return;
      }
      dispatch({
        type: T.USER_RESTORE_PASSWORD_SUCCESS,
        data: {
          message: 'Новый пароль был отправлен в SMS на указанный номер',
          phone: restoreObject.phone,
        },
      });
    } catch (err) {
      dispatch({
        type: T.USER_RESTORE_PASSWORD_ERROR,
        message: 'Ошибка в процессе восстановления пароля',
      });
    }
  };
}

export function resetRestoreData() {
  return dispatch => dispatch({ type: T.USER_RESTORE_PASSWORD_RESET });
}

export function registerUser(userData) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.register(userData);
      if (!isSuccess) {
        dispatch({ type: T.USER_REGISTER_ERROR, message: res.message });
        return;
      }
      await AsyncStorage.setItem('authToken', res.authToken);
      dispatch({ type: T.USER_REGISTER_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_REGISTER_ERROR, message: 'Ошибка в процессе авторизации' });
    }
  };
}
