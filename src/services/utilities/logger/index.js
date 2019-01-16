import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNSimData from 'react-native-sim-data';

import { APP_VERSION } from '../../constants';

import { sendLog } from '../../api';
import { checkNetwork } from '..';

export default async function createLog({ code, message, trace, data, level }) {
  try {
    const ip = await DeviceInfo.getIPAddress();
    const phoneInfo = {};
    try {
      phoneInfo.info = JSON.stringify(RNSimData.getSimInfo());
    } catch (err) {
      phoneInfo.info = err.message;
    }
    try {
      phoneInfo.telephoneRNSimData = JSON.stringify(RNSimData.getTelephoneNumber());
    } catch (err) {
      phoneInfo.telephoneRNSimData = err.message;
    }
    try {
      phoneInfo.carrierRNSimData = JSON.stringify(RNSimData.getCarrierName());
    } catch (err) {
      phoneInfo.carrierRNSimData = err.message;
    }
    try {
      phoneInfo.countryRNSimData = JSON.stringify(RNSimData.getCountryCode());
    } catch (err) {
      phoneInfo.countryRNSimData = err.message;
    }
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
                dateInstall: Date(DeviceInfo.getFirstInstallTime()),
                dateLastUpdate: Date(DeviceInfo.getLastUpdateTime()),
                phoneDeviceInfo: `${DeviceInfo.getPhoneNumber()}`,
                ...phoneInfo,
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
