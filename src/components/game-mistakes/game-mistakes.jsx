import React from "react";
import PropTypes from "prop-types";

export const GameMistakes = (props) => {
  const {mistakes} = props;
  const noteSigns = [];

  for (let i = 0; i < mistakes; i++) {
    noteSigns.push(<div className="wrong" key={`mistakes-${i}`}/>);
  }

  return (
    <div className="game__mistakes">
      {noteSigns}
    </div>
  );
};

GameMistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
};
