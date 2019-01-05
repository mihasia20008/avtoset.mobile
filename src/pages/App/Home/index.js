import { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { connect } from 'react-redux';

class HomePage extends Component {
  static propTypes = {
    uri: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = { uri: '' };

  componentDidMount() {
    const { uri } = this.props;
    Linking.canOpenURL(uri).then(supported => {
      if (supported) {
        Linking.openURL(uri);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Произошла ошибка при попытке открыть следующую страницу: ${uri}`);
      }
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ User }) => {
  return {
    uri: User.externalLink,
  };
};

export default connect(mapStateToProps)(HomePage);
