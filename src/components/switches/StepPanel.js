import React, { Component } from 'react';
import './StepPanel.css';
import Step from './Step.js';

class StepPanel extends Component {
    selectDrum(i) {
        this.props.selectDrum(i);
    }
    toggleStep(i) {
        this.props.toggleStep(i);
    }
    render() {
        const drums = this.props.drums;
        return (
            <div className="StepPanel">
                { drums.map( (drum, i) => {
                    return <Step active={this.props.beat === i || this.props.selected.sequence[i] === 1}
                                 label={drum.name}
                                 key={`switch-${i}`}
                                 selectDrum={ () => { this.selectDrum(i) }}
                                 handleClick={ () => { this.toggleStep(i) }}
                            />
                })}
                <Step active={this.props.beat === 15 || this.props.selected.sequence[15] === 1} label="-" handleClick={ () => { this.toggleStep(15) }} key={`switch-16`} />
            </div>
        )
    }
}

export default StepPanel;