import React, { Component } from 'react';
import './Machine.css';
import FaderPanel from './FaderPanel.js';
import SwitchPanel from './SwitchPanel.js';
import Switch from './Switch.js';

class Machine extends Component {
    render() {
        return (
            <div className="Machine">
                <div className="screen"></div>
                <div className="volume-container">
                    <FaderPanel />
                </div>
                <div className="controls-container">
                    <Switch />
                    <SwitchPanel />
                </div>
            </div>
        )
    }
}

export default Machine;