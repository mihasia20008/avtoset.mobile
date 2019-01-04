import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { dateFormatter } from '../../services/utilities';

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    minHeight: Dimensions.get('window').height * 0.25,
  },
  breakLine: {
    position: 'absolute',
    bottom: 0,
    left: -15,
    right: -15,
    borderBottomColor: '#888a8c',
    borderBottomWidth: 1,
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    paddingBottom: 30,
    borderColor: '#888a8c',
    borderWidth: 1,
  },
  image: {
    flex: 1,
    width: '85%',
    height: '85%',
  },
  discountWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 30,
    justifyContent: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#c14e45',
  },
  disabledDiscountWrap: {
    backgroundColor: '#bababa',
  },
  discountText: {
    color: '#fff',
    fontFamily: 'PT Sans',
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    width: '65%',
  },
  name: {
    marginBottom: 15,
    fontFamily: 'PT Sans',
    fontSize: 20,
    fontWeight: '700',
  },
  disableName: {
    color: '#bababa',
  },
  period: {
    fontFamily: 'PT Sans',
    fontSize: 20,
    fontStyle: 'italic',
  },
  disablePeriod: {
    color: '#bababa',
  },
});

class CouponCard extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleCouponClick = () => {
    const { index, isActive, onClick } = this.props;
    if (isActive) {
      onClick(index);
    }
  };

  render() {
    const { name, image, dateFrom, dateTo, discount, isActive } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.handleCouponClick}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: `http://avtoset.local${image}` }}
          />
          <View style={[styles.discountWrap, isActive ? '' : styles.disabledDiscountWrap]}>
            <Text style={styles.discountText} numberOfLines={1} ellipsizeMode="tail">
              {discount}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={[styles.name, isActive ? '' : styles.disableName]}>{name}</Text>
          <Text style={[styles.period, isActive ? '' : styles.disablePeriod]}>
            Действует {'\n'}с {dateFormatter(dateFrom)} по {dateFormatter(dateTo)}
          </Text>
        </View>
        <View style={styles.breakLine} />
      </TouchableOpacity>
    );
  }
}

export default CouponCard;
