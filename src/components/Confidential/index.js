import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text, Linking } from 'react-native';

import Icon from './blocks/Icon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bababa',
  },
  iconWrapError: {
    borderColor: '#ff0000',
  },
  iconActive: {
    display: 'flex',
  },
  iconNotActive: {
    display: 'none',
  },
  content: {
    paddingLeft: 15,
  },
  text: {
    color: '#000',
    fontFamily: 'PT Sans',
    fontSize: 18,
  },
  textError: {
    color: '#ff0000',
  },
  link: {
    color: '#0567bf',
  },
});

class Confidential extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    editable: PropTypes.bool,
    onToggleStatus: PropTypes.func.isRequired,
  };

  static defaultProps = { editable: true };

  handleAgreeWithConfidential = () => {
    const { editable, onToggleStatus } = this.props;
    if (editable) {
      onToggleStatus();
    }
  };

  handleRedirect = () => {
    Linking.canOpenURL('https://avtoset.su/privacy/').then(supported => {
      if (supported) {
        Linking.openURL('https://avtoset.su/privacy/');
      } else {
        // eslint-disable-next-line no-alert
        alert(
          `Произошла ошибка при попытке открыть следующую страницу: https://avtoset.su/privacy/`,
        );
      }
    });
  };

  render() {
    const { checked, error } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.handleAgreeWithConfidential}>
        <View style={[styles.iconWrap, error ? styles.iconWrapError : '']}>
          <Icon style={checked ? styles.iconActive : styles.iconNotActive} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.text, error ? styles.textError : '']}>Я согласен на</Text>
          <TouchableOpacity onPress={this.handleRedirect}>
            <Text style={[styles.text, styles.link]}>обработку персональных данных</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Confidential;
