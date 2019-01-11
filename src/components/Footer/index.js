import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

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

  handlePress = key => {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;
    navigation.navigate(key, {
      backPath: routes[index].key,
    });
  };

  render() {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;

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
