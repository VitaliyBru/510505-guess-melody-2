import React from "react";
import renderer from "react-test-renderer";
import {GuessGenre} from "./guess-genre.jsx";

it(`GuessGenre screen correctly renders after relaunch`, () => {
  const createNodeMock = () => {
    return {
      oncanplaythrough
    };
  };

  const tree = renderer
    .create(
        <GuessGenre
          mistakes={0}
          timeLeft={0}
          questionId={0}
          genre={` `}
          answers={[
            {
              src: ` `,
              genre: ` `
            }
          ]}
          onAnswerClick={jest.fn()}
        />,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
