import React, { Component } from 'react';
import './SwitchPanel.css';
import Step from './Step.js';

class SwitchPanel extends Component {
    render() {
        let switches = [];
        for(let i = 0; i < 16; i++) {
            switches.push(<Step key={`switch-${i}`}/>);
        }
        return (
            <div className="SwitchPanel">
                {switches}
            </div>
        )
    }
}

export default SwitchPanel;