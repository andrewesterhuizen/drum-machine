import React from "react";

const StepRow = ({ beat }) => {
  const indicators = [];
  for (let i = 0; i < 16; i++) {
    indicators.push(
      <span
        className={i === beat ? "step-indicator step-indicator--active" : "step-indicator"}
        key={i}
      >
        {i + 1}
      </span>
    );
  }
  return (
    <div className="step-indicator-row">
      <span className="step-row__title" />
      <div className="step-row__steps">{indicators}</div>
    </div>
  );
};
export default StepRow;
