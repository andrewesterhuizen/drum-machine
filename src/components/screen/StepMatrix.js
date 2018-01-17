import React, { Component } from 'react';
import './StepMatrix.css';
import StepMatrixRow from './StepMatrixRow.js';

class StepMatrix extends Component {
    render() {
		const stepHeaders = [];
		for(let i = 0; i <= 16; i++) {
			stepHeaders.push(<td key={`step-header-${i}`}>{i === 0 ? 'STEP' : i}</td>)
		}
        return (
            <table className="StepMatrix">
				<thead>
					<tr>
						{ stepHeaders }
					</tr>
				</thead>
				<tbody>
					{ this.props.drums.map( (drum, i) => <StepMatrixRow drum={drum} key={`step-matrix-row-${i}`}/>) }
				</tbody>
            </table>
        )
    }
}

export default StepMatrix;