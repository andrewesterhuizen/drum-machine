import React, { Component } from 'react';
import Loading from './Loading.js';
import Screen from './screen/Screen.js';
import VolumePanel from './mixer/VolumePanel.js';
import Fader from './mixer/Fader.js';
import StepPanel from './switches/StepPanel.js';
import Switch from './switches/Switch.js';

class Machine extends Component {
	render() {
		if(!this.props.loaded) {
			return (
				<Loading />
			)
		} else {
			return (
				<div className="Machine">
					<Screen />
					<VolumePanel />
					<Fader />
					<div className="controls-container">
						<Switch label={'START'} />
						<StepPanel drumController={this.props.drumController} beat={this.props.beat}/>
					</div>
				</div>
			)
		};
	}
}

export default Machine;
