import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoadingPage from './pages/Loading';
import OfflinePage from './pages/Offline';
import ProposUpdatePage from './pages/ProposUpdate';
import AppNavigation from './pages/App';
import AuthNavigation from './pages/Auth';

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingPage,
      ProposUpdate: ProposUpdatePage,
      Offline: OfflinePage,
      App: AppNavigation,
      Auth: AuthNavigation,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
