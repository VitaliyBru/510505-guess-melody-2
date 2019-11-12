import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GuessSinger} from "./guess-singer.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`GuessSinger change event`, () => {
  const answerHandler = jest.fn();
  const preventDefault = jest.fn();
  const testValue = `test`;

  const guessSinger = shallow(
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
        onAnswerClick={answerHandler}
      />
  );

  guessSinger.find(`.game__artist`).simulate(`change`, {preventDefault, target: {value: testValue}});
  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(answerHandler).toHaveBeenCalledTimes(1);
  expect(answerHandler).toHaveBeenCalledWith(testValue);
});
