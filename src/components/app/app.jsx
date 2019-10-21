import React from "react";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";

export const App = (props) => {
  const {timeLimits, mistakesLimits} = props;

  return <GreetingScreen
    timeLimits = {timeLimits}
    mistakeLimits = {mistakesLimits}
  />;
};