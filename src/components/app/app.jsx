import React from "react";
import {GreetingScreen} from "../greeting-screen/greeting-screen.jsx";

export const App = () => {
  // const {timeLimits, mistakesLimits} = props;

  return <GreetingScreen
    timeLimits = {7}
    mistakeLimits = {4}
  />;
};
