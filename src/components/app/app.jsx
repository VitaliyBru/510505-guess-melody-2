import React from "react";
import PropTypes from "prop-types";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";

export const App = (props) => {
  const {timeLimits, mistakesLimits} = props;

  return <GreetingScreen
    timeLimits = {timeLimits}
    mistakeLimits = {mistakesLimits}
  />;
};

App.propTypes = {
  timeLimits: PropTypes.number.isRequired,
  mistakesLimits: PropTypes.number.isRequired,
};
