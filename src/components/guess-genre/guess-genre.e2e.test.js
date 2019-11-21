import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GuessGenre} from "./guess-genre.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`GuessGenre form submit correct`, () => {
  const preventDefault = jest.fn();
  const submitHandler = jest.fn();
  const testArrey = [false, true];

  const guessGenre = shallow(
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
        onAnswerClick={submitHandler}
      />
  );

  guessGenre.find(`.game__tracks`)
    .simulate(
        `submit`,
        {
          preventDefault,
          currentTarget: {
            elements: {
              answer: [
                {
                  checked: testArrey[0]
                },
                {
                  checked: testArrey[1]
                }
              ]
            }
          }
        });

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(submitHandler).toHaveBeenCalledTimes(1);
  expect(submitHandler).toHaveBeenCalledWith(testArrey);
});
