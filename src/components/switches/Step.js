import React, { Component } from 'react';
import './Step.css';
import Indicator from './Indicator.js';
import Switch from './Switch.js';

class Step extends Component {
    render() {
        return (
            <div className="Step">
                <Indicator active={this.props.active ? 'active' : ''} />
                <Switch label={this.props.label} selectDrum={this.props.selectDrum} toggleStep={this.props.toggleStep}/>
            </div>
            
        )
    }
}

export default Step;