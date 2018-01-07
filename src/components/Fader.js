import React, { Component } from 'react';
import './Fader.css';

class Fader extends Component {
    render() {
        return (
            <input type="range" orient="vertical" className="Fader" />
        )
    }
}

export default Fader;