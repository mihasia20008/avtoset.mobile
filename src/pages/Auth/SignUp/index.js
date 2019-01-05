import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import Button from '../../../components/Button';

import AuthForm from '../../../containers/Form/Auth';

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
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  };

  handleGoToApp = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  handleGoToRegister = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    });
    navigation.dispatch(resetAction);
  };

  handleGoToRestorePassword = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'RestorePassword' })],
    });
    navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
          accessible={false}
          // eslint-disable-next-line prettier/prettier
        >
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            // eslint-disable-next-line prettier/prettier
          >
            <PageTitle title="Авторизация" />
            <SignBlock title="Я - участник клуба «Автосеть»">
              <AuthForm
                onSuccessSubmit={this.handleGoToApp}
                onGoToRestorePassword={this.handleGoToRestorePassword}
              />
            </SignBlock>
            <SignBlock title="Я - новый пользователь">
              <View style={styles.registerContainer}>
                <Button isEmpty text="Зарегистироваться" onPress={this.handleGoToRegister} />
              </View>
            </SignBlock>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpPage;
