import React, { Component } from 'react';
import './App.css';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import DrumPart from '../scripts/DrumPart.js';
import Machine from './Machine.js';
import Loading from './Loading.js';

const sampleList = ['bd1', 'sd1', 'lt', 'mt', 'ht', 'rim', 'hcp', 'hhc', 'hho', 'ride'];

const loadDrumMachine = new Promise( resolve => {
	const drums = [];
	let newp5;
	const drumMachine = function(p) {
		p.preload = function() {
			p.soundFormats('wav');
			sampleList.forEach( (sample, i) => {
				p.loadSound(`/samples/${sample}.wav`,
					sound => drums.push(new DrumPart(sample, sound, i)));
			});
		};
		p.setup = function() {	
			p.noCanvas();
			resolve({
				machine: newp5,
				drums: drums
			});
		};
	};
	newp5 = new p5(drumMachine);
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			samplesLoaded: false,
			beat: 0,
			bpm: 100,
			paused: true
		};
	}
	toggleStep = (id, step) => {
		const drums = [...this.state.drums];
		const drum = drums[id];
		if(drum.sequence[step] === 0) {
			drum.sequence[step] = 1;
		} else {
			drum.sequence[step] = 0;
		}
		this.setState({
			drums: drums
		})
	}
	checkStep(beat) {
		this.state.drums.forEach( drum => { 
			if(drum.sequence[beat] === 1) {
				drum.sample.play();		
			}
		});
	}
	togglePause = () => {
		this.setState({
			paused: !this.state.paused
		});
	}
	increaseBPM = () => {
		this.setState({
			bpm: this.state.bpm + 1
		})
	}
	decreaseBPM = () => {
		this.setState({
			bpm: this.state.bpm - 1
		})
	}
	componentWillMount() {
		if(!this.state.samplesLoaded) {
			loadDrumMachine
			.then( response => {
				const machine = response.machine;
				const drums = response.drums;
				this.setState({
					drums, drums,
					samplesLoaded: true
				});
				machine.draw = () => {
					machine.frameRate(this.state.bpm / 2);
					if(!this.state.paused && machine.frameCount % 8 === 0) {
						this.setState({
							beat: this.state.beat + 1
						});
						if(this.state.beat > 15) {
							this.setState({
								beat: 0
							});	
						}	
						this.checkStep(this.state.beat);
					}	
				};
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
				<Machine drums={this.state.drums}
						 		 bpm={this.state.bpm}
								 increaseBPM={this.increaseBPM}
								 decreaseBPM={this.decreaseBPM}
								 togglePause={this.togglePause}
								 selectDrum={this.selectDrum}
								 toggleStep={this.toggleStep}
								 beat={this.state.beat} />
			)
		}
		
	}
}

export default App;

