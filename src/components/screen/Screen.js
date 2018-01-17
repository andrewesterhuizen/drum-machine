import React, { Component } from 'react';
import './Screen.css';
import StepMatrix from './StepMatrix.js';

class Screen extends Component {
    render() {
        return (
            <div className="Screen">
                <StepMatrix drums={this.props.drums} />
            </div>
        )
    }
}

export default Screen;