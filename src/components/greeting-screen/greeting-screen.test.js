import React from "react";
import renderer from "react-test-renderer";
import {GreetingScreen} from "./greeting-screen.jsx";

it(`GreetingScreen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<GreetingScreen
      timeLimits={0}
      mistakesLimits={0}
      onButtonClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
