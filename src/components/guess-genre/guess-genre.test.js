import React from "react";
import renderer from "react-test-renderer";
import {GuessGenre} from "./guess-genre.jsx";

it(`GuessGenre screen correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <GuessGenre
          questionId={0}
          genre={` `}
          answers={[
            {
              src: ` `,
              genre: ` `
            }
          ]}
          onAnswerClick={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
