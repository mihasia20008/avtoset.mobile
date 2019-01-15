import DeviceInfo from 'react-native-device-info';
import { sendLog } from '../../api';
import { APP_VERSION } from '../../constants';

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
    await sendLog(logData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
