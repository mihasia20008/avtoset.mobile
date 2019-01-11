import axios from 'axios';

import { SERVER, APP_VERSION } from '../../constants';

export default async phone => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/auth/restore/sms/${phone}?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса восстановления пароля',
      forDevelopers: err.message,
    };
  }
};
