import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';
import { connect } from 'react-redux';

class HomePage extends Component {
  static propTypes = { uri: PropTypes.string };

  static defaultProps = { uri: '' };

  render() {
    const { uri } = this.props;
    return <WebView source={{ uri }} />;
  }
}

const mapStateToProps = ({ User }) => {
  return {
    uri: User.externalLink,
  };
};

export default connect(mapStateToProps)(HomePage);
