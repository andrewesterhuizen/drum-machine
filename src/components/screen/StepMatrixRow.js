import React, { Component } from 'react';
import './StepMatrixRow.css';

class StepMatrixRow extends Component {
    render() {
        return (
            <tr className="StepMatrixRow">
				<th>{this.props.drum.name}</th>
				{ this.props.drum.sequence.map( (step, i) => {
					return <td key={`step-matrix-cell-${i}`} className={step === 0 ? '' : 'cell-active'}></td>
				})}
            </tr>
        )
    }
}

export default StepMatrixRow;