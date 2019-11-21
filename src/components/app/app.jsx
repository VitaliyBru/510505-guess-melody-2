import {connect} from "react-redux";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";
import {GuessSinger} from "../guess-singer/guess-singer.jsx";
import {GuessGenre} from "../guess-genre/guess-genre.jsx";
import {ActionCreator} from "../../reducer.js";

const ONE_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

class App extends PureComponent {
  static getScreen(props) {
    const {
      step,
      timeLimits,
      mistakesLimits,
      onGreetingScreenClick
    } = props;

    if (step < 0) {
      return (
        <GreetingScreen
          timeLimits={timeLimits}
          mistakesLimits={mistakesLimits}
          onButtonClick={onGreetingScreenClick}
        />
      );
    }

    const currentQuestion = props.questions[step];
    const {
      timeLeft,
      mistakes,
      onUserAnswer,
    } = props;

    switch (currentQuestion.type) {
      case `artist`: return (
        <GuessSinger
          timeLeft={timeLeft}
          questionId = {step}
          song={currentQuestion.song}
          answers={currentQuestion.answers}
          mistakes={mistakes}
          onAnswerClick={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, mistakesLimits)}
        />
      );

      case `genre`: return (
        <GuessGenre
          timeLeft={timeLeft}
          questionId={step}
          genre={currentQuestion.genre}
          answers={currentQuestion.answers}
          mistakes={mistakes}
          onAnswerClick={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, mistakesLimits)}
        />
      );
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.timerIsRun = false;

    this._runOneSecTimer = this._runOneSecTimer.bind(this);
  }

  render() {
    return App.getScreen(this.props);
  }

  componentDidMount() {
    const {setTimer, timeLimits} = this.props;
    setTimer(timeLimits * SECONDS_IN_MINUTE);
  }

  componentDidUpdate() {
    const {step, setTimer, timeLimits} = this.props;
    if (step < 0) {
      this.timerIsRun = false;
      setTimer(timeLimits * SECONDS_IN_MINUTE);
    } else if (!this.timerIsRun) {
      this.timerIsRun = true;
      setTimeout(this._runOneSecTimer, ONE_SECOND);
    }
  }

  _runOneSecTimer() {
    const {timeLeft, decrementTimeByOneSec, step} = this.props;
    if (step >= 0) {
      decrementTimeByOneSec(timeLeft);
      setTimeout(this._runOneSecTimer, ONE_SECOND);
    }
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  timeLimits: PropTypes.number.isRequired,
  mistakesLimits: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGreetingScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  decrementTimeByOneSec: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  timeLeft: state.time,
});

const mapDispatchToProps = (dispatch) => ({
  onGreetingScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, mistakesLimit) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(userAnswer, question, mistakes, mistakesLimit));
  },

  setTimer: (timeLimits) => dispatch(ActionCreator.setTimer(timeLimits)),

  decrementTimeByOneSec: (timeLeft) => dispatch(ActionCreator.decrementTime(timeLeft)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
