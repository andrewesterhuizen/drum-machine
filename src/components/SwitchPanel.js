import React, { Component } from 'react';
import './SwitchPanel.css';
import Switch from './Switch.js';

class SwitchPanel extends Component {
    render() {
        let switches = [];
        for(let i = 0; i < 16; i++) {
            switches.push(<Switch key={i}/>);
        }
        return (
            <div className="SwitchPanel">
                {switches}
            </div>
        )
    }
}

export default SwitchPanel;