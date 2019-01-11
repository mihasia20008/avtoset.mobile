import * as T from './actionTypes';

import { getCarList } from '../../services/api';

export function fetchCarList(params) {
  return async dispatch => {
    try {
      dispatch({ type: T.CAR_GET_FETCH });
      const { isSuccess, ...rest } = await getCarList(params);
      if (!isSuccess) {
        dispatch({ type: T.CAR_GET_ERROR, message: rest.message });
        return;
      }
      if (rest.current_step === 'final') {
        dispatch({ type: T.CAR_GET_FINAL, data: rest });
        return;
      }
      dispatch({ type: T.CAR_GET_SUCCESS, data: rest });
    } catch (err) {
      dispatch({ type: T.CAR_GET_ERROR, message: 'Ошибка получения списка автомобилей' });
    }
  };
}

export function deleteUnusedFields(index) {
  return dispatch => dispatch({ type: T.CAR_RESET_FIELDS, index });
}

export function resetAllFields() {
  return dispatch => dispatch({ type: T.CAR_RESET });
}
