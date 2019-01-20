import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, Keyboard, Linking } from 'react-native';
import { connect } from 'react-redux';

import Item from './blocks/Item';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#3275bd',
  },
});

class Footer extends Component {
  static propTypes = {
    uri: PropTypes.string,
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        index: PropTypes.number,
        routes: PropTypes.array,
      }),
      navigate: PropTypes.func,
    }),
  };

  state = { visibility: true };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => this.toggleBarVisibility(false)),
        Keyboard.addListener('keyboardDidHide', () => this.toggleBarVisibility(true)),
      ];
    }
  }

  componentWillUnmount() {
    if (this.keyboardEventListeners) {
      this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
    }
  }

  toggleBarVisibility = visibility => this.setState({ visibility });

  handlePress = async key => {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;
    if (key === 'Home') {
      const { uri } = this.props;
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        Linking.openURL(uri);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Произошла ошибка при попытке открыть следующую страницу: ${uri}`);
      }
      return;
    }
    navigation.navigate(key, {
      backPath: routes[index].key,
    });
  };

  render() {
    const { visibility } = this.state;
    const { navigation } = this.props;
    const { index, routes } = navigation.state;

    if (!visibility) {
      return null;
    }

    return (
      <View style={styles.container}>
        {routes.map((route, routeIndex) => (
          <Item
            key={route.key}
            name={route.key}
            isActive={index === routeIndex}
            onPress={this.handlePress}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    uri: User.userData.region.domain,
  };
};

export default connect(mapStateToProps)(Footer);
