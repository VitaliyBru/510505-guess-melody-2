import React from "react";
import renderer from "react-test-renderer";
import {TimerValue} from "./timer-value.jsx";

it(`TimerValue renderer OK`, () => {
  const tree = renderer
    .create(
        <TimerValue
          timeLeft={0}
          onTimeRunOut={() => {}}
          setTimeLeft={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
