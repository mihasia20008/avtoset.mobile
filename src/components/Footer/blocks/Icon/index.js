import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DiscountIcon from './DiscountIcon';
import HomeIcon from './HomeIcon';
import CouponsIcon from './CouponsIcon';
import PersonalIcon from './PersonalIcon';

class Icon extends Component {
  static propTypes = { type: PropTypes.string };

  static defaultProps = { type: '' };

  render() {
    const { type } = this.props;
    switch (type) {
      case 'Discount': {
        return <DiscountIcon />;
      }
      case 'Home': {
        return <HomeIcon />;
      }
      case 'Coupons': {
        return <CouponsIcon />;
      }
      case 'Personal': {
        return <PersonalIcon />;
      }
      default: {
        return null;
      }
    }
  }
}

export default Icon;
