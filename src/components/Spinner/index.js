import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  spinner: {
    width: '100%',
    height: '100%',
  },
});

class Spinner extends Component {
  state = { spinValue: new Animated.Value(0) };

  componentDidMount() {
    this.runAnimation();
  }

  componentWillUnmount() {
    const { spinValue } = this.state;
    Animated.timing(spinValue).stop();
  }

  runAnimation = () => {
    const { spinValue } = this.state;
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => this.runAnimation());
  };

  render() {
    const { spinValue } = this.state;
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <Path
            // eslint-disable-next-line max-len
            d="M244.4 372.4c-12.9 0-23.3 10.4-23.3 23.3v93.1c0 12.9 10.4 23.3 23.3 23.3 12.9 0 23.3-10.4 23.3-23.3v-93.1C267.6 382.8 257.2 372.4 244.4 372.4z"
            fill="#2D50A7"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M244.4 0c-12.9 0-23.3 10.4-23.3 23.3v93.1c0 12.9 10.4 23.3 23.3 23.3 12.9 0 23.3-10.4 23.3-23.3V23.3C267.6 10.4 257.2 0 244.4 0z"
            fill="#73A1FB"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M359.6 338.3c-9.1-9.1-23.8-9.1-32.9 0 -9.1 9.1-9.1 23.8 0 32.9l65.8 65.8c4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8 9.1-9.1 9.1-23.8 0-32.9L359.6 338.3z"
            fill="#355EC9"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M81.5 232.7H34.9c-12.9 0-23.3 10.4-23.3 23.3 0 12.9 10.4 23.3 23.3 23.3h46.5c12.9 0 23.3-10.4 23.3-23.3C104.7 243.1 94.3 232.7 81.5 232.7z"
            fill="#C4D9FD"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M96.3 75c-9.1-9.1-23.8-9.1-32.9 0s-9.1 23.8 0 32.9l65.8 65.8c4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8 9.1-9.1 9.1-23.8 0-32.9L96.3 75z"
            fill="#C4D9FD"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M477.1 232.7H384c-12.9 0-23.3 10.4-23.3 23.3 0 12.9 10.4 23.3 23.3 23.3h93.1c12.9 0 23.3-10.4 23.3-23.3C500.4 243.1 489.9 232.7 477.1 232.7z"
            fill="#3D6DEB"
          />
          <Path
            // eslint-disable-next-line max-len
            d="M392.5 75l-65.8 65.8c-9.1 9.1-9.1 23.8 0 32.9 4.5 4.5 10.5 6.8 16.5 6.8 6 0 11.9-2.3 16.5-6.8l65.8-65.8c9.1-9.1 9.1-23.8 0-32.9C416.3 65.9 401.6 65.9 392.5 75z"
            fill="#5286FA"
          />
        </Svg>
      </Animated.View>
    );
  }
}

export default Spinner;
