const isSingerAnswerCorrect = (userAnswer, question) => userAnswer === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every(
    (it, i) => it === (question.answers[i].genre === question.genre)
);

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistakes: (userAnswer, question, mistakes, mistakesLimit) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isSingerAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakesLimit - mistakes < 1) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  setTimer: (timeLimits) => ({
    type: `SET_TIMER`,
    payload: timeLimits,
  }),

  decrementTime: (timeLeft) => {
    if (timeLeft > 1) {
      return {
        type: `SET_TIMER`,
        payload: timeLeft - 1,
      };
    }

    return {type: `RESET`};
  },

  reset: () => ({type: `RESET`}),
};

const initialState = {
  step: -1,
  mistakes: 0,
  time: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `SET_TIMER`: return Object.assign({}, state, {
      time: action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  isGenreAnswerCorrect,
  isSingerAnswerCorrect,
  reducer
};
