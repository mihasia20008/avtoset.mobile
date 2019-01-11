import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants';

export default async userData => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/users?version=${APP_VERSION}`,
      data: userData,
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
      message: 'Ошибка выполнения процесса авторизации',
      forDevelopers: err.message,
    };
  }
};
