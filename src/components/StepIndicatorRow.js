import React, { Component } from 'react';

// css 
import './StepIndicatorRow.css';

// components 

class StepRow extends Component {
	render() {
		const { beat } = this.props;
		const indicators = [];
		for( let i = 0; i < 16; i++) {
			indicators.push(<span className={i === beat ? "step-indicator step-indicator--active" : "step-indicator"} key={i}>{i+1}</span>)
		}
		return (
			<div className="step-indicator-row">
					{indicators}    
			</div>
		)
	}
}

export default StepRow;