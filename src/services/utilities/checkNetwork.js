import { NetInfo } from 'react-native';

export default async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();

  return connectionInfo.type !== 'none' && connectionInfo.type !== 'unknown';
};
