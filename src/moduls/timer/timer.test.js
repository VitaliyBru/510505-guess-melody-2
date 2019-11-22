import {TimeController} from "./time-controller.js";

it(`timeController OK`, () => {
  const timeLeft = 2;
  const mockFn = jest.fn();
  const timeController = new TimeController(timeLeft, mockFn);
  const time = timeController.runStep();
  expect(time).toEqual(timeLeft - 1);
  expect(mockFn).toHaveBeenCalledTimes(0);
  timeController.runStep();
  expect(mockFn).toHaveBeenCalledTimes(1);
});
