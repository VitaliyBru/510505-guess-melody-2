import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {questions, gameSettings} from "./mocks/questions";

const init = () => {
  ReactDOM.render(
      <App
        timeLimits = {gameSettings.timeLimits}
        mistakesLimits = {gameSettings.mistakesLimits}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();
