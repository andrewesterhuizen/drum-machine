import React, { Component } from 'react';
import './Fader.css';

class Fader extends Component {
    updateValue(value) {
        this.props.drum.sample.setVolume(value);
    }
    render() {
        return (
            <div className="fader-container">
                <input onChange={ e => { this.updateValue(e.target.value / 100) }}
                    type="range"
                    orient="vertical"
                    className="Fader"
                    max={100}
                    defaultValue={80}
                />
                <span className="fader-label">{this.props.drum.name}</span>
            </div>
        )
    }
}

export default Fader;