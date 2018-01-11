import React, { Component } from 'react';
import './Switch.css';

class Switch extends Component {
    render() {
        return (
            <div className="switch-container">
                <button className="Switch" onClick={this.props.toggleStep}></button>
                <span className="switch-label" onClick={this.props.selectDrum}>{this.props.label}</span>
            </div>
        )
    }
}

export default Switch;