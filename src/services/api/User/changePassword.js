import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants/index';

export default async (id, userData) => {
  try {
    const { status, data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/user/${id}/change-password?version=${APP_VERSION}`,
      data: {
        data: userData,
      },
    });
    if (status === 201) {
      return {
        isSuccess: true,
      };
    }
    throw new Error(response);
  } catch (err) {
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса изменения пароля',
      forDevelopers: err.message,
    };
  }
};
