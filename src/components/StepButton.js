import React, { Component } from 'react';
import './StepButton.css';

class StepButton extends Component {
    render() {
        return (
            <button className="step-button"></button>
        )
    }
}

export default StepButton;

/* <Indicator active={this.props.active ? 'active' : ''} /> */
/* <Switch label={this.props.label} selectDrum={this.props.selectDrum} handleClick={this.props.handleClick}/> */