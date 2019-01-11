import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  icon: {
    width: 43,
    height: '75%',
    maxHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class DiscountIcon extends Component {
  render() {
    return (
      <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 360">
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m462 0h-412c-27.6 0-50 22.4-50 50v260c0 27.6 22.4 50 50 50h412c27.6 0 50-22.4 50-50v-260c0-27.6-22.4-50-50-50zm30 310c0 16.5-13.5 30-30 30h-412c-16.5 0-30-13.5-30-30v-20h472zm0-40h-472v-60h472zm0-80h-472v-140c0-16.5 13.5-30 30-30h412c16.5 0 30 13.5 30 30zm0 0"
        />
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m262 72h150c5.5 0 10-4.5 10-10s-4.5-10-10-10h-150c-5.5 0-10 4.5-10 10s4.5 10 10 10zm0 0"
        />
        <Path
          fill="#fff"
          d="m452 72c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm0 0"
        />
        <Path
          fill="#fff"
          d="m462 92h-60c-5.5 0-10 4.5-10 10s4.5 10 10 10h60c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m362 92h-100c-5.5 0-10 4.5-10 10s4.5 10 10 10h100c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          d="m462 132h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          d="m402 132h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          d="m282 132h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          d="m342 132h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zm0 0"
        />
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m182.5 42.4c-4.2-3.6-10.5-3.1-14.1 1.1l-94 110c-3.6 4.2-3.1 10.5 1.1 14.1 1.9 1.6 4.2 2.4 6.5 2.4 2.8 0 5.6-1.2 7.6-3.5l94-110c3.6-4.2 3.1-10.5-1.1-14.1zm0 0"
        />
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m110 70c0-16.5-13.5-30-30-30s-30 13.5-30 30 13.5 30 30 30 30-13.5 30-30zm-40 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm0 0"
        />
        <Path
          fill="#fff"
          // eslint-disable-next-line max-len
          d="m179 110c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 40c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0 0"
        />
      </Svg>
    );
  }
}

export default DiscountIcon;
