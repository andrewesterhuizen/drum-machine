import React, { Component } from 'react';
import './VolumePanel.css';
import Fader from './Fader.js';

class FaderPanel extends Component {
    render() {
        return (
            <div className="FaderPanel">
                { this.props.drums.map( (drum, i) => <Fader key={`fader-${i}`} drum={drum}/> )}
            </div>
        )
    }
}

export default FaderPanel;