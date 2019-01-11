import { NetInfo } from 'react-native';

export default async () => {
  try {
    const connectionInfo = await NetInfo.getConnectionInfo();
    return connectionInfo.type !== 'none' && connectionInfo.type !== 'unknown';
  } catch (err) {
    return false;
  }
};
