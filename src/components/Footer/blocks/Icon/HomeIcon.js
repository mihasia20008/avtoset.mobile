import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: '75%',
  },
});

class HomeIcon extends Component {
  render() {
    return (
      <Svg
        style={styles.icon}
        className="footer__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 27"
        // eslint-disable-next-line prettier/prettier
      >
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="M3.7 24.9c0 0 0 0.6 0.6 0.6 0.7 0 6.8 0 6.8 0l0-5.6c0 0-0.1-0.9 0.8-0.9h2.8c1.1 0 1 0.9 1 0.9l0 5.6c0 0 5.8 0 6.7 0 0.7 0 0.7-0.8 0.7-0.8V14.4l-9.4-8.4 -10 8.4C3.7 14.4 3.7 24.9 3.7 24.9z"
        />
        <Path
          fill="#fff"
          d="M0 13.6c0 0 0.8 1.6 2.7 0l11-9.3 10.3 9.3c2.1 1.5 2.9 0 2.9 0L13.7 1.5 0 13.6z"
        />
        <Polygon fill="#fff" points="23.8 4.3 21.2 4.3 21.2 7.5 23.8 9.8 " />
      </Svg>
    );
  }
}

export default HomeIcon;
