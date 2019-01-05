import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import Button from '../../../components/Button';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  content: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const pageText =
  'Если Вы забыли пароль, введите номер телефона. \nНовый пароль будет выслан Вам в SMS.';

class RestorePasswordPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
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

  render() {
    return (
      <View style={styles.container}>
        <PageTitle title="Восстановление пароля" />
        <SignBlock content={pageText}>
          <Text style={{ textAlign: 'center' }}>
            Скоро тут будет страница восстановления пароля
          </Text>
          <View style={styles.content}>
            <Button text="Восстановить" onPress={this.handleBackPress} />
            <Button isShadow text="Назад" onPress={this.handleBackPress} />
          </View>
        </SignBlock>
      </View>
    );
  }
}

export default RestorePasswordPage;
