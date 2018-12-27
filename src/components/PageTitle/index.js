import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    fontFamily: 'PT Sans',
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

class PageTitle extends Component {
  static propTypes = { title: PropTypes.string.isRequired };

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

export default PageTitle;
