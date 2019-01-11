import axios from 'axios';

import { SERVER, APP_VERSION } from '../constants';

export default async autoParams => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/cars/select?version=${APP_VERSION}`,
      data: {
        data: autoParams,
      },
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    const { data = {} } = response;
    if (data.type !== 'form') {
      return {
        isSuccess: false,
        message: 'Ошибка получения списка автомобилей',
      };
    }
    return {
      isSuccess: true,
      ...data.data,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка получения списка автомобилей',
      forDevelopers: err.message,
    };
  }
};
