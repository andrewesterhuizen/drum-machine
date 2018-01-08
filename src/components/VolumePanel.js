import React, { Component } from 'react';
import './VolumePanel.css';
import Fader from './Fader.js';

class FaderPanel extends Component {
    render() {
        let faders = [];
        for(let i = 0; i < 16; i++) {
            faders.push(<Fader key={`fader-${i}`}/>);
        }
        return (
            <div className="FaderPanel">
                {faders}
            </div>
        )
    }
}

export default FaderPanel;