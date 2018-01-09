import React, { Component } from 'react';
import './StepPanel.css';
import Step from './Step.js';


class StepPanel extends Component {
    render() {
        let switches = [];
        for(let i = 0; i < 16; i++) {
            switches.push();
        }
        return (
            <div className="StepPanel">
                {switches}
                { this.props.drums.map( (drum, i) => {
                    return <Step label={drum.name}key={`switch-${i}`}/>
                })}
            </div>
        )
    }
}

export default StepPanel;