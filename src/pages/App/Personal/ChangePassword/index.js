import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PageTitle from '../../../../components/PageTitle';
import SignBlock from '../../../../components/SignBlock';
import ChangePasswordForm from '../../../../containers/Form/ChangePassword';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class ChangePasswordPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }),
  };

  handleGoToProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  };

  handleSuccessChange = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile', {
      message: 'Пароль был успешно изменен!',
    });
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
        <PageTitle title="Сменить пароль" />
        <SignBlock>
          <ChangePasswordForm
            onGoToProfile={this.handleGoToProfile}
            onSuccessChange={this.handleSuccessChange}
          />
        </SignBlock>
      </KeyboardAwareScrollView>
    );
  }
}

export default ChangePasswordPage;
