import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async (userId, userData) => {
  try {
    const { data: response } = await axios({
      method: 'PATCH',
      url: `${SERVER.HOST}${SERVER.API_PATH}/user/${userId}?version=${APP_VERSION}`,
      data: {
        data: userData,
      },
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    const {
      data: { region, ...rest },
    } = response;
    return {
      isSuccess: true,
      region: {
        domain: region.domain_url,
        logo: region.logo_url,
        callCenterPhone: region.mobile_phone,
      },
      ...rest,
    };
  } catch (err) {
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса обновления данных пользователя',
      forDevelopers: err.message,
    };
  }
};
