import axios from 'axios';

import { SERVER } from '../../constants';

export default async authData => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/login.php`,
      data: authData,
    });
    if (typeof data === 'string') {
      return {
        isSuccess: false,
        needLog: true,
        message: 'Ошибка выполнения процесса авторизации',
        forDevelopers: data,
      };
    }
    const { status, ...rest } = data;
    return {
      isSuccess: status === 'success',
      ...rest,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса авторизации',
      forDevelopers: err.message,
    };
  }
};
