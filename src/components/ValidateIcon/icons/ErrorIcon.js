import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    right: 15,
    marginTop: 3,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ff5346',
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -6,
    marginLeft: -6,
    width: 12,
    height: 12,
  },
});

class ErrorIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357">
          <Polygon
            // eslint-disable-next-line max-len
            points="357 35.7 321.3 0 178.5 142.8 35.7 0 0 35.7 142.8 178.5 0 321.3 35.7 357 178.5 214.2 321.3 357 357 321.3 214.2 178.5 "
            fill="#ff5346"
          />
        </Svg>
      </View>
    );
  }
}

export default ErrorIcon;
