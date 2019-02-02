import React, { Component } from "react";

class StepButton extends Component {
  render() {
    const { drum, toggleStep, step } = this.props;
    return (
      <button
        className={
          drum.sequence[step] === 1
            ? "step-button step-button--active"
            : "step-button"
        }
        onClick={() => {
          toggleStep(drum.id, step);
        }}
      />
    );
  }
}

export default StepButton;
