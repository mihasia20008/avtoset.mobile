import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

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
    justifyContent: 'center',
    marginTop: 20,
  },
});

class SignInPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }),
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <PageTitle title="Регистрация" />
        <SignBlock>
          <Text style={{ textAlign: 'center' }}>Скоро тут будет страница регистарции</Text>
          <View style={styles.content}>
            <Button isEmpty text="Назад" onPress={this.handleBackPress} />
          </View>
        </SignBlock>
      </View>
    );
  }
}

export default SignInPage;
