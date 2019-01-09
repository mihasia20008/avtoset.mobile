import { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  static propTypes = {
    startTime: PropTypes.number,
    onTimerStop: PropTypes.func.isRequired,
  };

  static defaultProps = {
    startTime: 60,
  };

  state = { time: this.props.startTime };

  componentDidMount() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.handleTik(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTik = () => {
    const { time } = this.state;

    if (time) {
      this.setState({ time: time - 1 });
      return;
    }

    const { onTimerStop } = this.props;
    clearInterval(this.timer);
    onTimerStop();
  };

  render() {
    const { time } = this.state;
    return time;
  }
}

export default Timer;
