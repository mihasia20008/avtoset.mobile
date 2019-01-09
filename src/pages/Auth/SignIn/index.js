import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import RegisterForm from '../../../containers/Form/Register';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class SignInPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }),
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignUp' })],
    });
    navigation.dispatch(resetAction);
  };

  handleRepeatPhone = data => {
    const { navigation } = this.props;
    navigation.navigate('SignUp', data);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            <PageTitle title="Регистрация" />
            <SignBlock>
              <RegisterForm
                onRepeatPhone={this.handleRepeatPhone}
                onGoToAuth={this.handleBackPress}
              />
            </SignBlock>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default SignInPage;
