import { createStackNavigator } from 'react-navigation';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import RestorePasswordPage from './RestorePassword';

export default createStackNavigator(
  {
    SignUp: SignUpPage,
    SignIn: SignInPage,
    RestorePassword: RestorePasswordPage,
  },
  {
    initialRouteName: 'SignUp',
    headerMode: 'none',
  },
);
