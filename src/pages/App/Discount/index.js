import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import PageTitle from '../../../components/PageTitle';
import InfoBlock from '../../../components/InfoBlock';
import TimeBlock from '../../../components/TimeBlock';
import BarcodeBlock from '../../../components/BarcodeBlock';
import CallingBlock from '../../../components/CallingBlock';

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
  };

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
    card: User.card,
    phone: User.callCenterPhone,
  };
};

export default connect(mapStateToProps)(DiscountPage);
