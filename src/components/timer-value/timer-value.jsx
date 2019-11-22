import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TimeController} from "../../moduls/timer/time-controller.js";

const SEC_IN_MIN = 60;
const ONE_SECOND = 1000;

export class TimerValue extends PureComponent {
  constructor(props) {
    super(props);

    this.timerId = null;

    this._getTimeLeft = this._getTimeLeft.bind(this);
  }

  render() {
    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{this._getTimeLeft(`min`)}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{this._getTimeLeft(`sec`)}</span>
      </div>
    );
  }

  componentDidMount() {
    const {timeLeft, setTimeLeft, onTimeRunOut} = this.props;

    const timeController = new TimeController(timeLeft, onTimeRunOut);
    let time = 0;
    const doOneSecondStep = () => {
      time = timeController.runStep();
      setTimeLeft(time);
      if (time) {
        this.timerId = setTimeout(doOneSecondStep, ONE_SECOND);
      } else {
        this.timerId = null;
      }
    };

    this.timerId = setTimeout(doOneSecondStep, ONE_SECOND);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  _getTimeLeft(type) {
    const {timeLeft} = this.props;
    let result = 0;

    if (type === `min`) {
      result = Math.floor(timeLeft / SEC_IN_MIN);
    } else if (type === `sec`) {
      result = timeLeft % SEC_IN_MIN;
    }

    return result < 10 ? (`0` + result) : (`` + result);
  }
}

TimerValue.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  setTimeLeft: PropTypes.func.isRequired,
  onTimeRunOut: PropTypes.func.isRequired,
};
