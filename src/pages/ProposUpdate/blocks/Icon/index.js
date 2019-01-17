import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
  },
});

class Icon extends Component {
  render() {
    return (
      <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="-4 0 511 512">
        <Path
          fill="#006ac5"
          // eslint-disable-next-line max-len
          d="m376.8 91.6c-18.6-54.1-69.8-91.6-128.6-91.6-54.7 0-102.4 32.3-124.1 80.4-62.1-17.2-123.6 29.7-123.6 94 0 53.8 43.8 97.5 97.5 97.5h45.2v209c0 17.1 13.9 31 31 31h156.2c17.1 0 31-13.9 31-31v-209h49.3c51.5 0 93.4-41.9 93.4-93.4 0-65.5-66.2-111-127.4-87zm-46.3 389.4s0 0 0 0h-156.2v-20.1h156.3zm0-240.8v189.7h-156.2v-189.7zm-156.2-31v-20.1h156.3v20.1zm236.6 31.8h-49.3v-51.8c0-17.1-13.9-31-31-31h-156.2c-17.1 0-31 13.9-31 31v51.8c-31.8 0-10.9 0-45.1 0-36.7 0-66.5-29.8-66.5-66.5 0-48.8 51.1-81 95-60.1 8.5 4 18.7-0.3 21.5-9.4 13.7-44.1 54-73.8 100.2-73.8 50.8 0 94.2 36.2 103.2 86.1 2 11.1 14.8 16.4 24.1 10 41-28.3 97.6 1.1 97.6 51.4 0 34.4-28 62.3-62.3 62.3zm0 0"
        />
        <Path
          fill="#006ac5"
          // eslint-disable-next-line max-len
          d="m300.6 357-37 37c-6.8 6.8-18.2 5.8-23.7-1.8l-35.7-35.7c-14.5-14.5 7.4-36.4 22-22l10.8 10.8v-58.3c0-20.6 31-20.6 31 0v58.8l10.7-10.7c14.5-14.5 36.5 7.4 22 22zm0 0"
        />
      </Svg>
    );
  }
}

export default Icon;
