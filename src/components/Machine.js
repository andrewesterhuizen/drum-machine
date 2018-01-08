import React, { Component } from 'react';
import './Machine.css';
import Screen from './Screen.js';
import VolumePanel from './VolumePanel.js';
import Fader from './Fader.js';
import SwitchPanel from './SwitchPanel.js';
import Switch from './Switch.js';

class Machine extends Component {
    render() {
        return (
            <div className="Machine">
                <Screen />
                <VolumePanel />
                <Fader />
                <div className="controls-container">
                    <Switch />
                    <SwitchPanel />
                </div>
            </div>
        )
    }
}

export default Machine;