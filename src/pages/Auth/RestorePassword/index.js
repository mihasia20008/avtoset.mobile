import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import RestorePasswordForm from '../../../containers/Form/RestorePassword';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const pageText =
  'Если Вы забыли пароль, введите номер телефона. \nНовый пароль будет выслан Вам в SMS.';

class RestorePasswordPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
  };

  handleSuccessRestore = data => {
    const { navigation } = this.props;
    navigation.navigate('SignUp', data);
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignUp' })],
    });
    navigation.dispatch(resetAction);
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
        <PageTitle title="Восстановление пароля" />
        <SignBlock content={pageText}>
          <RestorePasswordForm
            onGoToAuth={this.handleBackPress}
            onSuccessRestore={this.handleSuccessRestore}
          />
        </SignBlock>
      </KeyboardAwareScrollView>
    );
  }
}

export default RestorePasswordPage;
