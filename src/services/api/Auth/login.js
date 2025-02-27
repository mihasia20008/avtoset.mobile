import axios from 'axios';

import { APP_VERSION, SERVER } from '../../constants/index';

export default async authData => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/auth/login?version=${APP_VERSION}`,
      data: authData,
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
    if (err.response.status === 404) {
      const { errors } = err.response.data;
      const message = Object.values(errors).reduce((acc, error) => {
        if (acc) {
          return `${acc} \n${error}`;
        }
        return error;
      }, '');
      return {
        isSuccess: false,
        message,
      };
    }
    if (err.response.status === 400) {
      return {
        isSuccess: false,
        message: 'Неверная пара логин/пароль',
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
      message: 'Ошибка выполнения процесса авторизации',
      forDevelopers: err.message,
    };
  }
};
