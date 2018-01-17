import React, { Component } from 'react';
import './StepMatrixRow.css';

class StepMatrixRow extends Component {
    render() {
        return (
            <tr className="StepMatrixRow">
				<th>{this.props.drum.name}</th>
				{ this.props.drum.sequence.map( (step, i) => {
					return <td key={`step-matrix-cell-${i}`}>{step}</td>
				})}
            </tr>
        )
    }
}

export default StepMatrixRow;