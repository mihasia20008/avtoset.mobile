import { createStackNavigator } from 'react-navigation';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';

export default createStackNavigator(
  {
    SignUp: SignUpPage,
    SignIn: SignInPage,
  },
  {
    initialRouteName: 'SignUp',
    headerMode: 'none',
  },
);
