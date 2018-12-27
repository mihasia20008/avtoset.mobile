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
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

class PersonalPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }),
  };

  handleLogoutPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <PageTitle title="Личный кабинет" />
        <SignBlock>
          <Text style={{ textAlign: 'center' }}>Скоро тут будет личный кабинет пользователя</Text>
          <View style={styles.content}>
            <Button text="Выход" onPress={this.handleLogoutPress} />
            <Button isEmpty text="Назад" onPress={this.handleBackPress} />
          </View>
        </SignBlock>
      </View>
    );
  }
}

export default PersonalPage;
