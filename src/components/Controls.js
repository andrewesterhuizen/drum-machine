import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
	render() {
		const { togglePause, increaseBPM, decreaseBPM, randomiseAll, resetAll, toggleRecording, recording, paused } = this.props;
		return (
			<div className="controls">
				<button className={recording ? "controls__button controls__button--recording" : "controls__button"} onClick={toggleRecording}>
					<i className="fa fa-circle"></i>
				</button>
				{paused ?
					<button className="controls__button" onClick={togglePause}>
						<i className={paused ? "fa fa-play" : "fa fa-pause"}></i>
					</button> : 
					<button className="controls__button" onClick={togglePause}>
						<i className="fa fa-pause"></i>
					</button>
				}
				<div className="controls__tempo">
					<button className="controls__button" onClick={decreaseBPM}>
						<i className="fa fa-minus"></i>
					</button>
					<span className="controls__bpm">{this.props.bpm}</span>
					<button className="controls__button" onClick={increaseBPM}>
						<i className="fa fa-plus"></i>
					</button>
				</div>
				<button className="controls__button" onClick={resetAll}>
					<i className="fa fa-redo"></i>
				</button>
			</div>
		)
	}
}

export default Controls;
