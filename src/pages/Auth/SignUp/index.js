import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import PageTitle from '../../../components/PageTitle';
import SignBlock from '../../../components/SignBlock';
import Button from '../../../components/Button';

const styles = StyleSheet.create({
  container: {
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
      navigate: PropTypes.func.isRequired,
    }),
  };

  handleGoToDiscount = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  handleGoToRegister = () => {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  };

  render() {
    return (
      <View style={styles.container}>
        <PageTitle title="Авторизация" />
        <SignBlock title="Я - участник клуба «Автосеть»">
          <View style={styles.registerContainer}>
            <Button text="Авторизоваться" onPress={this.handleGoToDiscount} />
          </View>
        </SignBlock>
        <SignBlock title="Я - новый пользователь">
          <View style={styles.registerContainer}>
            <Button isEmpty text="Зарегистироваться" onPress={this.handleGoToRegister} />
          </View>
        </SignBlock>
      </View>
    );
  }
}

export default SignUpPage;
