import axios from 'axios';

import { SERVER, APP_VERSION } from '../constants';

export default async logParams => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: `${SERVER.HOST}${SERVER.API_PATH}/logs?version=${APP_VERSION}`,
      data: {
        data: logParams,
      },
    });
    if (typeof response === 'string' && response.toLowerCase().search('network error') === -1) {
      throw new Error(response);
    }
    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      forDevelopers: err.message,
    };
  }
};
