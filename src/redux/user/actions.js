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
      const { id, authToken, ...rest } = res;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(rest));
      dispatch({ type: T.USER_LOGIN_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_LOGIN_ERROR, message: 'Ошибка в процессе авторизации' });
    }
  };
}

export function resetAuthData() {
  return dispatch => dispatch({ type: T.USER_LOGIN_RESET });
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
      const { id, authToken, ...rest } = res;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(rest));
      dispatch({ type: T.USER_REGISTER_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_REGISTER_ERROR, message: 'Ошибка в процессе авторизации' });
    }
  };
}

export function resetRegisterData() {
  return dispatch => dispatch({ type: T.USER_REGISTER_RESET });
}

export function getDataFromAsyncStorage(userData) {
  return dispatch => dispatch({ type: T.USER_GET_LOCAL_DATA, data: userData });
}

export function editUser(userId, userData) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.edit(userId, userData);
      if (!isSuccess) {
        dispatch({ type: T.USER_EDIT_ERROR, message: res.message });
        return;
      }
      const { id, ...rest } = res;
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(rest));
      dispatch({ type: T.USER_EDIT_SUCCESS, data: res });
    } catch (err) {
      dispatch({
        type: T.USER_EDIT_ERROR,
        message: 'Ошибка в процессе обновления данных пользователя',
      });
    }
  };
}

export function resetEditData() {
  return dispatch => dispatch({ type: T.USER_EDIT_RESET });
}

export function restorePassword(phone) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.restorePassword(`7${phone}`);
      if (!isSuccess) {
        dispatch({ type: T.USER_RESTORE_PASSWORD_ERROR, message: res.message });
        return;
      }
      dispatch({
        type: T.USER_RESTORE_PASSWORD_SUCCESS,
        data: {
          message: 'Новый пароль был отправлен в SMS на указанный номер',
          phone,
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

export function resetRestorePasswordData() {
  return dispatch => dispatch({ type: T.USER_RESTORE_PASSWORD_RESET });
}

export function changePassword(id, userData) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_ACTION_FETCH });
      const { isSuccess, ...res } = await User.changePassword(id, userData);
      if (!isSuccess) {
        dispatch({ type: T.USER_CHANGE_PASSWORD_ERROR, message: res.message });
        return;
      }
      dispatch({ type: T.USER_CHANGE_PASSWORD_SUCCESS });
    } catch (err) {
      dispatch({
        type: T.USER_CHANGE_PASSWORD_ERROR,
        message: 'Ошибка в процессе изменения пароля',
      });
    }
  };
}

export function resetChangePasswordData() {
  return dispatch => dispatch({ type: T.USER_CHANGE_PASSWORD_RESET });
}

export function updateData(userId) {
  return async dispatch => {
    try {
      const { isSuccess, ...res } = await User.update(userId);
      if (!isSuccess) {
        return;
      }
      const { id, ...rest } = res;
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(rest));
      dispatch({ type: T.USER_UPDATE_SUCCESS, data: res });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
}

export function legacyUpdateData(userId) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_LEGACY_UPDATE_FETCH });
      const { isSuccess, ...res } = await User.legacyUpdate(userId);
      if (!isSuccess) {
        dispatch({ type: T.USER_LEGACY_UPDATE_ERROR, message: JSON.stringify(res) });
        return;
      }
      const { id, authToken, ...rest } = res;
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('id', id.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(rest));
      dispatch({ type: T.USER_LEGACY_UPDATE_SUCCESS, data: res });
    } catch (err) {
      dispatch({ type: T.USER_LEGACY_UPDATE_ERROR, message: err.message });
    }
  };
}

export function logoutFromAccount() {
  return dispatch => dispatch({ type: T.USER_LOGOUT });
}
