import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SERVER } from '../../services/constants';

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
  backAction: {
    position: 'absolute',
    top: '50%',
    left: '85%',
    zIndex: 3,
    marginTop: -15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3275bd',
  },
  backActionIcon: {
    width: '50%',
    height: '50%',
  },
});

class Header extends Component {
  static propTypes = {
    logoSrc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    hasBackIcon: PropTypes.bool,
    onBackPress: PropTypes.func,
  };

  static defaultProps = {
    hasBackIcon: false,
    onBackPress: () => {},
  };

  static getImage(logo) {
    if (logo === 'default_logo') {
      return (
        <Image
          style={styles.logo}
          // eslint-disable-next-line global-require
          source={require('./images/logo.png')}
          resizeMode="contain"
        />
      );
    }
    return (
      <Image
        style={styles.logo}
        source={{
          uri: `${SERVER.HOST}${logo}`,
        }}
        resizeMode="contain"
      />
    );
  }

  handlePress = () => {
    const { link } = this.props;
    if (link) {
      // eslint-disable-next-line no-console
      Linking.openURL(link).catch(err => console.log('An error occurred', err));
    }
  };

  render() {
    const { logoSrc, hasBackIcon, onBackPress } = this.props;

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.actionArea} onPress={this.handlePress}>
          {Header.getImage(logoSrc)}
        </TouchableOpacity>
        {hasBackIcon ? (
          <TouchableOpacity style={styles.backAction} onPress={onBackPress}>
            <Svg
              style={styles.backActionIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              // eslint-disable-next-line prettier/prettier
            >
              <Path
                fill="#3275bd"
                // eslint-disable-next-line max-len
                d="M28.9 31.8L0.6 60.1c-0.8 0.8-0.8 2.1 0 2.8 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6l28.5-28.5 28.5 28.5c0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.8-0.8 0.8-2.1 0-2.8L35.1 31.8 63.4 3.4c0.8-0.8 0.8-2.1 0-2.8 -0.8-0.8-2.1-0.8-2.8 0L32 29.2 3.4 0.6c-0.8-0.8-2.1-0.8-2.8 0 -0.8 0.8-0.8 2.1 0 2.8L28.9 31.8z"
              />
            </Svg>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default Header;
