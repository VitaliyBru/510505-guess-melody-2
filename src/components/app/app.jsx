import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";
import {GuessSinger} from "../guess-singer/guess-singer.jsx";
import {GuessGenre} from "../guess-genre/guess-genre.jsx";

export class App extends PureComponent {
  static getScreen(props, questionId, onAnswer) {
    if (questionId < 0) {
      return <GreetingScreen
        timeLimits={props.timeLimits}
        mistakesLimits={props.mistakesLimits}
        onButtonClick={onAnswer}
      />;
    }

    const currentQuestion = props.questions[questionId];

    switch (currentQuestion.type) {
      case `artist`: return <GuessSinger
        questionId = {questionId}
        song={currentQuestion.song}
        answers={currentQuestion.answers}
        onAnswerClick={onAnswer}
      />;

      case `genre`: return <GuessGenre
        questionId={questionId}
        genre={currentQuestion.genre}
        answers={currentQuestion.answers}
        onAnswerClick={onAnswer}
      />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      currentQuestionId: -1,
    };

    this._handlerUserAnswer = this._handlerUserAnswer.bind(this);
  }

  render() {
    const {currentQuestionId} = this.state;

    return App.getScreen(
        this.props,
        currentQuestionId,
        this._handlerUserAnswer
    );
  }

  _handlerUserAnswer() {
    this.setState((state, {questions: {length}}) => {
      const nextQuestionId = state.currentQuestionId + 1;
      return {currentQuestionId: length > nextQuestionId ? nextQuestionId : -1};
    });
  }
}

App.propTypes = {
  timeLimits: PropTypes.number.isRequired,
  mistakesLimits: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired
};
