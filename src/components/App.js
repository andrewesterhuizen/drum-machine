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
				sound => drums.push(new DrumPart(sample, sound)));
			});
		};
		p.setup = function() {
			p.frameRate(50);
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
			bpm: 120,
			paused: true,
			recording: false
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
	getRandomSequence = () => {
		const randomSequence = [];

		for( let i = 0; i < 16; i++) {
			randomSequence[i] = Math.random() > 0.3 ? 0 : 1;
		}

		return randomSequence;
	}
	randomise = id => {
		const drums = [...this.state.drums];
		drums[id].sequence = this.getRandomSequence();
		this.setState({
			drums: drums
		})
	}
	resetAll = () => {
		const drums = [...this.state.drums];
		drums.forEach( drum => {
			drum.sequence.fill(0);
		})
		this.setState({
			drums: drums
		})
	}
	toggleRecording = () => {
		this.setState({
			recording: !this.state.recording
		})
	}
	recordStep = drumId => {
		if(!this.state.paused && this.state.recording) {
			const drums = [...this.state.drums];
			drums[drumId].sequence[this.state.beat] = 1;
			this.setState({
				drums: drums
			})
		}
	}
	componentWillMount() {
		if(!this.state.samplesLoaded) {
			loadDrumMachine
			.then( response => {
				const machine = response.machine;
				const drums = response.drums;
				drums.map( (drum, i) => drum.id = i)
				this.setState({
					drums: drums,
					samplesLoaded: true
				});

				// copied this timing system from stackoverflow
				let then = Date.now();
				let now, elapsed, interval;
				machine.draw = () => {
					// 16th notes
					interval = 1000 / this.state.bpm * 60 / 4;

					now = Date.now();
					elapsed = now - then;

					if(elapsed > interval) {
						then = now - (elapsed % interval);

						if(!this.state.paused) {
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
					}
				};
			});
		}
		document.addEventListener('keydown', e => {
			const drums = this.state.drums;
			e.preventDefault();

			switch(e.key) {
				case ' ':
					this.togglePause();
					break;
				case 'q':
					drums[0].sample.play();
					this.recordStep(0);
					break;
				case 'w':
					drums[1].sample.play();
					this.recordStep(1);
					break;
				case 'e':
					drums[2].sample.play();
					this.recordStep(2);
					break;
				case 'r':
					drums[3].sample.play();
					this.recordStep(3);
					break;
				case 't':
					drums[4].sample.play();
					this.recordStep(4);
					break;
				case 'y':
					drums[5].sample.play();
					this.recordStep(5);
					break;
				case 'u':
					drums[6].sample.play();
					this.recordStep(6);
					break;
				case 'i':
					drums[7].sample.play();
					this.recordStep(7);
					break;
				case 'o':
					drums[8].sample.play();
					this.recordStep(8);
					break;
				case 'p':
					drums[9].sample.play();
					this.recordStep(9);
					break;
			}
		})
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
								 paused={this.state.paused}
								 increaseBPM={this.increaseBPM}
								 decreaseBPM={this.decreaseBPM}
								 togglePause={this.togglePause}
								 randomise={this.randomise}
								 toggleRecording={this.toggleRecording}
								 recording={this.state.recording}
								 resetAll={this.resetAll}
								 selectDrum={this.selectDrum}
								 toggleStep={this.toggleStep}
								 beat={this.state.beat} />
			)
		}
		
	}
}

export default App;

