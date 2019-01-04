import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    height: 70,
    flex: 0,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7',
  },
  actionArea: {
    height: 80,
    width: '60%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

class Header extends Component {
  static propTypes = {
    city: PropTypes.string,
    link: PropTypes.string,
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

  handlePress = () => {
    const { link } = this.props;
    if (link) {
      // eslint-disable-next-line no-console
      Linking.openURL(link).catch(err => console.log('An error occurred', err));
    }
  };

  render() {
    const { city } = this.props;

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.actionArea} onPress={this.handlePress}>
          <Image style={styles.logo} source={Header.getImageSource(city)} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;
