import {createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {questions, gameSettings} from "./mocks/questions";
import {reducer} from "./reducer.js";


const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          timeLimits = {gameSettings.timeLimits}
          mistakesLimits = {gameSettings.mistakesLimits}
          questions={questions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
