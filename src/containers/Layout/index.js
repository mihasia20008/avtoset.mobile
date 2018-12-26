import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  fixBackground: {
    backgroundColor: '#0065BF',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  },
  content: {
    paddingTop: 70,
    flex: 1,
  },
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    externalLink: PropTypes.string,
  };

  render() {
    const { children, externalLink } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header link={externalLink} />
          <View style={styles.content}>{children}</View>
        </View>
        <View style={styles.fixBackground} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    externalLink: User.externalLink,
  };
};

export default connect(mapStateToProps)(Layout);
