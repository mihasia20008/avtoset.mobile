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
      <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.7 490.7">
        <Path
          // eslint-disable-next-line max-len
          d="M483.6 144.6c-96.3-73.6-221.3-98.6-338.6-67.5 -5.7 1.5-9.1 7.3-7.6 13 0.5 1.8 1.4 3.5 2.8 4.8l215.6 215.6c2 2 4.7 3.1 7.6 3.1h0.7c3.1-0.2 5.9-1.8 7.8-4.3L485.7 159.5C489.2 154.8 488.3 148.2 483.6 144.6z"
          fill="#006ac5"
        />
        <Path
          // eslint-disable-next-line max-len
          d="M344.9 329.8L110.2 95.2c-3-3-7.6-4-11.5-2.3 -32.7 13.1-63.5 30.5-91.6 51.8 -4.7 3.5-5.7 10.2-2.1 14.9L236.8 465.1c3.5 4.7 10.2 5.7 14.9 2.1 0.8-0.6 1.5-1.3 2.1-2.1l92-121.3C349.1 339.5 348.7 333.6 344.9 329.8z"
          fill="#006ac5"
        />
        <Path
          // eslint-disable-next-line max-len
          d="M480 490.7c-2.8 0-5.5-1.1-7.6-3.1L3.1 18.2c-4.2-4.2-4.2-10.9 0-15.1s10.9-4.2 15.1 0l469.3 469.3c4.2 4.2 4.2 10.9 0 15.1C485.6 489.6 482.9 490.7 480 490.7z"
          fill="#F44336"
        />
      </Svg>
    );
  }
}

export default Icon;
