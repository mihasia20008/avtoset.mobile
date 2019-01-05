import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import InputPhone from './Phone';
import InputPassword from './Password';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  labelWrap: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  labelText: {
    color: '#888',
    fontFamily: 'PT Sans',
    fontSize: 18,
  },
  star: {
    marginLeft: 4,
    color: '#e62222',
    fontFamily: 'PT Sans',
    fontSize: 16,
  },
  input: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    color: '#383838',
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#eaebec',
    borderRadius: 2,
    fontFamily: 'PT Sans',
    fontSize: 18,
  },
  errorWrap: {
    position: 'absolute',
    top: '100%',
    left: 0,
    paddingTop: 5,
  },
  errorText: {
    color: '#b03535',
    fontFamily: 'PT Sans',
    fontSize: 13,
  },
});

class Input extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type, ...rest } = this.props;
    switch (type) {
      case 'phone': {
        return <InputPhone {...rest} />;
      }
      case 'password': {
        return <InputPassword {...rest} />;
      }
      default: {
        return null;
      }
    }
  }
}

export default Input;
