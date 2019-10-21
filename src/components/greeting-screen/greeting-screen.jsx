import React from "react";

export const GreetingScreen = (props) => {
  const {timeLimits, mistakesLimits} = props;

  return <section className="welcome">
    <div className="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
    <button className="welcome__button"><span className="visually-hidden">Начать игру</span></button>
    <h2 className="welcome__rules-title">Правила игры</h2>
    <p className="welcome__text">Правила просты:</p>
    <ul className="welcome__rules-list">
      <li>За {timeLimits} минут нужно ответить на все вопросы.</li>
      <li>Можно допустить {mistakesLimits} ошибки.</li>
    </ul>
    <p className="welcome__text">Удачи!</p>
  </section>;
};