import React, { Component } from 'react';
import Screen from './screen/Screen.js';
import VolumePanel from './mixer/VolumePanel.js';
import StepPanel from './switches/StepPanel.js';
import Switch from './switches/Switch.js';

class Machine extends Component {
	render() {
		return (
			<div className="Machine">
				<Screen drums={this.props.drums}/>
				<VolumePanel drums={this.props.drums}/>
				<div className="controls-container">
					<Switch label={'START'} handleClick={this.props.togglePause} />
					<StepPanel drums={this.props.drums} selected={this.props.selected} toggleStep={this.props.toggleStep} selectDrum={this.props.selectDrum} beat={this.props.beat} />
				</div>
			</div>
		)
	}
}

export default Machine;
