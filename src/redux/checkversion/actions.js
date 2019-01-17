import { AsyncStorage } from 'react-native';
import * as T from './actionTypes';

import { checkAppVersion } from '../../services/api';

export function redirectToUpdate(data) {
  return async dispatch => {
    await AsyncStorage.setItem('proposUpdateTexts', JSON.stringify(data));
    await AsyncStorage.setItem('needUpdate', 'true');
    dispatch({ type: T.NEED_UPDATE });
  };
}

export function checkVersion() {
  return async dispatch => {
    dispatch({ type: T.START_FETCH });
    const { isSuccess, ...res } = await checkAppVersion();
    if (!isSuccess && res.needRedirectToUpdate) {
      dispatch(redirectToUpdate(res.data));
      return;
    }
    await AsyncStorage.setItem('needUpdate', 'false');
    dispatch({ type: T.STOP_FETCH });
  };
}

export function resetStatus() {
  return dispatch => dispatch({ type: T.RESET });
}
