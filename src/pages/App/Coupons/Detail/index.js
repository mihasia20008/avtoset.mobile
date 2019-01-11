import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import PageTitle from '../../../../components/PageTitle';
import InfoBlock from '../../../../components/InfoBlock';
import BarcodeBlock from '../../../../components/BarcodeBlock';

import { closeSelectCoupon } from '../../../../redux/coupons/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  wrap: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  content: {
    marginBottom: 30,
    flexDirection: 'row',
    minHeight: 115,
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  image: {
    flex: 1,
    width: '85%',
    height: '85%',
  },
  nameWrap: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    width: '65%',
  },
  nameText: {
    fontFamily: 'PT Sans',
    fontSize: 22,
    fontWeight: '700',
  },
  discountWrap: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 30,
    width: '50%',
    height: 40,
    backgroundColor: '#c14e45',
  },
  discountText: {
    color: '#fff',
    fontFamily: 'PT Sans',
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'center',
  },
});

class CouponDetail extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    barcode: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(closeSelectCoupon());
  }

  render() {
    const { name, barcode, discount, image } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrap} contentContainerStyle={{ flexGrow: 1 }}>
          <PageTitle title="Персональные предложения" />
          <InfoBlock />
          <View style={styles.content}>
            <View style={styles.imageWrap}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: `http://avtoset.local${image}` }}
              />
            </View>
            <View style={styles.nameWrap}>
              <Text style={styles.nameText}>{name}</Text>
            </View>
          </View>
          <View style={styles.discountWrap}>
            <Text style={styles.discountText} numberOfLines={1} ellipsizeMode="tail">
              {discount}
            </Text>
          </View>
          <BarcodeBlock number={barcode} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Coupons }) => {
  const item = Coupons.list[Coupons.active];
  return {
    barcode: item.barcode,
    discount: item.offer,
    name: item.name,
    image: item.image_url,
  };
};

export default connect(mapStateToProps)(CouponDetail);
