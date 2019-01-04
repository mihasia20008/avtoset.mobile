import { createStackNavigator } from 'react-navigation';

import CouponsList from './List';
import CouponDetail from './Detail';

const CouponsPage = createStackNavigator(
  {
    CouponsList,
  },
  {
    headerMode: 'none',
  },
);

export default createStackNavigator(
  {
    CouponsPage,
    CouponPage: CouponDetail,
  },
  {
    initialRouteName: 'CouponsPage',
    headerMode: 'none',
    mode: 'modal',
  },
);
