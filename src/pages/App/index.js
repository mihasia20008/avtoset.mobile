import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import DiscountPage from './Discount';
import CouponsPage from './Coupons';
import PersonalPage from './Personal';
import HomePage from './Home';

import Footer from '../../components/Footer';

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
    // eslint-disable-next-line react/display-name
    tabBarComponent: props => <Footer {...props} />,
  },
);
