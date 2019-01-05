import axios from 'axios';

import { SERVER } from '../../constants';

export default async restoreData => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/forgotPassword.php`,
      data: restoreData,
    });
    if (typeof data === 'string') {
      return {
        isSuccess: false,
        needLog: true,
        message: 'Ошибка выполнения процесса восстановления пароля',
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
      message: 'Ошибка выполнения процесса восстановления пароля',
      forDevelopers: err.message,
    };
  }
};
