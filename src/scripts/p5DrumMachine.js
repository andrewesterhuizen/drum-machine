import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import DrumPart from './DrumPart.js';

const sampleList = ['bd1', 'bd2', 'sd1', 'sd2','lt', 'mt', 'ht', 'rim',
				 'cow', 'hcp', 'tamb', 'hhc', 'hho', 'crash', 'ride'];

function drumMachineLoader(  ) {
	const drums = [];
	let beat = 0;
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
		};
		
		p.draw = function() {
			if(p.frameCount % 8 === 0) {
				beat++;	
				if(beat > 15) {
					beat = 0;
					
				}	
			}
		};
	};

	new p5(drumMachine);

	return {
		drums: drums,
		beat: beat
	}
}
		
	

export default drumMachineLoader;