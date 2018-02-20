import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
	render() {
		const { togglePause, increaseBPM, decreaseBPM, randomiseAll, resetAll, toggleRecording, recording } = this.props;
		return (
			<div className="controls">
				<button className={recording ? "controls__button controls__button--recording" : "controls__button"} onClick={toggleRecording}>Record Mode</button>
				<button className="controls__button" onClick={togglePause}>play / pause</button>
				<button className="controls__button" onClick={decreaseBPM}>-</button>
				<span className="controls__bpm">{this.props.bpm}</span>
				<button className="controls__button" onClick={increaseBPM}>+</button>
				<button className="controls__button" onClick={randomiseAll}>Randomise</button>
				<button className="controls__button" onClick={resetAll}>Reset</button>
			</div>
		)
	}
}

export default Controls;
