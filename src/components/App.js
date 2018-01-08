import React, { Component } from 'react';
import './App.css';
import p5DrumMachine from '../scripts/p5DrumMachine.js';
import Machine from './Machine.js';

class App extends Component {
	render() {
		return (
		<div className="App">
			<Machine />
		</div>
		);
	}
}

export default App;
