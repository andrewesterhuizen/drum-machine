import React, { Component } from 'react';
import './App.css';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import DrumPart from '../scripts/DrumPart.js';
import Machine from './Machine.js';

const sampleList = ['bd1', 'bd2', 'sd1', 'sd2','lt', 'mt', 'ht', 'rim',
				 'cow', 'hcp', 'tamb', 'hhc', 'hho', 'crash', 'ride'];

// const drumController = {
// 	drums: [],
// 	beat: 0
// }



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
				drums: drums,
				machine: newp5
			});
		};
		
		// p.draw = function() {
		// 	if(p.frameCount % 8 === 0) {
		// 		drumController.beat++;	
		// 		if(drumController.beat > 15) {
		// 			drumController.beat = 0;
					
		// 		}	
		// 	}
		// };
	};
	newp5 = new p5(drumMachine);
});



class App extends Component {
	constructor() {
		super();
		this.state = {
			samplesLoaded: false,
			beat: 0,
			drums: null
		};
	}
	componentWillMount() {
		if(!this.state.samplesLoaded) {
			loadDrumMachine
			.then( response => {
				const drums = response.drums;
				const machine = response.machine;
				this.setState({
					samplesLoaded: true,
					drums: drums
				});
				machine.draw = () => {
					if(machine.frameCount % 8 === 0) {
						this.setState({
							beat: this.state.beat + 1
						})
						if(this.state.beat > 15) {
							this.setState({
								beat: 0
							})	
						}	
					}
				};
			})
		}
	}
	render() {
		return (
			<Machine loaded={this.state.samplesLoaded} drums={this.state.drums} beat={this.state.beat}/>
		)
	}
}

export default App;

