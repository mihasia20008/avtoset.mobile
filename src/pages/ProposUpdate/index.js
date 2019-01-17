import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from './blocks/Icon';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconWrap: {
    maxHeight: 200,
    width: Dimensions.get('window').width * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  textWrap: {
    marginBottom: 30,
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  lastButtonWrap: {
    marginTop: 'auto',
  },
});

class ProposUpdatePage extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      addListener: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
    }),
  };

  state = {
    openModal: false,
    textObject: {
      message: '',
      title: '',
      text: '',
      links: {
        android: '',
        ios: '',
      },
    },
  };

  willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
    const jsonTextObject = await AsyncStorage.getItem('proposUpdateTexts');
    const textObject = await JSON.parse(jsonTextObject);

    this.setState({ textObject: { ...textObject } });
  });

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleInstallUpdate = async () => {
    const {
      textObject: { links },
    } = this.state;
    const uri = Platform.OS === 'android' ? links.android : links.ios;
    const supported = await Linking.canOpenURL(uri);
    if (supported) {
      Linking.openURL(uri);
    }
  };

  handleInstallLater = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  handleOpenModal = () => this.setState({ openModal: true });

  handleCloseModal = () => this.setState({ openModal: false });

  renderModal() {
    const { openModal, textObject } = this.state;

    if (openModal) {
      return (
        <Modal
          title={textObject.title}
          text={textObject.text}
          onClose={this.handleCloseModal}
          preventUserClose
        />
      );
    }

    return null;
  }

  render() {
    const { textObject } = this.state;
    const { isAuth } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
          <PageTitle title="Доступна новая версия" />
          <View style={styles.iconWrap}>
            <Icon />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.text}>{textObject.message}</Text>
          </View>
          <View style={styles.buttonWrap}>
            <Button big text="Установить обновление" onPress={this.handleInstallUpdate} />
          </View>
          {isAuth ? (
            <View style={styles.buttonWrap}>
              <Button isShadow text="Обновить позже" onPress={this.handleInstallLater} />
            </View>
          ) : null}
          <View style={[styles.buttonWrap, styles.lastButtonWrap]}>
            <Button isShadow text="Зачем обновлять приложение?" onPress={this.handleOpenModal} />
          </View>
        </ScrollView>
        {this.renderModal()}
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    isAuth: User.result.isAuth,
  };
};

export default connect(mapStateToProps)(ProposUpdatePage);
