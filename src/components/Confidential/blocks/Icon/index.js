import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -10,
    width: 22,
    height: 22,
  },
});

class Icon extends Component {
  static propTypes = { style: PropTypes.object };

  render() {
    const { style } = this.props;
    return (
      <Svg
        style={[styles.icon, style]}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448.8 448.8"
        // eslint-disable-next-line prettier/prettier
      >
        <Polygon
          fill="#0567bf"
          points="142.8 323.9 35.7 216.8 0 252.5 142.8 395.3 448.8 89.3 413.1 53.6 "
        />
      </Svg>
    );
  }
}

export default Icon;
