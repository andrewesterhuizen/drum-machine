import React from "react";

const Controls = ({ togglePause, setBPM, resetAll, toggleRecording, recording, paused, bpm }) => {
  return (
    <div className="controls">
      <button
        className={recording ? "controls__button controls__button--recording" : "controls__button"}
        onClick={toggleRecording}
      >
        <i className="fa fa-circle" />
      </button>
      {paused ? (
        <button className="controls__button" onClick={togglePause}>
          <i className={paused ? "fa fa-play" : "fa fa-pause"} />
        </button>
      ) : (
        <button className="controls__button" onClick={togglePause}>
          <i className="fa fa-pause" />
        </button>
      )}
      <div className="controls__tempo">
        <button className="controls__button" onClick={() => setBPM(bpm - 1)}>
          <i className="fa fa-minus" />
        </button>
        <span className="controls__bpm">{bpm}</span>
        <button className="controls__button" onClick={() => setBPM(bpm + 1)}>
          <i className="fa fa-plus" />
        </button>
      </div>
      <button className="controls__button" onClick={resetAll}>
        <i className="fa fa-redo" />
      </button>
    </div>
  );
};

export default Controls;
