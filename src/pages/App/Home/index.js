import { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { connect } from 'react-redux';

class HomePage extends Component {
  static propTypes = {
    uri: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = { uri: '' };

  willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
    const { uri, navigation } = this.props;
    const supported = await Linking.canOpenURL(uri);
    if (supported) {
      Linking.openURL(uri);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Произошла ошибка при попытке открыть следующую страницу: ${uri}`);
    }
    const backPath = navigation.getParam('backPath');
    if (backPath) {
      navigation.navigate(backPath);
    }
  });

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ User }) => {
  return {
    uri: User.userData.region.domain,
  };
};

export default connect(mapStateToProps)(HomePage);
