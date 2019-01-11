import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async (id, userData) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/user/${id}/change-password?version=${APP_VERSION}`,
      data: {
        data: userData,
      },
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: true,
    };
  } catch (err) {
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса обновления пароля',
      forDevelopers: err.message,
    };
  }
};
