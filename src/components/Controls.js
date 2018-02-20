import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
	render() {
		const { togglePause, increaseBPM, decreaseBPM } = this.props;
		return (
			<div className="controls">
				<button className="controls__button" onClick={togglePause}>play / pause</button>
				<button className="controls__button" onClick={decreaseBPM}>-</button>
				<span className="controls__bpm">{this.props.bpm}</span>
				<button className="controls__button" onClick={increaseBPM}>+</button>
			</div>
		)
	}
}

export default Controls;
