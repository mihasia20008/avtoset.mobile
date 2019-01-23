import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants/index';

export default async (userData, metaData) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/users?version=${APP_VERSION}`,
      data: {
        data: userData,
        meta: metaData,
      },
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
    if (err.response.status === 422) {
      return {
        isSuccess: false,
        errors: err.response.data.errors,
      };
    }
    // TODO обработка ошибок сервера
    return {
      isSuccess: false,
      needLog: true,
      errors: { message: ['Ошибка выполнения процесса регистрации'] },
      forDevelopers: err.message,
    };
  }
};
