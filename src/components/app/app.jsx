import {connect} from "react-redux";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";
import {GuessSinger} from "../guess-singer/guess-singer.jsx";
import {GuessGenre} from "../guess-genre/guess-genre.jsx";
import {FailTimeScreen} from "../fail-time-screen/fail-time-screen.jsx";
import {ActionCreator} from "../../reducer.js";

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
      setTimeLeft,
    } = props;

    if (!timeLeft) {
      return <FailTimeScreen/>;
    }

    switch (currentQuestion.type) {
      case `artist`: return (
        <GuessSinger
          timeLeft={timeLeft}
          questionId = {step}
          song={currentQuestion.song}
          answers={currentQuestion.answers}
          mistakes={mistakes}
          onAnswerClick={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, mistakesLimits)}
          setTimeLeft={setTimeLeft}
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
          setTimeLeft={setTimeLeft}
        />
      );
    }

    return null;
  }

  constructor(props) {
    super(props);
  }

  render() {
    return App.getScreen(this.props);
  }

  componentDidMount() {
    const {setTimeLeft, timeLimits} = this.props;
    setTimeLeft(timeLimits * SECONDS_IN_MINUTE);
  }

  componentDidUpdate() {
    const {step, setTimeLeft, timeLimits} = this.props;
    if (step < 0) {
      setTimeLeft(timeLimits * SECONDS_IN_MINUTE);
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
  setTimeLeft: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  timeLeft: state.timeLeft,
});

const mapDispatchToProps = (dispatch) => ({
  onGreetingScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, mistakesLimit) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(userAnswer, question, mistakes, mistakesLimit));
  },

  setTimeLeft: (timeLimits) => dispatch(ActionCreator.setTimeLeft(timeLimits)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
