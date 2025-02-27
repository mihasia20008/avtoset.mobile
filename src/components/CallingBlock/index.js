import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import call from 'react-native-phone-call';

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#0567bf',
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    fontFamily: 'PT Sans',
    fontSize: 17,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: '50%',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#fff',
    transform: [{ translateY: -25 }],
  },
  iconWrap: {
    position: 'absolute',
    right: 15,
    top: '50%',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#cce2f2',
  },
  iconInner: {
    position: 'absolute',
    right: 15,
    top: '50%',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0567bf',
    transform: [{ translateY: -25 }],
    shadowColor: '#0567bf',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 30,
    height: 30,
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

class CallingBlock extends Component {
  static propTypes = { phone: PropTypes.string };

  static defaultProps = { phone: '' };

  state = {
    animatedValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.runAnimation();
  }

  componentWillUnmount() {
    const { animatedValue } = this.state;
    Animated.timing(animatedValue).stop();
  }

  runAnimation = () => {
    const { animatedValue } = this.state;
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
    }).start(() => setTimeout(() => this.runAnimation(), 800));
  };

  handleRequestForCall = () => {
    const { phone } = this.props;
    call({
      number: phone,
      prompt: false,
      // eslint-disable-next-line no-console
    }).catch(err => console.error(err));
  };

  render() {
    const { phone } = this.props;
    const { animatedValue } = this.state;

    if (!phone || phone.length < 11) {
      return null;
    }

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.6],
    });
    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [1, 1, 0],
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handleRequestForCall}>
          <Text style={styles.text}>Есть вопросы? Звоните!</Text>
          <View style={styles.iconContainer}>
            <Animated.View
              style={{
                ...styles.iconWrap,
                opacity,
                transform: [{ translateY: -25 }, { scaleX: scale }, { scaleY: scale }],
              }}
            />
            <View style={styles.iconInner} />
            <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 30">
              <Path
                fill="#FFFFFF"
                fillRule="evenodd"
                // eslint-disable-next-line max-len
                d="M21.872 19.905c-.947-.968-2.13-.968-3.072 0-.718.737-1.256.974-1.962 1.723-.193.206-.356.25-.59.112-.466-.262-.96-.474-1.408-.76-2.082-1.356-3.827-3.098-5.372-5.058-.767-.974-1.45-2.017-1.926-3.19-.096-.238-.078-.394.11-.587.717-.718.96-.98 1.665-1.717.984-1.024.984-2.223-.006-3.253-.56-.586-1.103-1.397-1.56-2.034-.458-.636-.817-1.392-1.403-1.985C5.4 2.2 4.217 2.2 3.275 3.16 2.55 3.9 1.855 4.654 1.12 5.378.438 6.045.093 6.863.02 7.817c-.114 1.556.255 3.023.774 4.453 1.062 2.96 2.68 5.587 4.642 7.997 2.65 3.26 5.813 5.837 9.513 7.698 1.665.836 3.39 1.48 5.268 1.585 1.292.075 2.415-.262 3.314-1.304.616-.712 1.31-1.36 1.962-2.042.966-1.01.972-2.235.012-3.234-1.147-1.192-2.48-1.88-3.634-3.065zm-.49-5.36l.268-.047c.583-.103.953-.707.79-1.295-.465-1.676-1.332-3.193-2.537-4.445-1.288-1.33-2.857-2.254-4.59-2.708-.574-.15-1.148.248-1.23.855l-.038.28c-.07.522.253 1.01.747 1.142 1.326.355 2.53 1.064 3.517 2.086.926.958 1.59 2.125 1.952 3.412.14.5.624.807 1.12.72zm2.56-9.85C21.618 2.292 18.74.69 15.56.02c-.56-.117-1.1.283-1.178.868l-.038.28c-.073.537.272 1.04.786 1.15 2.74.584 5.218 1.968 7.217 4.03 1.885 1.95 3.19 4.36 3.803 7.012.122.53.617.873 1.136.78l.265-.046c.57-.1.934-.678.8-1.26-.71-3.08-2.223-5.873-4.41-8.14z"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CallingBlock;
