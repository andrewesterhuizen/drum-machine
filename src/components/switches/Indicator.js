import React, { Component } from 'react';
import './Indicator.css';

class Indicator extends Component {
    render() {
        return (
            <div>
                <div className={this.props.active ? 'Indicator active' : 'Indicator'}></div>
            </div>
        )
    }
}

export default Indicator;