import DeviceInfo from 'react-native-device-info';
import * as SERVER from './server';

const APP_VERSION = DeviceInfo.getVersion();

export { SERVER, APP_VERSION };
