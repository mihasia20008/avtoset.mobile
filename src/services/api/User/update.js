import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants/index';

export default async userId => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}${SERVER.API_PATH}/user/${userId}?version=${APP_VERSION}`,
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
    if (err.response.status === 404) {
      return {
        isSuccess: false,
        needLogout: true,
      };
    }
    if (err.response.status === 405) {
      return {
        isSuccess: false,
        needRedirectToUpdate: true,
        data: err.response.data.errors.version,
      };
    }
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка выполнения процесса обновления данных о пользователя',
      forDevelopers: err.message,
    };
  }
};
