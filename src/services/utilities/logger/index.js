import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { APP_VERSION } from '../../constants';

import { sendLog } from '../../api';
import { checkNetwork } from '..';

export default async function createLog({ code, message, trace, data, level }) {
  try {
    const ip = await DeviceInfo.getIPAddress();
    const logData = {
      messages: [
        {
          level,
          code,
          message,
          context: {
            data: {
              info: data,
              trace,
            },
            meta: {
              time: new Date(),
              version: APP_VERSION,
              device: {
                ip,
                brand: DeviceInfo.getBrand(),
                deviceId: DeviceInfo.getDeviceId(),
                model: DeviceInfo.getModel(),
                systemVersion: DeviceInfo.getSystemVersion(),
                userAgent: DeviceInfo.getUserAgent(),
              },
            },
          },
        },
      ],
    };
    const hasNetwork = await checkNetwork();
    if (!hasNetwork) {
      await AsyncStorage.setItem('logs', JSON.stringify(logData));
      return;
    }
    await sendLog(logData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
