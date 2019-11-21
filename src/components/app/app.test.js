import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <App
          onUserAnswer={() => {}}
          onGreetingScreenClick={() => {}}
          decrementTimeByOneSec={() => {}}
          setTimer={() => {}}
          timeLeft={0}
          step={-1}
          mistakes={0}
          timeLimits={0}
          mistakesLimits={0}
          questions={[
            {
              type: `artist`,
              song: {
                artist: `  `,
                src: ` `
              },
              answers: [
                {
                  picture: ` `,
                  genre: ` `
                }
              ]
            },
            {
              type: `genre`,
              genre: ` `,
              answers: [
                {
                  src: ` `,
                  genre: ` `
                }
              ]
            }
          ]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
