import React, { Component } from 'react';
import './Machine.css';
import SwitchPanel from './SwitchPanel.js';

class Machine extends Component {
    render() {
        return (
            <div className="Machine">
                <SwitchPanel />
            </div>
        )
    }
}

export default Machine;