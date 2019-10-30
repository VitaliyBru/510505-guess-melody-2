import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const gameSettings = {
    timeLimits: 5,
    mistakesLimits: 3,
  };

  ReactDOM.render(
      <App
        timeLimits = {gameSettings.timeLimits}
        mistakesLimits = {gameSettings.mistakesLimits}
      />,
      document.querySelector(`#root`)
  );
};

init();
