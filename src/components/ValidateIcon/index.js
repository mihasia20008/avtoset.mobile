import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SuccessIcon, ErrorIcon } from './icons';

class ValidateIcon extends Component {
  static propTypes = { type: PropTypes.string };

  static defaultProps = { type: '' };

  render() {
    const { type } = this.props;
    switch (type) {
      case 'success': {
        return <SuccessIcon />;
      }
      case 'error': {
        return <ErrorIcon />;
      }
      default: {
        return null;
      }
    }
  }
}

export default ValidateIcon;
