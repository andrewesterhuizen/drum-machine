import React, { Component } from 'react';
import './Switch.css';

class Switch extends Component {
    render() {
        return (
            <div className="switch-container">
                <button className="Switch"></button>
                <span className="switch-label">{this.props.label}</span>
            </div>
        )
    }
}

export default Switch;