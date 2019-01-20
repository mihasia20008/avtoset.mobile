import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageTitle from '../../components/PageTitle';
import SignBlock from '../../components/SignBlock';
import Button from '../../components/Button';
import Icon from './blocks/Icon';

import FirstRunForm from '../../containers/Form/FirstRun';

import { legacyUpdateData } from '../../redux/user/actions';
import Spinner from '../../components/Spinner';
import { Logger } from '../../services/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-around',
  },
  checking: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  iconWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 120,
    height: 120,
  },
  textWrap: {
    marginBottom: 30,
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 20,
    textAlign: 'center',
  },
});

class HelloPage extends Component {
  static propTypes = {
    id: PropTypes.number,
    legacyData: PropTypes.shape({
      isFetching: PropTypes.bool,
      status: PropTypes.string,
    }),
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
  };

  state = {
    step: 0,
    value: '',
  };

  componentDidMount() {
    this.helloTimer = setTimeout(() => this.handleGoToNext(), 15000);
  }

  componentDidUpdate() {
    const { id, legacyData, navigation } = this.props;
    const { value } = this.state;

    if (!legacyData.isFetching && legacyData.status === 'success') {
      Logger({
        level: 'debug',
        code: '#4006',
        message: 'Успешная авторизация пользователя через сервер',
        data: { user_id: id },
        trace: 'src/pages/Hello/index.js:73',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      navigation.navigate('App');
      return;
    }
    if (!legacyData.isFetching && legacyData.status === 'signin') {
      Logger({
        level: 'debug',
        code: '#4007',
        message: 'Ошибка авторизации. Пользователя не существует.',
        data: { user_phone: value },
        trace: 'src/pages/Hello/index.js:89',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      navigation.navigate('SignIn', {
        phone: value,
        message: 'Пользователя не существует. Для продолжения зарегистрируйтесь:',
      });
      return;
    }
    if (!legacyData.isFetching && legacyData.status === 'signup') {
      Logger({
        level: 'debug',
        code: '#4008',
        message: 'Ошибка авторизации. Пользователя не имеет авторизации в мобильном приложении.',
        data: { user_phone: value },
        trace: 'src/pages/Hello/index.js:103',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      navigation.navigate('SignUp', {
        phone: value,
        message: 'Для первого запуска приложения необходима авторизация:',
      });
    }
    if (!legacyData.isFetching && legacyData.status === 'error') {
      Logger({
        level: 'debug',
        code: '#4009',
        message: 'Ошибка авторизации. Неизвестная ошибка',
        data: legacyData.message,
        trace: 'src/pages/Hello/index.js:118',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
      navigation.navigate('SignUp', {
        phone: value,
      });
    }
  }

  handleGoToAuth = async () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  handleGoToNext = () => {
    clearTimeout(this.helloTimer);
    this.setState({ step: 1 });
  };

  handleCheckNumber = value => {
    this.setState({ step: 2, value });
    const { dispatch } = this.props;
    dispatch(legacyUpdateData(`7${value}`));
  };

  renderStep = () => {
    const { step } = this.state;

    switch (step) {
      case 2: {
        return (
          <View style={styles.checking}>
            <View style={styles.iconWrap}>
              <View style={styles.icon}>
                <Spinner />
              </View>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.text}>Выполняется проверка учетной записи</Text>
            </View>
          </View>
        );
      }
      case 1: {
        return (
          <SignBlock content="Введите номер телефона для проверки вашей учетной записи">
            <FirstRunForm onEnterPhone={this.handleCheckNumber} onGoToAuth={this.handleGoToAuth} />
          </SignBlock>
        );
      }
      default: {
        return (
          <View style={styles.screen}>
            <View style={styles.iconWrap}>
              <View style={styles.icon}>
                <Icon />
              </View>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                Спасибо за установку обновленного приложения «АвтоСЕТЬ»
              </Text>
            </View>
            <View>
              <Button text="Далее" onPress={this.handleGoToNext} />
            </View>
          </View>
        );
      }
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        // eslint-disable-next-line prettier/prettier
      >
        <PageTitle title="Добро пожаловать!" />
        {this.renderStep()}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    id: User.userData.id,
    legacyData: User.legacy,
  };
};

export default connect(mapStateToProps)(HelloPage);
