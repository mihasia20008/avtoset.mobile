import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import { closeSelectCoupon } from '../../redux/coupons/actions';

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
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinner: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
  },
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isFetching: PropTypes.bool,
    needBack: PropTypes.bool,
    externalLink: PropTypes.string,
    logo: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  handleBackButtonPress = () => {
    const { dispatch } = this.props;
    dispatch(closeSelectCoupon());
  };

  render() {
    const { children, isFetching, externalLink, logo, needBack } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header
            link={externalLink}
            logoSrc={logo}
            hasBackIcon={needBack}
            onBackPress={this.handleBackButtonPress}
          />
          <View style={styles.content}>{children}</View>
        </View>
        {isFetching ? (
          <View style={styles.overlay}>
            <View style={styles.spinner}>
              <Spinner />
            </View>
          </View>
        ) : null}
        <View style={styles.fixBackground} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { User, Coupons } = state;
  return {
    isFetching: Object.keys(state).some(key => state[key].isFetching),
    externalLink: User.userData.region.domain,
    logo: User.userData.region.logo,
    needBack: Coupons.active !== -1,
  };
};

export default connect(mapStateToProps)(Layout);
