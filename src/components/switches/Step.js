import React, { Component } from 'react';
import './Step.css';
import Indicator from './Indicator.js';
import Switch from './Switch.js';

class Step extends Component {
    render() {
        return (
            <div className="Step">
                <Indicator />
                <Switch label={this.props.label} />
            </div>
            
        )
    }
}

export default Step;