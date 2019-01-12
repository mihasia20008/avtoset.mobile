import * as T from './actionTypes';

import { getCarList } from '../../services/api';

export function deleteUnusedFields(index) {
  return dispatch => dispatch({ type: T.CAR_RESET_FIELDS, index });
}

export function fetchCarList(params, needDeleteFields, index) {
  return async dispatch => {
    try {
      dispatch({ type: T.CAR_GET_FETCH });
      if (needDeleteFields) {
        dispatch(deleteUnusedFields(index));
      }
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

export function resetAllFields() {
  return dispatch => dispatch({ type: T.CAR_RESET });
}
