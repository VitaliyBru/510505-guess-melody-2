import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AudioPlayer} from "./audio-player";

Enzyme.configure({adapter: new Adapter()});

it(`AudioPlayer button click`, () => {
  let isPlaying = true;
  const mockFn = jest.fn(() => {
    isPlaying = !isPlaying;
  });
  jest.spyOn(window.HTMLMediaElement.prototype, `play`).mockImplementation(() => {});

  const audioPlayer = mount(
      <AudioPlayer
        isPlaying={isPlaying}
        src={` `}
        onButtonClick={mockFn}
      />
  );

  const playButton = audioPlayer.find(`.track__button`);
  playButton.simulate(`click`);

  expect(mockFn).toHaveBeenCalledTimes(0);

  audioPlayer.setState({isLoading: false});
  audioPlayer.update();

  playButton.simulate(`click`);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(isPlaying).toEqual(false);

  playButton.simulate(`click`);

  expect(isPlaying).toEqual(true);
});
