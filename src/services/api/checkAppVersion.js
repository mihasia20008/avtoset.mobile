import axios from 'axios';

import { SERVER, APP_VERSION } from '../constants';

export default async () => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}${SERVER.API_PATH}/auth/check-version?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: true,
    };
  } catch (err) {
    if (err.response.status === 405) {
      return {
        isSuccess: false,
        needRedirectToUpdate: true,
        data: err.response.data.errors.version,
      };
    }
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка получения информации о версии пользователя',
      forDevelopers: err.message,
    };
  }
};
