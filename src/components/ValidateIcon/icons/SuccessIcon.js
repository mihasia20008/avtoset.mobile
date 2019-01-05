import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    right: 15,
    marginTop: 3,
    width: 24,
    height: 24,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

class SuccessIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
          <Path
            // eslint-disable-next-line max-len
            d="M150.5 206.6l-35.7 35.7L229.5 357l255-255 -35.7-35.7L229.5 285.6 150.5 206.6zM459 255c0 112.2-91.8 204-204 204S51 367.2 51 255 142.8 51 255 51c20.4 0 38.3 2.6 56.1 7.7l40.8-40.8C321.3 7.7 288.2 0 255 0 114.8 0 0 114.8 0 255s114.8 255 255 255 255-114.7 255-255H459z"
            fill="#28921f"
          />
        </Svg>
      </View>
    );
  }
}

export default SuccessIcon;
