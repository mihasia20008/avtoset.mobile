import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import Button from '../../../components/Button';

import AuthForm from '../../../containers/Form/Auth';

import { checkNetwork } from '../../../services/utilities';
import { resetAuthData } from '../../../redux/user/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  registerContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SignUpPage extends Component {
  static propTypes = {
    needUpdate: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.needUpdate && this.props.needUpdate) {
      const { navigation } = this.props;
      navigation.navigate('ProposUpdate');
    }
  }

  handleGoToApp = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  handleGoToRegister = async () => {
    const { navigation, dispatch } = this.props;
    dispatch(resetAuthData());
    const hasNetwork = await checkNetwork();

    if (hasNetwork) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'SignUp' }),
          NavigationActions.navigate({ routeName: 'SignIn' }),
        ],
      });
      navigation.dispatch(resetAction);
    } else {
      navigation.navigate('Offline', {
        backPath: 'SignUp',
        retryPath: 'SignIn',
      });
    }
  };

  handleGoToRestorePassword = async () => {
    const { navigation, dispatch } = this.props;
    dispatch(resetAuthData());
    const hasNetwork = await checkNetwork();

    if (hasNetwork) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'SignUp' }),
          NavigationActions.navigate({ routeName: 'RestorePassword' }),
        ],
      });
      navigation.dispatch(resetAction);
    } else {
      navigation.navigate('Offline', {
        backPath: 'SignUp',
        retryPath: 'RestorePassword',
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const phone = navigation.getParam('phone');
    const message = navigation.getParam('message');

    return (
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        // eslint-disable-next-line prettier/prettier
      >
        <PageTitle title="Авторизация" />
        <SignBlock title="Я - участник клуба «Автосеть»">
          <AuthForm
            defaultPhone={phone}
            infoMessage={message}
            onSuccessSubmit={this.handleGoToApp}
            onGoToRestorePassword={this.handleGoToRestorePassword}
          />
        </SignBlock>
        <SignBlock title="Я - новый пользователь">
          <View style={styles.registerContainer}>
            <Button isEmpty text="Зарегистироваться" onPress={this.handleGoToRegister} />
          </View>
        </SignBlock>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ CheckVersion }) => {
  return {
    needUpdate: CheckVersion.needUpdate,
  };
};

export default connect(mapStateToProps)(SignUpPage);
