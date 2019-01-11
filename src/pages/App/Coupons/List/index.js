import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import PageTitle from '../../../../components/PageTitle';
import CouponCard from '../../../../components/CouponCard';

import { fetchCouponsList, selectCoupon } from '../../../../redux/coupons/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrap: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  emptyListContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    justifyContent: 'center',
  },
  emptyListText: {
    fontFamily: 'PT Sans',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrolledList: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class CouponsList extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    list: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { id, dispatch } = this.props;
    dispatch(fetchCouponsList(id));
  }

  handleCouponClick = index => {
    const { navigation, dispatch } = this.props;
    dispatch(selectCoupon(index));
    navigation.navigate('CouponPage');
  };

  renderCouponsList() {
    const { list } = this.props;

    if (list.length === 0) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>К сожалению, нет действующих предложений.</Text>
          <Text style={styles.emptyListText}>
            В настоящий момент для Вас нет действующих предложений. Зайдите позже.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrolledList}>
        {list.map((item, index) => (
          <CouponCard
            key={item.barcode}
            index={index}
            name={item.name}
            image={item.image_url}
            dateFrom={item.date_start}
            dateTo={item.date_finish}
            discount={item.offer}
            isActive={item.active}
            onClick={this.handleCouponClick}
          />
        ))}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <PageTitle title="Персональные предложения" />
        </View>
        {this.renderCouponsList()}
      </View>
    );
  }
}

const mapStateToProps = ({ User, Coupons }) => {
  return {
    id: User.userData.id,
    list: Coupons.list,
  };
};

export default connect(mapStateToProps)(CouponsList);
