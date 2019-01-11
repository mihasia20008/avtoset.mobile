import axios from 'axios';

import { SERVER, APP_VERSION } from '../../constants';

export default async userId => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}/api/v2/user/${userId}/coupons?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: true,
      ...response.data,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка получения списка купонов',
      forDevelopers: err.message,
    };
  }
};
