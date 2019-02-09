import React from "react";

const Adjuster = ({ value, min, max, increment, onChange, display }) => {
  const handleChange = nextVal => {
    nextVal = Math.round(nextVal * 100) / 100;

    if (nextVal < min) nextVal = min;
    if (nextVal > max) nextVal = max;

    onChange(nextVal);
  };
  return (
    <div>
      <button className="controls__button" onClick={() => handleChange(value - increment)}>
        <i className="fa fa-minus" />
      </button>
      <span className="controls__bpm">{display}</span>
      <button className="controls__button" onClick={() => handleChange(value + increment)}>
        <i className="fa fa-plus" />
      </button>
    </div>
  );
};

export default Adjuster;
