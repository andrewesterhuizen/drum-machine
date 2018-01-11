import React, { Component } from 'react';
import './StepPanel.css';
import Step from './Step.js';

class StepPanel extends Component {
    render() {
        return (
            <div className="StepPanel">
                { this.props.drums.map( (drum, i) => {
                    return <Step active={this.props.beat === i} label={drum.name}key={`switch-${i}`}/>
                })}
            </div>
        )
    }
}

export default StepPanel;