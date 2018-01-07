import React, { Component } from 'react';
import './Machine.css';
import SwitchPanel from './SwitchPanel.js';
import Switch from './Switch.js';

class Machine extends Component {
    render() {
        return (
            <div className="Machine">
                <Switch />
                <SwitchPanel />
            </div>
        )
    }
}

export default Machine;