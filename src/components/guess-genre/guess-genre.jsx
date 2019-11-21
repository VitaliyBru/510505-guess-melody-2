import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AudioPlayer} from "../audio-player/audio-player.jsx";
import {GameMistakes} from "../game-mistakes/game-mistakes.jsx";
import {TimerValue} from "../timer-value/timer-value.jsx";

export class GuessGenre extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activePlayer: 0};

    this._handlerSubmit = this._handlerSubmit.bind(this);
  }

  render() {
    const {timeLeft, questionId, genre, mistakes, answers} = this.props;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
          </svg>

          <TimerValue timeLeft={timeLeft}/>

          <GameMistakes mistakes={mistakes}/>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={this._handlerSubmit}>
            {
              answers.map((it, i) => {
                return (
                  <div className="track" key={`${questionId}-${i}`}>
                    <AudioPlayer
                      isPlaying={this.state.activePlayer === i}
                      src={it.src}
                      onButtonClick={() => {
                        this.setState({activePlayer: this.state.activePlayer === i ? -1 : i});
                      }}
                    />
                    <div className="game__answer">
                      <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`}/>
                      <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                    </div>
                  </div>
                );
              })
            }
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }

  _handlerSubmit(evt) {
    evt.preventDefault();
    const answersCheckedList = Array.from(evt.currentTarget.elements.answer).map((it) => it.checked);
    this.props.onAnswerClick(answersCheckedList);
  }
}

GuessGenre.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  genre: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  })).isRequired,
  mistakes: PropTypes.number.isRequired,
  onAnswerClick: PropTypes.func.isRequired
};
