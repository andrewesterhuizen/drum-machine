import React, { Component } from 'react';

// css 
import './StepRow.css';


// components 
import StepButton from './StepButton.js';

class StepRow extends Component {
    render() {
				const drum = this.props.drum;
        return (
            <div className="step-row">
                {/* { drums.map( (drum, i) => {
                    return <Step active={this.props.beat === i || this.props.selected.sequence[i] === 1}
                                 label={drum.name}
                                 key={`switch-${i}`}
                                 selectDrum={ () => { this.selectDrum(i) }}
                                 handleClick={ () => { this.toggleStep(i) }}
                            />
                })}
								<Step active={this.props.beat === 15 || this.props.selected.sequence[15] === 1} label="-" handleClick={ () => { this.toggleStep(15) }} key={`switch-16`} /> */}
								<span className="step-row__title">{drum.name}</span>
								<div className="step-row__steps">
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
									<StepButton />
								</div>
            </div>
        )
    }
}

export default StepRow;