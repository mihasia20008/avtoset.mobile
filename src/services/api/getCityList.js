import axios from 'axios';

import { SERVER } from '../constants';

export default async searchString => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: `${SERVER.HOST}${SERVER.API_PATH}/locations?q=${searchString}`,
    });
    if (typeof response === 'string') {
      throw new Error(response);
    }
    // console.log(response);
    const {
      data: { items: list },
    } = response;
    return {
      isSuccess: true,
      list,
    };
  } catch (err) {
    return {
      isSuccess: false,
      needLog: true,
      message: 'Ошибка получения списка городов',
      forDevelopers: err.message,
    };
  }
};
