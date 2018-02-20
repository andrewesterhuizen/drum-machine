import React, { Component } from 'react';
// import Screen from './screen/Screen.js';
// import VolumePanel from './mixer/VolumePanel.js';
// import StepPanel from './switches/StepPanel.js';
import Switch from './switches/Switch.js';
import StepRow from './StepRow.js'
import StepIndicatorRow from './StepIndicatorRow.js'

class Machine extends Component {
	render() {
		const { drums, beat } = this.props;
		return (
			<div className="drum-machine">
				{/* <Screen drums={this.props.drums}/> */}
				{/* <VolumePanel drums={this.props.drums}/> */}
					<Switch label={'START'} handleClick={this.props.togglePause} />
					{/* <StepPanel drums={this.props.drums} selected={this.props.selected} toggleStep={this.props.toggleStep} selectDrum={this.props.selectDrum} beat={this.props.beat} /> */}
					{ drums.map( drum => <StepRow drum={drum} key={drum.name} toggleStep={this.props.toggleStep} /> )}
					<StepIndicatorRow beat={beat}/>
			</div>
		)
	}
}

export default Machine;
