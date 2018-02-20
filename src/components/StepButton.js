import React, { Component } from 'react';
import './StepButton.css';

class StepButton extends Component {
	render() {
		const { drum, toggleStep, step } = this.props;
		return (
			<button className={drum.sequence[step] === 1 ? "step-button step-button--active" : "step-button"}
							onClick={() => { toggleStep(drum.id, step); }}>
			</button>
		)
	}
}

export default StepButton;

/* <Indicator active={this.props.active ? 'active' : ''} /> */
/* <Switch label={this.props.label} selectDrum={this.props.selectDrum} handleClick={this.props.handleClick}/> */