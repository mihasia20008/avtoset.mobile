import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async phone => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${
        SERVER.API_PATH
      }/phone/${phone}/confirm/sms/send?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    return {
      isSuccess: response.data.result === 'success',
    };
  } catch (err) {
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка отправки кода проверки номера телефона',
      forDevelopers: err.message,
    };
  }
};
