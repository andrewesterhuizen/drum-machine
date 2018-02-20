import React, { Component } from 'react';
import StepRow from './StepRow.js'
import StepIndicatorRow from './StepIndicatorRow.js'
import Controls from './Controls.js'

class Machine extends Component {
	render() {
		const { drums, beat, bpm, togglePause, increaseBPM, decreaseBPM, randomiseAll, resetAll, toggleRecording, recording } = this.props;
		return (
			<div className="drum-machine">
				{ drums.map( drum => <StepRow drum={drum} key={drum.name} toggleStep={this.props.toggleStep} />)}
				<StepIndicatorRow beat={beat}/>
				<Controls bpm={bpm}
								  togglePause={togglePause}
								  increaseBPM={increaseBPM}
								  decreaseBPM={decreaseBPM}
									randomiseAll={randomiseAll}
									resetAll={resetAll}
									toggleRecording={toggleRecording}
									recording={recording}
								/>
			</div>
		)
	}
}

export default Machine;
