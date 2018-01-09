import React, { Component } from 'react';
import loadDrumMachine from '../scripts/p5DrumMachine.js';
import './App.css';
import Loading from './Loading.js';
import Screen from './screen/Screen.js';
import VolumePanel from './mixer/VolumePanel.js';
import Fader from './mixer/Fader.js';
import StepPanel from './switches/StepPanel.js';
import Switch from './switches/Switch.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			samplesLoaded: false,
		};
	}
	componentWillMount() {
		if(!this.state.samplesLoaded) {
			loadDrumMachine.then( controller => {
				this.setState({
					drums: controller.drums,
					samplesLoaded: true
				});
			});
		}

	}
	render() {
		if(!this.state.samplesLoaded) {
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
						<StepPanel drums={this.state.drums} />
					</div>
				</div>
			)};
	}
}

export default App;
