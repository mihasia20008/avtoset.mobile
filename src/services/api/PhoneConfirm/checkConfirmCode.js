import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async (phone, code) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}${
        SERVER.API_PATH
      }/phone/${phone}/confirm/sms/check-code/${code}?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: response.data.result === 'success',
      status: 'confirm',
    };
  } catch (err) {
    // TODO обработка ошибок сервера
    if (err.response.status === 400) {
      return {
        isSuccess: false,
        needLog: false,
        message: err.response.data.errors.message,
      };
    }
    if (err.response.status === 403) {
      return {
        isSuccess: true,
        status: 'repeat',
        message: err.response.data.errors.message,
      };
    }
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка отправки кода проверки номера телефона',
      forDevelopers: err.message,
    };
  }
};
