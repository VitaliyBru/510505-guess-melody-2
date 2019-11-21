import React from "react";
import renderer from "react-test-renderer";
import {TimerValue} from "./timer-value.jsx";

it(`TimerValue renderer OK`, () => {
  const tree = renderer
    .create(
        <TimerValue timeLeft={0}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
