import React, { useState, useEffect } from "react";

const IconButton = ({ icon, onClick, buttonClass }) => (
  <button className={buttonClass ? buttonClass : "controls__button"} onClick={onClick}>
    <i className={icon} />
  </button>
);

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

const Controls = ({
  togglePause,
  setBPM,
  resetAll,
  toggleRecording,
  recording,
  paused,
  bpm,
  selectedSample
}) => {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(1);
  const [filter, setFilter] = useState(10);
  const [drive, setDrive] = useState(10);

  useEffect(() => {
    setVolume(selectedSample.volume);
    setPitch(selectedSample.pitch);
    setFilter(selectedSample.filter);
    setDrive(selectedSample.drive);
  }, [selectedSample]);

  return (
    <section className="controls">
      <div className="controls__left">
        <IconButton
          icon="fa fa-circle"
          buttonClass={`controls__button${recording ? " controls__button--recording" : ""}`}
          onClick={toggleRecording}
        />
        <IconButton icon={paused ? "fa fa-play" : "fa fa-pause"} onClick={togglePause} />
        <div className="controls__tempo">
          <Adjuster
            min={10}
            max={250}
            increment={1}
            value={bpm}
            onChange={setBPM}
            display={`${bpm}`.padStart(3, 0)}
          />
        </div>
        <IconButton icon="fa fa-redo" onClick={resetAll} />
      </div>
      <div className="controls__right">
        <div className="controls__slider-container">
          Volume
          <Adjuster
            min={0}
            max={1}
            value={volume}
            increment={0.05}
            display={`${Math.floor(volume * 100)}`.padStart(3, 0)}
            onChange={v => {
              selectedSample.volume = v;
              setVolume(v);
            }}
          />
        </div>
        <div className="controls__slider-container">
          Pitch
          <Adjuster
            min={0}
            max={2}
            value={pitch}
            increment={0.1}
            display={`${Math.floor(pitch * 100)}`.padStart(3, 0)}
            onChange={v => {
              selectedSample.pitch = v;
              setPitch(v);
            }}
          />
        </div>
        <div className="controls__slider-container">
          Filter
          <Adjuster
            min={0}
            max={100}
            value={filter}
            increment={5}
            display={`${Math.floor(filter)}`.padStart(3, 0)}
            onChange={v => {
              selectedSample.filter = v;
              setFilter(v);
            }}
          />
        </div>
        <div className="controls__slider-container">
          Drive
          <Adjuster
            min={0}
            max={100}
            value={drive}
            increment={5}
            display={`${Math.floor(drive)}`.padStart(3, 0)}
            onChange={v => {
              selectedSample.drive = v;
              setDrive(v);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Controls;
