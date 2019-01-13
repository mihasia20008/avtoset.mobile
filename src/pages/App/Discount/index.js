import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import PageTitle from '../../../components/PageTitle';
import InfoBlock from '../../../components/InfoBlock';
import TimeBlock from '../../../components/TimeBlock';
import BarcodeBlock from '../../../components/BarcodeBlock';
import CallingBlock from '../../../components/CallingBlock';

import { checkNetwork } from '../../../services/utilities';
import { updateData } from '../../../redux/user/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class DiscountPage extends Component {
  static propTypes = {
    card: PropTypes.string.isRequired,
    phone: PropTypes.string,
    navigation: PropTypes.shape({
      addListener: PropTypes.func.isRequired,
    }),
  };

  willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
    const hasNetwork = await checkNetwork();
    if (hasNetwork) {
      const { id, dispatch } = this.props;
      dispatch(updateData(id));
    }
  });

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    const { card, phone } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
          <PageTitle title="Клубная карта" />
          <InfoBlock />
          <TimeBlock />
          <BarcodeBlock number={card} />
          <CallingBlock phone={phone} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    id: User.userData.id,
    card: User.userData.card,
    phone: User.userData.region.callCenterPhone,
  };
};

export default connect(mapStateToProps)(DiscountPage);
