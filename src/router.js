import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoadingPage from './pages/Loading';
import AppNavigation from './pages/App';
import AuthNavigation from './pages/Auth';

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingPage,
      App: AppNavigation,
      Auth: AuthNavigation,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
