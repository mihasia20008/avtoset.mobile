import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';

import Barcode from 'react-native-barcode-builder';

const maxWidth = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    width: maxWidth > 400 ? 400 : maxWidth,
  },
});

class BarcodeBlock extends Component {
  static propTypes = { number: PropTypes.string };

  static defaultProps = { number: '' };

  render() {
    const { number } = this.props;

    if (!number) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Barcode
            flat
            value={number}
            format="EAN13"
            width={3}
            height={150}
            displayValue={false}
            margin={0}
          />
        </View>
      </View>
    );
  }
}

export default BarcodeBlock;
