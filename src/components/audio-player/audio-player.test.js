import React from "react";
import renderer from "react-test-renderer";
import {AudioPlayer} from "./audio-player.jsx";

it(`AudioPlayer correctly renders after relaunch`, () => {
  const createNodeMock = () => {
    return {
      oncanplaythrough
    };
  };
  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying={true}
          src={` `}
          onButtonClick={jest.fn()}
        />,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
