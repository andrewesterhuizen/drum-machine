import React, { Component } from 'react';
import StepRow from './StepRow.js'
import StepIndicatorRow from './StepIndicatorRow.js'
import Controls from './Controls.js'

class Machine extends Component {
	render() {
		const { drums, beat, paused, bpm, togglePause, increaseBPM, decreaseBPM, randomise, resetAll, toggleRecording, recording } = this.props;
		return (
			<div className="drum-machine">
				{ drums.map( drum => <StepRow drum={drum} key={drum.name} toggleStep={this.props.toggleStep} randomise={randomise}/>)}
				<StepIndicatorRow beat={beat}/>
				<Controls bpm={bpm}
									togglePause={togglePause}
									paused={paused}
								  increaseBPM={increaseBPM}
								  decreaseBPM={decreaseBPM}
									resetAll={resetAll}
									toggleRecording={toggleRecording}
									recording={recording}
								/>
			</div>
		)
	}
}

export default Machine;
