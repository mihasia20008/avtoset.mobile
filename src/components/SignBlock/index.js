import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleWrap: {
    paddingBottom: 13,
    borderBottomWidth: 2,
    borderBottomColor: '#0071bb',
  },
  titleText: {
    fontFamily: 'PT Sans',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    color: '#888',
  },
  hr: {
    borderBottomWidth: 4,
    borderBottomColor: '#0071bb',
  },
  contentWrap: {},
  contentText: {},
  formWrap: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class SignBlock extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    title: '',
    content: '',
  };

  renderTitle() {
    const { title } = this.props;

    if (title) {
      return (
        <View style={styles.titleWrap}>
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      );
    }

    return <View style={styles.hr} />;
  }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        {this.renderTitle()}
        <View style={styles.formWrap}>{children}</View>
      </View>
    );
  }
}

export default SignBlock;
