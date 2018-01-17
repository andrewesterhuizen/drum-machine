import React, { Component } from 'react';
import './App.css';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import DrumPart from '../scripts/DrumPart.js';
import Machine from './Machine.js';
import Loading from './Loading.js';

const sampleList = ['bd1', 'bd2', 'sd1', 'sd2','lt', 'mt', 'ht', 'rim',
				 'cow', 'hcp', 'tamb', 'hhc', 'hho', 'crash', 'ride'];

const loadDrumMachine = new Promise( resolve => {
	const drums = [];
	let newp5;
	const drumMachine = function(p) {
		p.preload = function() {
			p.soundFormats('wav');
			sampleList.forEach( sample => {
				p.loadSound(`/samples/${sample}.wav`,
					sound => drums.push(new DrumPart(sample, sound)));
			});
		};
		p.setup = function() {	
			p.noCanvas();
			p.frameRate(60);
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
			paused: true
		};
		this.togglePause = this.togglePause.bind(this);
		this.selectDrum = this.selectDrum.bind(this);
		this.toggleStep = this.toggleStep.bind(this);
	}
	selectDrum(i) {
		this.setState({
			selected: this.state.drums[i]
		})
		
	}
	toggleStep(i) {
		let selected = this.state.selected;
		if(selected.sequence[i] === 0) {
			selected.sequence[i] = 1;
		} else {
			selected.sequence[i] = 0;
		}
		this.setState({
			selected: selected
		});

	}
	checkStep(beat) {
		this.state.drums.forEach( drum => { 
			if(drum.sequence[beat] === 1) {
				drum.sample.play();		
			}
		});
	}
	togglePause() {
		this.setState({
			paused: !this.state.paused
		});
	}
	componentWillMount() {
		if(!this.state.samplesLoaded) {
			loadDrumMachine
			.then( response => {
				const machine = response.machine;
				const drums = response.drums;
				this.setState({
					drums: drums,
					selected: drums[0],
					samplesLoaded: true
				});
				machine.draw = () => {
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
						 togglePause={this.togglePause}
						 selectDrum={this.selectDrum}
						 toggleStep={this.toggleStep}
						 beat={this.state.beat}
						 selected={this.state.selected} />
			)
		}
		
	}
}

export default App;

