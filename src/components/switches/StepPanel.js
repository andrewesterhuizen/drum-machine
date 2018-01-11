import React, { Component } from 'react';
import './StepPanel.css';
import Step from './Step.js';

class StepPanel extends Component {
    selectDrum(i) {
        this.props.drumController.select(i);
    }
    toggleStep(i) {
        this.props.drumController.toggleStep(i);     
    }
    render() {
        const drums = this.props.drumController.drums;
        return (
            <div className="StepPanel">
                { drums.map( (drum, i) => {
                    return <Step active={this.props.beat === i || this.props.drumController.selected.sequence[i] === 1}
                                 label={drum.name}
                                 key={`switch-${i}`}
                                 selectDrum={ () => { this.selectDrum(i) }}
                                 toggleStep={ () => { this.toggleStep(i) }}
                            />
                })}
            </div>
        )
    }
}

export default StepPanel;