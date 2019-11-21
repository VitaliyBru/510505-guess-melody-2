import React from "react";
import renderer from "react-test-renderer";
import {GuessSinger} from "./guess-singer.jsx";

it(`GuessSinger correctly renders after relaunch`, () => {
  const createNodeMock = () => {
    return {
      oncanplaythrough
    };
  };

  const tree = renderer
    .create(
        <GuessSinger
          mistakes={0}
          timeLeft={0}
          questionId={0}
          song={{
            src: ` `,
            artist: ` `
          }}
          answers={[
            {
              picture: ` `,
              artist: ` `
            }
          ]}
          onAnswerClick={
            jest.fn()
          }
        />,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
