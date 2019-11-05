import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GreetingScreen} from "./greeting-screen";

Enzyme.configure({adapter: new Adapter()});

it(`GreetingScreen «play button» 1 click detected`, () => {
  const clickHandler = jest.fn();

  const greetingScreen = shallow(
      <GreetingScreen
        timeLimits={0}
        mistakesLimits={0}
        onButtonClick={clickHandler}
      />
  );

  const startButton = greetingScreen.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
