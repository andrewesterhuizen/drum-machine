import React, { Component } from 'react';
import './StepPanel.css';
import Step from './Step.js';

class StepPanel extends Component {
    render() {
        let switches = [];
        for(let i = 0; i < 16; i++) {
            switches.push(<Step label={i+1}key={`switch-${i}`}/>);
        }
        return (
            <div className="StepPanel">
                {switches}
            </div>
        )
    }
}

export default StepPanel;