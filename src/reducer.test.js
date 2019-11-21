import {
  ActionCreator,
  isGenreAnswerCorrect,
  isSingerAnswerCorrect,
  reducer
} from "./reducer.js";

describe(`isGenreAnswerCorrect OK`, () => {
  it(`isGenreAnswerCorrect can detect correct answer`, () => {
    expect(isGenreAnswerCorrect(
        [false, true, false, true],
        {
          "type": `genre`,
          "genre": `correct`,
          "answers": [
            {
              "src": ` `,
              "genre": `incorrect`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            },
            {
              "src": ` `,
              "genre": `incorrect`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            }
          ]
        }
    )).toEqual(true);
  });
  it(`isGenreAnswerCorrect can detect incorrect answer`, () => {
    expect(isGenreAnswerCorrect(
        [false, true, true, true],
        {
          "type": `genre`,
          "genre": `correct`,
          "answers": [
            {
              "src": ` `,
              "genre": `incorrect`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            },
            {
              "src": ` `,
              "genre": `incorrect`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            }
          ]
        }
    )).toEqual(false);
  });
});

describe(`isSingerAnswerCorrect OK`, () => {
  it(`isGenreAnswerCorrect can detect correct answer`, () => {
    expect(isSingerAnswerCorrect(
        `correct`,
        {
          "type": `artist`,
          "song": {
            "artist": `correct`,
            "src": ` `,
          },
          "answers": [
            {
              "picture": ` `,
              "artist": `incorrect`,
            },
            {
              "picture": ` `,
              "artist": `correct`,
            },
            {
              "picture": ` `,
              "artist": `incorrect-1`,
            },
          ]
        }
    )).toEqual(true);
  });
  it(`isGenreAnswerCorrect can detect incorrect answer`, () => {
    expect(isSingerAnswerCorrect(
        `incorrect`,
        {
          "type": `artist`,
          "song": {
            "artist": `correct`,
            "src": ` `,
          },
          "answers": [
            {
              "picture": ` `,
              "artist": `incorrect`,
            },
            {
              "picture": ` `,
              "artist": `correct`,
            },
            {
              "picture": ` `,
              "artist": `incorrect-1`,
            },
          ]
        }
    )).toEqual(false);
  });
});

describe(`ActionCreator OK`, () => {
  it(`incrementStep return correct value`, () => {
    expect(ActionCreator.incrementStep())
      .toEqual({
        type: `INCREMENT_STEP`,
        payload: 1,
      });
  });
  it(`incrementMistakes (correct artist question)`, () => {
    expect(ActionCreator.incrementMistakes(
        `correct`,
        {
          "type": `artist`,
          "song": {
            "artist": `correct`,
            "src": ` `,
          },
          "answers": [
            {
              "picture": ` `,
              "artist": `incorrect`,
            },
            {
              "picture": ` `,
              "artist": `correct`,
            },
            {
              "picture": ` `,
              "artist": `incorrect-1`,
            },
          ]
        },
        0,
        1
    )).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });
  it(`incrementMistakes (incorrect artist question)`, () => {
    expect(ActionCreator.incrementMistakes(
        `incorrect`,
        {
          "type": `artist`,
          "song": {
            "artist": `correct`,
            "src": ` `,
          },
          "answers": [
            {
              "picture": ` `,
              "artist": `incorrect`,
            },
            {
              "picture": ` `,
              "artist": `correct`,
            },
            {
              "picture": ` `,
              "artist": `incorrect-1`,
            },
          ]
        },
        0,
        1
    )).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });
  it(`incrementMistakes (correct genre question)`, () => {
    expect(ActionCreator.incrementMistakes(
        [false, true, false, true],
        {
          "type": `genre`,
          "genre": `correct`,
          "answers": [
            {
              "src": ` `,
              "genre": `incorrect-1`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            },
            {
              "src": ` `,
              "genre": `incorrect-2`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            }
          ]
        },
        0,
        1))
      .toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 0,
      });
  });
  it(`incrementMistakes (incorrect genre question)`, () => {
    expect(ActionCreator.incrementMistakes(
        [false, false, false, true],
        {
          "type": `genre`,
          "genre": `correct`,
          "answers": [
            {
              "src": ` `,
              "genre": `incorrect-1`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            },
            {
              "src": ` `,
              "genre": `incorrect-2`,
            },
            {
              "src": ` `,
              "genre": `correct`,
            }
          ]
        },
        0,
        1))
      .toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1,
      });
  });
  it(`incrementMistakes (incorrect answer above limit mistakes)`, () => {
    expect(ActionCreator.incrementMistakes(
        `incorrect`,
        {
          "type": `artist`,
          "song": {
            "artist": `correct`,
            "src": ` `,
          },
          "answers": [
            {
              "picture": ` `,
              "artist": `incorrect`,
            },
            {
              "picture": ` `,
              "artist": `correct`,
            },
            {
              "picture": ` `,
              "artist": `incorrect-1`,
            },
          ]
        },
        0,
        0
    )).toEqual({
      type: `RESET`
    });
  });
  it(`setTimer OK`, () => {
    expect(ActionCreator.setTimer(5)).toEqual({
      type: `SET_TIMER`,
      payload: 5,
    });
  });
  it(`decrementTime OK`, () => {
    expect(ActionCreator.decrementTime(20)).toEqual({
      type: `SET_TIMER`,
      payload: 19,
    });
  });
  it(`decrementTime when time runs out OK`, () => {
    expect(ActionCreator.decrementTime(0))
      .toEqual({type: `RESET`});
  });
  it(`reset return correct value`, () => {
    expect(ActionCreator.reset())
      .toEqual({type: `RESET`});
  });
});

describe(`reducer OK`, () => {
  it(`increment step by 1`, () => {
    expect(reducer(
        undefined,
        {
          type: `INCREMENT_STEP`,
          payload: 1,
        }))
      .toEqual({
        step: 0,
        mistakes: 0,
        time: 0,
      });
  });
  it(`increment mistakes by 0`, () => {
    expect(reducer(
        undefined,
        {
          type: `INCREMENT_MISTAKES`,
          payload: 0,
        }))
      .toEqual({
        step: -1,
        mistakes: 0,
        time: 0,
      });
  });
  it(`increment mistakes by 1`, () => {
    expect(reducer(
        undefined,
        {
          type: `INCREMENT_MISTAKES`,
          payload: 1,
        }))
      .toEqual({
        step: -1,
        mistakes: 1,
        time: 0,
      });
  });
  it(`set timer instant correct value`, () => {
    expect(reducer(
        undefined,
        {
          type: `SET_TIMER`,
          payload: 300,
        }))
      .toEqual({
        step: -1,
        mistakes: 0,
        time: 300,
      });
  });
  it(`reset correct`, () => {
    expect(reducer(
        {
          step: 500,
          mistakes: 500
        },
        {
          type: `RESET`,
          payload: 10000,
        }))
      .toEqual({
        step: -1,
        mistakes: 0,
        time: 0,
      });
  });
});
