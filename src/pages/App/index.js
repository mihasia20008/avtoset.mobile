import { createBottomTabNavigator } from 'react-navigation';

import DiscountPage from './Discount';
import CouponsPage from './Coupons';
import PersonalPage from './Personal';
import HomePage from './Home';

export default createBottomTabNavigator(
  {
    Discount: DiscountPage,
    Coupons: CouponsPage,
    Home: HomePage,
    Personal: PersonalPage,
  },
  {
    order: ['Personal', 'Home', 'Discount', 'Coupons'],
    animationEnabled: true,
    initialRouteName: 'Discount',
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#0065BF',
      inactiveTintColor: '#fff',
      inactiveBackgroundColor: '#3275bd',
      safeAreaInset: {
        bottom: 'never',
      },
      showIcon: false,
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelStyle: {
        fontSize: 16,
      },
    },
  },
);
