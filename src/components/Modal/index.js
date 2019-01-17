import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg';
import Path from 'react-native-svg/elements/Path';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleWrap: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'PT Sans',
    fontSize: 22,
    fontWeight: '700',
  },
  textWrap: {
    marginBottom: 15,
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 18,
  },
  closeAction: {
    position: 'absolute',
    top: -20,
    right: -10,
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeActionIcon: {
    width: '50%',
    height: '50%',
  },
});

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    preventUserClose: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    text: '',
    preventUserClose: false,
  };

  render() {
    const { title, text, onClose } = this.props;
    const paragraphs = text.split('\n');
    const paragraphsLength = paragraphs.length - 1;

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.content}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{title}</Text>
            </View>
            {paragraphs.map((paragraph, index) => (
              <View key={paragraph} style={index !== paragraphsLength ? styles.textWrap : ''}>
                <Text style={styles.text}>{paragraph}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.closeAction} onPress={onClose}>
              <Svg
                style={styles.closeActionIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                // eslint-disable-next-line prettier/prettier
              >
                <Path
                  fill="#F44336"
                  // eslint-disable-next-line max-len
                  d="M28.9 31.8L0.6 60.1c-0.8 0.8-0.8 2.1 0 2.8 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6l28.5-28.5 28.5 28.5c0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.8-0.8 0.8-2.1 0-2.8L35.1 31.8 63.4 3.4c0.8-0.8 0.8-2.1 0-2.8 -0.8-0.8-2.1-0.8-2.8 0L32 29.2 3.4 0.6c-0.8-0.8-2.1-0.8-2.8 0 -0.8 0.8-0.8 2.1 0 2.8L28.9 31.8z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Modal;
