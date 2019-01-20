import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, AsyncStorage, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import PageTitle from '../../../../components/PageTitle';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import globalFormStyles from '../../../../containers/Form/styles';

import { logoutFromAccount, updateData } from '../../../../redux/user/actions';

import { checkNetwork } from '../../../../services/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  carList: {
    marginTop: 30,
  },
  buttonBlock: {
    marginTop: 30,
  },
  buttonWithNoMargin: {
    marginTop: 0,
  },
  lastButton: {
    paddingBottom: 30,
  },
});

class ProfilePage extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    cars: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }),
  };

  willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
    const { needUpdate } = this.props;
    const hasNetwork = await checkNetwork();
    if (hasNetwork && !needUpdate) {
      const { id, dispatch } = this.props;
      dispatch(updateData(id));
    }
  });

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleGoToEdit = async () => {
    const { navigation } = this.props;
    const hasNetwork = await checkNetwork();
    const needUpdate = await AsyncStorage.getItem('needUpdate');

    if (needUpdate === 'true') {
      navigation.navigate('ProposUpdate');
      return;
    }
    if (hasNetwork) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Profile' }),
          NavigationActions.navigate({ routeName: 'Edit' }),
        ],
      });
      navigation.dispatch(resetAction);
    } else {
      navigation.navigate('Offline', {
        backPath: 'Profile',
        retryPath: 'Edit',
      });
    }
  };

  handleGoToChangePassword = async () => {
    const { navigation } = this.props;
    const hasNetwork = await checkNetwork();
    const needUpdate = await AsyncStorage.getItem('needUpdate');

    if (needUpdate === 'true') {
      navigation.navigate('ProposUpdate');
      return;
    }
    if (hasNetwork) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Profile' }),
          NavigationActions.navigate({ routeName: 'ChangePassword' }),
        ],
      });
      navigation.dispatch(resetAction);
    } else {
      navigation.navigate('Offline', {
        backPath: 'Profile',
        retryPath: 'ChangePassword',
      });
    }
  };

  handleLogoutPress = async () => {
    const { navigation, dispatch } = this.props;
    const wasRunning = await AsyncStorage.getItem('wasRunning');
    await AsyncStorage.clear();
    if (wasRunning) {
      await AsyncStorage.setItem('wasRunning', wasRunning);
    }
    dispatch(logoutFromAccount());
    navigation.navigate('Auth');
  };

  render() {
    const { profile, cars, navigation } = this.props;
    const infoMessage = navigation.getParam('message');

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
          <PageTitle title="Личный кабинет" />
          {infoMessage ? <Text style={globalFormStyles.infoMessage}>{infoMessage}</Text> : null}
          {Object.keys(profile).map(key => (
            <Input
              key={key}
              useMask={key === 'login'}
              type="disabled-text"
              label={profile[key].name}
              value={profile[key].value}
            />
          ))}
          <View style={globalFormStyles.buttons}>
            <Button text="Изменить личные данные" onPress={this.handleGoToEdit} />
          </View>
          <View style={[globalFormStyles.buttons, styles.buttonBlock]}>
            <Button text="Изменить пароль" onPress={this.handleGoToChangePassword} />
          </View>
          {cars.map(car => (
            <View key={car.id} style={styles.carList}>
              {car.parameters.map(item => (
                <Input
                  key={item.name}
                  type="disabled-text"
                  label={item.name}
                  value={item.value.toString()}
                />
              ))}
            </View>
          ))}
          <View
            style={[
              globalFormStyles.buttons,
              styles.lastButton,
              cars.length ? styles.buttonWithNoMargin : styles.buttonBlock,
            ]}
            // eslint-disable-next-line prettier/prettier
          >
            <Button isEmpty text="Выход" onPress={this.handleLogoutPress} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ User, CheckVersion }) => {
  return {
    needUpdate: CheckVersion.needUpdate,
    id: User.userData.id,
    profile: User.userData.profile,
    cars: User.userData.cars,
  };
};

export default connect(mapStateToProps)(ProfilePage);
