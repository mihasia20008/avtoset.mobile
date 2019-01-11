import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Icon from './blocks/Icon';
import Button from '../../components/Button';

import { checkNetwork } from '../../services/utilities';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 70,
  },
  iconWrap: {
    maxHeight: 200,
    width: Dimensions.get('window').width * 0.7,
    alignItems: 'center',
  },
  textWrap: {
    marginTop: 15,
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#F44336',
  },
  actionsWrap: {
    marginTop: 40,
  },
});

class OfflinePage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
    }),
  };

  handleRetryClick = async () => {
    const hasNetwork = await checkNetwork();
    if (hasNetwork) {
      const { navigation } = this.props;
      const retryPath = navigation.getParam('retryPath');
      navigation.navigate(retryPath);
    }
  };

  handleBackClick = () => {
    const { navigation } = this.props;
    const backPath = navigation.getParam('backPath');
    navigation.navigate(backPath);
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: backPath })],
    // });
    // navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Icon />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.text}>Нет связи с сетью Интернет</Text>
          <Text style={styles.text}>Проверьте настройки соединения</Text>
        </View>
        <View style={styles.actionsWrap}>
          <View>
            <Button text="Попробовать еще" onPress={this.handleRetryClick} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button text="Назад" isEmpty onPress={this.handleBackClick} />
          </View>
        </View>
      </View>
    );
  }
}

export default OfflinePage;
