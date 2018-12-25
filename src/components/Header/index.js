import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

class Header extends Component {
  static propTypes = {
    city: PropTypes.string,
  };

  static getImageSource(code) {
    switch (code) {
      case '46': {
        // eslint-disable-next-line global-require
        return require(`./images/logo46.png`);
      }
      case '36': {
        // eslint-disable-next-line global-require
        return require(`./images/logo36.png`);
      }
      case '31': {
        // eslint-disable-next-line global-require
        return require(`./images/logo31.png`);
      }
      default: {
        // eslint-disable-next-line global-require
        return require(`./images/logo.png`);
      }
    }
  }

  render() {
    const { city } = this.props;

    return (
      <View style={styles.header}>
        <Image style={styles.logo} source={Header.getImageSource(city)} />
      </View>
    );
  }
}

export default Header;
