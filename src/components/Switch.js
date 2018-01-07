import React, { Component } from 'react';
import './Switch.css';
import Indicator from './Indicator.js';

class Switch extends Component {
    render() {
        return (
            <div className="switchContainer">
                <Indicator />
                <button className="Switch"></button>
            </div>
        )
    }
}

export default Switch;