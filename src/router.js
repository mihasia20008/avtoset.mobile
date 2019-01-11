import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoadingPage from './pages/Loading';
import OfflinePage from './pages/Offline';
import AppNavigation from './pages/App';
import AuthNavigation from './pages/Auth';

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingPage,
      Offline: OfflinePage,
      App: AppNavigation,
      Auth: AuthNavigation,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
