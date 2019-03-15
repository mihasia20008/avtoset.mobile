import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner';

import { getDataFromAsyncStorage } from '../../redux/user/actions';
import { checkVersion } from '../../redux/checkversion/actions';
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
    checkVersionFetch: PropTypes.bool,
    needUpdate: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }),
  };

  state = {
    // eslint-disable-next-line react/no-unused-state
    prevVersionFetch: this.props.checkVersionFetch,
    // eslint-disable-next-line react/no-unused-state
    prevNeedUpdate: this.props.needUpdate,
    pathToGo: '',
    // eslint-disable-next-line react/no-unused-state
    tempPath: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { checkVersionFetch, needUpdate } = props;
    const { prevVersionFetch, prevNeedUpdate, tempPath } = state;
    if (!checkVersionFetch && prevVersionFetch !== checkVersionFetch) {
      if (!prevNeedUpdate && needUpdate) {
        return {
          pathToGo: 'ProposUpdate',
          prevVersionFetch: checkVersionFetch,
        };
      }
      return {
        pathToGo: tempPath,
      };
    }
    if (prevVersionFetch !== checkVersionFetch) {
      return {
        prevVersionFetch: checkVersionFetch,
      };
    }
    if (prevNeedUpdate !== needUpdate) {
      return {
        prevNeedUpdate: needUpdate,
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

  loadUserFromStorage = async token => {
    try {
      const { dispatch } = this.props;
      const id = await AsyncStorage.getItem('id');
      const jsonData = await AsyncStorage.getItem('userData');
      const userData = await JSON.parse(jsonData);
      dispatch(getDataFromAsyncStorage({ id: +id, authToken: token, ...userData }));
      return 'App';
    } catch (err) {
      Logger({
        level: 'error',
        code: '#4011',
        message: 'Ошибка получения данных пользователя из localStorage',
        data: {
          token,
          message: err.message,
        },
        trace: 'src/pages/Loading/index.js:107',
        // eslint-disable-next-line no-console
      }).catch(logErr => console.log(logErr));
      return 'Auth';
    }
  };

  handleCheckAppVersion = async path => {
    try {
      const hasNetwork = await checkNetwork();
      if (hasNetwork) {
        const { dispatch } = this.props;
        // eslint-disable-next-line react/no-unused-state
        this.setState({ tempPath: path });
        dispatch(checkVersion());
        return;
      }
      this.setState({ pathToGo: path });
    } catch (err) {
      Logger({
        level: 'warning',
        code: '#4012',
        message: 'Ошибка проверки версии приложения',
        data: {
          message: err.message,
        },
        trace: 'src/pages/Loading/index.js:134',
        // eslint-disable-next-line no-console
      }).catch(logErr => console.log(logErr));
      this.setState({ pathToGo: path });
    }
  };

  handleLoadApp = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const redirectPath = token ? await this.loadUserFromStorage(token) : 'Auth';
      await this.handleCheckAppVersion(redirectPath);
    } catch (err) {
      Logger({
        level: 'error',
        code: '#4010',
        message: 'Ошибка выполнения начельного сценария загрузки приложения',
        data: {
          message: err.message,
        },
        trace: 'src/pages/Loading/index.js:154',
        // eslint-disable-next-line no-console
      }).catch(logErr => console.log(logErr));
      this.setState({ pathToGo: 'Auth' });
    }
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

const mapStateToProps = ({ CheckVersion }) => {
  return {
    checkVersionFetch: CheckVersion.fetch,
    needUpdate: CheckVersion.needUpdate,
  };
};

export default connect(mapStateToProps)(LoadingPage);
