import React, { Component } from "react";

// css
import "./StepRow.css";

// components
import StepButton from "./StepButton.js";

class StepRow extends Component {
  render() {
    const { drum, toggleStep, randomise } = this.props;
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
            drum.sample.isPlaying()
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
  }
}

export default StepRow;
