import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import moment from 'moment';

moment.locale('ru');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  date: {
    marginRight: 10,
    fontFamily: 'PT Sans',
    fontSize: 22,
  },
  time: {
    fontFamily: 'PT Sans',
    fontWeight: '700',
    fontSize: 22,
  },
});

class TimeBlock extends Component {
  state = {
    data: moment().format('DD.MM.YYYY HH:mm.ss'),
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      data: moment().format('DD.MM.YYYY HH:mm.ss'),
    });
  }

  render() {
    const { data } = this.state;
    const [date, time] = data.split(' ');

    return (
      <View style={styles.container}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    );
  }
}

export default TimeBlock;
