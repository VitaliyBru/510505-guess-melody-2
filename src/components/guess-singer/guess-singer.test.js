import React from "react";
import renderer from "react-test-renderer";
import {GuessSinger} from "./guess-singer.jsx";

it(`GuessSinger correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <GuessSinger
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
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
