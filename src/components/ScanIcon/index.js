import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const styles = StyleSheet.create({
  icon: {
    width: Dimensions.get('window').width * 0.33,
    height: Dimensions.get('window').width * 0.33,
  },
});

class ScanIcon extends Component {
  render() {
    return (
      <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70">
        <Path
          fill="#0065bf"
          // eslint-disable-next-line max-len
          d="M29.6 0H4.4C2 0 0 2 0 4.4v51.2C0 58 2 60 4.4 60h25.2c2.4 0 4.4-2 4.4-4.4V4.4C34 2 32 0 29.6 0zM2 8h30v38H2V8zM4.4 2h25.2C30.9 2 32 3.1 32 4.4V6H2V4.4C2 3.1 3.1 2 4.4 2zM29.6 58H4.4C3.1 58 2 56.9 2 55.6V48h30v7.6C32 56.9 30.9 58 29.6 58z"
        />
        <Path
          fill="#0065bf"
          // eslint-disable-next-line max-len
          d="M17 49c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S19.2 49 17 49zM17 55c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2S18.1 55 17 55z"
        />
        <Path
          fill="#0065bf"
          d="M13 5h4c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4c-0.6 0-1 0.4-1 1S12.4 5 13 5z"
        />
        <Path
          fill="#0065bf"
          d="M20 5h1c0.6 0 1-0.4 1-1s-0.4-1-1-1h-1c-0.6 0-1 0.4-1 1S19.4 5 20 5z"
        />
        <G id="scan-group">
          <Path
            fill="#0065bf"
            // eslint-disable-next-line max-len
            d="M41.3 56c-1.4 0-2.6-1.3-2.6-2.8s1.2-2.8 2.6-2.8c0.1 0 0.1 0 0.1-0.1v-0.1 -0.1c0 0-0.1-0.4-0.7-0.8l-1.1-0.8c-0.9-0.6-1.4-1.8-1.1-2.8v-0.1l0.5-1.5c0-0.1 0-0.2 0.1-0.3v-0.2c0.1-0.7-0.2-1.4-0.8-1.8L37.2 41c-1-0.7-1.4-2-1.1-3.2l0.4-1.2c0.1-0.4 0.1-0.7 0-1.1l0 0c-0.1-0.4-1-3.2-1.7-5.4l-8 1.2c-0.2 0-0.5 0-0.7 0 -1.1 0-2.2-0.4-3.1-1.1 -1.1-0.9-1.7-2.2-1.7-3.5v-13c0-1.3 0.6-2.6 1.7-3.5 0.8-0.7 1.9-1.1 3.1-1.1 0.2 0 0.5 0 0.7 0.1L45.3 12c4.1 0.6 7.2 4.2 7.2 8.4 0 3.2-1.8 6.2-4.6 7.6l7.5 22.7c0.1 0.2 0.2 0.3 0.2 0.4h0.7c0.7 0 1.4 0.3 1.9 0.8s0.7 1.1 0.7 1.7c0 1.4-1.1 2.5-2.6 2.5h-15V56z"
          />
          <Path
            fill="#fff"
            // eslint-disable-next-line max-len
            d="M26.1 10.1c0.2 0 0.4 0 0.5 0l18.5 2.8c3.7 0.5 6.4 3.7 6.4 7.4 0 3.2-2 6-4.8 7.1L54.5 51c0.2 0.5 0.6 1.1 1.1 1.1h0.8c0.9 0 1.6 0.6 1.6 1.5s-0.7 1.5-1.6 1.5h-0.5H44h-2.7c-0.9 0-1.6-0.9-1.6-1.8 0-0.9 0.7-1.8 1.6-1.8 0.4 0 0.7-0.2 0.9-0.5s0.3-0.7 0.2-1c0 0-0.2-0.8-1.2-1.4l-1.1-0.8c-0.6-0.4-0.9-1.1-0.7-1.8l0.5-1.5c0-0.1 0.1-0.3 0.1-0.4l0 0c0.2-1.1-0.3-2.2-1.2-2.9l-1.1-0.8c-0.7-0.5-0.9-1.3-0.7-2.1l0.4-1.2c0.2-0.6 0.2-1.1 0.1-1.7l-2-6.3 -8.8 1.3c-0.2 0-0.4 0-0.5 0 -0.9 0-1.7-0.3-2.4-0.9 -0.8-0.7-1.3-1.7-1.3-2.8v-13c0-1.1 0.5-2.1 1.3-2.7C24.4 10.4 25.2 10.1 26.1 10.1M26.1 8.1L26.1 8.1c-1.4 0-2.7 0.5-3.7 1.4 -1.3 1.1-2 2.7-2 4.3v13.1c0 1.6 0.7 3.2 2 4.3 1 0.9 2.3 1.4 3.7 1.4 0.3 0 0.6 0 0.8-0.1l7.2-1.1c0.6 2 1.3 4.2 1.5 4.5l0 0c0 0.2 0 0.4 0 0.5l-0.4 1.2c-0.5 1.6 0.1 3.3 1.4 4.3l1.1 0.8c0.3 0.2 0.4 0.5 0.4 0.9v0.1 0.1l-0.5 1.5v0.1 0.1c-0.3 1.5 0.3 3 1.5 3.9l0.7 0.5c-1.2 0.6-2 1.9-2 3.4 0 2 1.7 3.8 3.6 3.8H44h11.8 0.5c2 0 3.6-1.5 3.6-3.5 0-0.9-0.3-1.8-1-2.4 -0.7-0.7-1.6-1.1-2.6-1.1h-0.1L49 28.5c2.7-1.7 4.4-4.8 4.4-8.1 0-4.7-3.5-8.7-8.1-9.4L27 8.2C26.7 8.1 26.4 8.1 26.1 8.1L26.1 8.1 26.1 8.1z"
          />
          <Path
            id="line-middle"
            fill="#0065bf"
            // eslint-disable-next-line max-len
            d="M16 28.1c-1.1 0-2-0.9-2-2v-12c0-1.1 0.9-2 2-2s2 0.9 2 2v12C18 27.2 17.1 28.1 16 28.1z"
          />
          <Path
            fill="#fff"
            // eslint-disable-next-line max-len
            d="M16 13.1c0.6 0 1 0.4 1 1v12c0 0.6-0.4 1-1 1s-1-0.4-1-1v-12C15 13.5 15.5 13.1 16 13.1M16 11.1c-1.7 0-3 1.3-3 3v12c0 1.7 1.3 3 3 3s3-1.3 3-3v-12C19 12.4 17.7 11.1 16 11.1L16 11.1z"
          />
          <Path
            id="line-big"
            fill="#0065bf"
            d="M12 31c-1.1 0-2-0.9-2-2V11c0-1.1 0.9-2 2-2s2 0.9 2 2v18C14 30.1 13.1 31 12 31z"
          />
          <Path
            fill="#fff"
            // eslint-disable-next-line max-len
            d="M12 10c0.6 0 1 0.4 1 1v18c0 0.6-0.4 1-1 1s-1-0.4-1-1V11C11 10.5 11.5 10 12 10M12 8c-1.7 0-3 1.3-3 3v18c0 1.7 1.3 3 3 3s3-1.3 3-3V11C15 9.4 13.7 8 12 8L12 8z"
          />
          <Path
            id="line-small"
            fill="#0065bf"
            // eslint-disable-next-line max-len
            d="M19.5 24.4c-0.9 0-1.7-0.5-1.7-1.1v-6.7c0-0.6 0.7-1.1 1.7-1.1s1.7 0.5 1.7 1.1v6.7C21.2 23.9 20.4 24.4 19.5 24.4z"
          />
          <Path
            fill="#fff"
            // eslint-disable-next-line max-len
            d="M19.5 16.1c0.5 0 0.8 0.2 0.8 0.6v6.7c0 0.3-0.3 0.6-0.8 0.6s-0.8-0.2-0.8-0.6v-6.7C18.7 16.3 19.1 16.1 19.5 16.1M19.5 15c-1.4 0-2.5 0.7-2.5 1.7v6.7c0 0.9 1.1 1.7 2.5 1.7s2.5-0.7 2.5-1.7v-6.7C22 15.7 20.9 15 19.5 15L19.5 15z"
          />
        </G>
      </Svg>
    );
  }
}

export default ScanIcon;
