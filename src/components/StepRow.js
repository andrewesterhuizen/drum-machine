import React from "react";

const StepRow = ({
  onStepClick,
  onTitleClick,
  onRandomiseClick,
  isPlaying,
  sequence,
  title,
  selected
}) => {
  const steps = [];
  for (let step = 0; step < 16; step++) {
    const cn = sequence[step] ? "step-button step-button--active" : "step-button";

    steps.push(
      <button key={`${title}-step-${step}`} className={cn} onClick={() => onStepClick(step)} />
    );
  }
  return (
    <div className={!selected ? `step-row` : `step-row step-row--selected`}>
      <span
        className={isPlaying ? "step-row__title step-row__title--playing" : "step-row__title"}
        onClick={onTitleClick}
      >
        {title}
      </span>
      <div className="step-row__steps">{steps}</div>
      <button className="step-row__button" onClick={onRandomiseClick}>
        <i className="fa fa-random" />
      </button>
    </div>
  );
};

export default StepRow;
