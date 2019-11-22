import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TimerValue} from "./timer-value.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`TimerValue show correct data`, () => {
  const timerValue = shallow(
      <TimerValue
        timeLeft={74}
        setTimeLeft={() => {}}
        onTimeRunOut={() => {}}
      />
  );

  expect(timerValue.find(`.timer__mins`).text()).toEqual(`01`);
  expect(timerValue.find(`.timer__secs`).text()).toEqual(`14`);
});
