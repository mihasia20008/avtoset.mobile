import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import ScanIcon from '../ScanIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconWrap: {
    width: Dimensions.get('window').width * 0.33,
  },
  contentWrap: {
    alignSelf: 'center',
    paddingLeft: 15,
    width: Dimensions.get('window').width * 0.67,
  },
  contentText: {
    marginTop: 0,
    fontFamily: 'PT Sans',
    fontSize: 16,
  },
});

class InfoBlock extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <ScanIcon />
        </View>
        <View style={styles.contentWrap}>
          <Text style={styles.contentText}>
            Чтобы получить скидку,{'\n'}
            отсканируйте штрих-код{'\n'}
            на кассе магазина
          </Text>
        </View>
      </View>
    );
  }
}

export default InfoBlock;
