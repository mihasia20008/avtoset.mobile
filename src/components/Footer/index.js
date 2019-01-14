import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform, Keyboard } from 'react-native';

import Item from './blocks/Item';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#3275bd',
  },
});

class Footer extends Component {
  static propTypes = {
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

  handlePress = key => {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;
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

export default Footer;
