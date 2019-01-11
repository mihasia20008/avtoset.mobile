import { createStackNavigator } from 'react-navigation';

import ProfilePage from './ShowProfile';
import EditPage from './EditProfile';
import ChangePassword from './ChangePassword';

export default createStackNavigator(
  {
    Profile: ProfilePage,
    Edit: EditPage,
    ChangePassword,
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);
