import * as T from './actionTypes';

import { getCityList } from '../../services/api';

export function fetchCities(searchString) {
  return async dispatch => {
    try {
      dispatch({ type: T.GET_CITY_LIST_FETCH });
      const { isSuccess, ...rest } = await getCityList(searchString);
      if (!isSuccess) {
        dispatch({ type: T.GET_CITY_LIST_ERROR, message: rest.message });
        return;
      }
      dispatch({ type: T.GET_CITY_LIST_SUCCESS, list: rest.list });
    } catch (err) {
      dispatch({ type: T.GET_CITY_LIST_ERROR, message: 'Ошибка получения списка городов' });
    }
  };
}

export function clearCitiesList() {
  return dispatch => dispatch({ type: T.CLEAR_CITY_LIST });
}
