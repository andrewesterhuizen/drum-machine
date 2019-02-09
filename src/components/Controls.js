import React, { useState, useEffect } from "react";
import Rotary from "./Rotary";
import Adjuster from "./Adjuster";

const IconButton = ({ icon, onClick, buttonClass }) => (
  <button className={buttonClass ? buttonClass : "controls__button"} onClick={onClick}>
    <i className={icon} />
  </button>
);

const Controls = ({
  togglePause,
  setBPM,
  resetAll,
  toggleRecording,
  recording,
  paused,
  bpm,
  selectedSample,
  onRandomiseClick
}) => {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(1);
  const [filter, setFilter] = useState(1000);
  const [drive, setDrive] = useState(1);

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
        <div className="controls__rotary-container">
          Volume
          <Rotary
            limit={0.9}
            value={volume}
            onChange={v => {
              selectedSample.volume = v;
              setVolume(v);
            }}
          />
        </div>
        <div className="controls__rotary-container">
          Pitch
          <Rotary
            startOffest={-0.25}
            value={pitch / 2}
            onChange={v => {
              selectedSample.pitch = v * 2;
              setPitch(v * 2);
            }}
          />
        </div>
        <div className="controls__rotary-container">
          Filter
          <Rotary
            limit={0.9}
            value={filter / 12000}
            onChange={v => {
              selectedSample.filter = v * 12000;
              setFilter(v * 12000);
            }}
          />
        </div>
        <div className="controls__rotary-container">
          Drive
          <Rotary
            limit={0.9}
            value={drive}
            onChange={v => {
              selectedSample.drive = v;
              setDrive(v);
            }}
          />
        </div>
        <button className="controls__button controls__shuffle-button" onClick={onRandomiseClick}>
          <i className="fa fa-random" />
        </button>
      </div>
    </section>
  );
};

export default Controls;
