import React from "react";

// components
import StepButton from "./StepButton.js";

const StepRow = ({ drum, toggleStep, randomise }) => {
  const steps = [];
  for (let i = 0; i < 16; i++) {
    steps.push(
      <StepButton
        drum={drum}
        step={i}
        toggleStep={toggleStep}
        key={`${drum.name}-step-${i}`}
      />
    );
  }
  return (
    <div className="step-row">
      <span
        className={
          drum.isPlaying()
            ? "step-row__title step-row__title--playing"
            : "step-row__title"
        }
      >
        {`${drum.control}: ${drum.name}`}
      </span>
      <div className="step-row__steps">{steps}</div>
      <button
        className="step-row__button"
        onClick={() => {
          randomise(drum.id);
        }}
      >
        <i className="fa fa-random" />
      </button>
    </div>
  );
};

export default StepRow;
