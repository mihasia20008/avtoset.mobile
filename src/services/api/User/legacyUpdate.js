import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async userId => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}${SERVER.API_PATH}/auth/legacy/${userId}?version=${APP_VERSION}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    const {
      meta: { access_token: authToken },
      data: { region, ...rest },
    } = response;
    return {
      isSuccess: true,
      authToken,
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
      message: 'Ошибка выполнения процесса обновления данных о пользователя',
      forDevelopers: err.message,
    };
  }
};
