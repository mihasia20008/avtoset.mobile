import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import RNExitApp from 'react-native-exit-app';

import Spinner from '../../components/Spinner';

import { getDataFromAsyncStorage, legacyUpdateData } from '../../redux/user/actions';
import { checkNetwork, Logger } from '../../services/utilities';

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
  wrap: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
  },
  titleWrap: {
    marginTop: 100,
  },
  titleText: {
    fontFamily: 'PT Sans',
    fontSize: 22,
    color: '#3275bd',
  },
});

class LoadingPage extends Component {
  static propTypes = {
    id: PropTypes.number,
    legacyData: PropTypes.shape({
      isFetching: PropTypes.bool,
      status: PropTypes.string,
    }),
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }),
  };

  static getInfoFromDb(callback) {
    /* eslint-disable */
    const db = SQLite.openDatabase(
      'AvtosetDataBase',
      '1.5.0',
      'AvtosetDataBase',
      1024 * 1024 * 4,
      () => console.log('Database OPENED'),
      err =>
        callback({
          isSuccess: false,
          err,
        }),
    );
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS CLIENTS (ID,USER,CAR)',
        [],
        (tx, result) => {},
        (tx, result) =>
          callback({
            isSuccess: false,
            err: result,
          }),
      );
      tx.executeSql(
        'SELECT * FROM CLIENTS',
        [],
        (tx, results) => {
          const len = results.rows.length;
          if (!len) {
            callback({
              isSuccess: false,
              err: 'Нет данных об авторизации',
            });
            return;
          }
          callback({
            isSuccess: true,
            user: results.rows.item(0),
          });
        },
        (tx, result) => {
          callback({
            isSuccess: false,
            err: result,
          });
        },
      );
    });
    /* eslint-enable */
  }

  state = {
    pathToGo: '',
  };

  static getDerivedStateFromProps(props) {
    const { legacyData, id } = props;
    if (!legacyData.isFetching && legacyData.status === 'success') {
      AsyncStorage.setItem('legacyUpdate', 'true');
      Logger({
        level: 'debug',
        code: '#4001',
        message: 'Успешный перенос авторизации пользователя из старой версии приложения',
        data: { user_id: id },
        trace: 'src/pages/Loading/index.js:109',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      return {
        pathToGo: 'App',
      };
    }
    if (!legacyData.isFetching && legacyData.status === 'error') {
      AsyncStorage.setItem('legacyUpdate', 'false');
      Logger({
        level: 'debug',
        code: '#4002',
        message: 'Ошибка переноса авторизации на стороне сервера',
        data: legacyData.message,
        trace: 'src/pages/Loading/index.js:123',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      return {
        pathToGo: 'Auth',
      };
    }
    return {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleLoadApp().catch(() => this.setState({ pathToGo: 'Auth' }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { pathToGo: prevPathToGo } = prevState;
    const { pathToGo: nowPathToGo } = this.state;
    const { navigation } = this.props;

    if (!prevPathToGo && nowPathToGo) {
      navigation.navigate(nowPathToGo);
    }
  }

  handleLoadApp = async () => {
    const { dispatch } = this.props;
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      const id = await AsyncStorage.getItem('id');
      const jsonData = await AsyncStorage.getItem('userData');
      const userData = await JSON.parse(jsonData);
      dispatch(getDataFromAsyncStorage({ id: +id, authToken: token, ...userData }));
      this.setState({ pathToGo: 'App' });
    } else {
      const statusLegacyUpdate = await AsyncStorage.getItem('legacyUpdate');
      if (!statusLegacyUpdate) {
        const hasNetwork = await checkNetwork();
        if (hasNetwork) {
          LoadingPage.getInfoFromDb(this.callbackGettingData);
          return;
        }
        // eslint-disable-next-line no-alert
        alert(
          'Для первого запуска приложения после обновления необходимо подключение к сети Интеренет',
        );
        setTimeout(() => RNExitApp.exitApp(), 2500);
      }
      this.setState({ pathToGo: 'Auth' });
    }
  };

  callbackGettingData = async result => {
    const { isSuccess, ...rest } = result;
    if (!isSuccess) {
      await AsyncStorage.setItem('legacyUpdate', 'false');
      this.setState({ pathToGo: 'Auth' });
      Logger({
        level: 'debug',
        code: '#4003',
        message: 'Ошибка переноса авторизации на стороне приложения',
        data: rest,
        trace: 'src/pages/Loading/index.js:186',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      return;
    }
    const { dispatch } = this.props;
    dispatch(legacyUpdateData(rest.user.ID));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Spinner />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>Загрузка...</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    legacyData: User.legacy,
    id: User.userData.id,
  };
};

export default connect(mapStateToProps)(LoadingPage);
