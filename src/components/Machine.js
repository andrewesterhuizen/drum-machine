import React, { Component } from 'react';
import './Machine.css';
import Screen from './screen/Screen.js';
import VolumePanel from './mixer/VolumePanel.js';
import Fader from './mixer/Fader.js';
import StepPanel from './switches/StepPanel.js';
import Switch from './switches/Switch.js';

class Machine extends Component {
    render() {
        return (
            <div className="Machine">
                <Screen />
                <VolumePanel />
                <Fader />
                <div className="controls-container">
                    <Switch label={'START'}/>
                    <StepPanel />
                </div>
            </div>
        )
    }
}

export default Machine;