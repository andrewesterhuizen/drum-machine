import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import DrumPart from './DrumPart.js';

const sampleList = ['bd1', 'bd2', 'sd1', 'sd2','lt', 'mt', 'ht', 'rim',
				 'cow', 'hcp', 'tamb', 'hhc', 'hho', 'crash', 'ride'];
const drums = [];

const drumMachine = function(p) {
	p.preload = function() {
		p.soundFormats('wav');
		sampleList.forEach( sample => {
			p.loadSound(`/samples/${sample}.wav`,
				sound => drums.push(new DrumPart(sample, sound)));
		});
	}
	p.setup = function() {	
		p.noCanvas();
		console.log(drums)
	}
	
	p.draw = function() {

	}
  };
  
const myp5 = new p5(drumMachine);

class MachineController {

}

export default new MachineController();