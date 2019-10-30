import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <App
          timeLimits={0}
          mistakesLimits={0}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
