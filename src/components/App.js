import React, { Component } from "react";
import "./App.css";

// Components
import Loading from "./Loading.js";
import StepRow from "./StepRow.js";
import StepIndicatorRow from "./StepIndicatorRow.js";
import Controls from "./Controls.js";

// Audio
import AudioSample from "../audio/AudioSample";
import DrumPart from "../audio/DrumPart";
import { fetchSample } from "../audio/utils";

const sampleList = [
  "bd1",
  "sd1",
  "lt",
  "mt",
  "ht",
  "rim",
  "hcp",
  "hhc",
  "hho",
  "ride"
];

const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

class App extends Component {
  state = {
    samplesLoaded: false,
    beat: 0,
    bpm: 120,
    paused: true,
    recording: false,
    sequences: new Array(10).fill(new Array(16).fill(0))
  };
  samples = [];
  then = Date.now();
  componentDidMount() {
    const context = new AudioContext();

    this.initSamples(context);
    this.initKeyListeners();
    this.update();
    this.forceUpdate();
  }
  update = () => {
    this.interval = ((1000 / this.state.bpm) * 60) / 4;
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.interval) {
      this.then = this.now - (this.elapsed % this.interval);
      if (!this.state.paused) {
        this.setState({
          beat: this.state.beat + 1
        });
        if (this.state.beat > 15) {
          this.setState({
            beat: 0
          });
        }
        this.checkStep(this.state.beat);
      }
    }

    requestAnimationFrame(() => {
      this.update();
    });
  };
  initSamples(context) {
    Promise.all(
      sampleList.map(s => fetchSample(context, `./samples/${s}.wav`, s))
    ).then(samples => {
      samples.forEach(sample =>
        this.samples.push(new AudioSample(context, sample))
      );

      const drums = this.samples.map((sample, i) => {
        const d = new DrumPart(sample.name, sample);
        d.id = i;
        d.control = keys[i];

        return d;
      });
      this.setState({
        drums: drums,
        samplesLoaded: true
      });
    });
  }
  initKeyListeners() {
    const keyMap = keys.reduce(
      (p, k, i) => ({
        ...p,
        [k]: () => {
          this.state.drums[i].play(i);
          this.recordStep(i);
        }
      }),
      {}
    );

    keyMap[" "] = () => {
      this.togglePause();
    };

    document.addEventListener("keydown", e => {
      e.preventDefault();

      if (e.key in keyMap) {
        keyMap[e.key]();
      }
    });
  }
  toggleStep = (id, step) => {
    const drums = [...this.state.drums];
    const drum = drums[id];
    if (drum.sequence[step] === 0) {
      drum.sequence[step] = 1;
    } else {
      drum.sequence[step] = 0;
    }
    this.setState({
      drums: drums
    });
  };
  checkStep(beat) {
    this.state.drums.forEach(drum => {
      if (drum.sequence[beat] === 1) {
        drum.play();
      }
    });
  }
  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    });
  };
  increaseBPM = () => {
    this.setState({
      bpm: this.state.bpm + 1
    });
  };
  decreaseBPM = () => {
    this.setState({
      bpm: this.state.bpm - 1
    });
  };
  setBPM = newBPM => {
    this.setState({
      bpm: newBPM
    });
  };
  getRandomSequence = () => {
    const randomSequence = [];
    for (let i = 0; i < 16; i++) {
      randomSequence[i] = Math.random() > 0.3 ? 0 : 1;
    }
    return randomSequence;
  };
  randomise = id => {
    const drums = [...this.state.drums];
    drums[id].sequence = this.getRandomSequence();
    this.setState({
      drums: drums
    });
  };
  resetAll = () => {
    const drums = [...this.state.drums];
    drums.forEach(drum => {
      drum.sequence.fill(0);
    });
    this.setState({
      drums: drums
    });
  };
  toggleRecording = () => {
    this.setState({
      recording: !this.state.recording
    });
  };
  recordStep = drumId => {
    if (!this.state.paused && this.state.recording) {
      const drums = [...this.state.drums];
      drums[drumId].sequence[this.state.beat] = 1;
      this.setState({
        drums: drums
      });
    }
  };

  render() {
    if (!this.state.samplesLoaded) {
      return <Loading />;
    } else {
      return (
        <div className="drum-machine">
          {this.state.drums.map(drum => (
            <StepRow
              drum={drum}
              key={drum.name}
              toggleStep={this.toggleStep}
              randomise={this.randomise}
            />
          ))}
          <StepIndicatorRow beat={this.state.beat} />
          <Controls
            bpm={this.state.bpm}
            togglePause={this.togglePause}
            paused={this.state.paused}
            increaseBPM={this.increaseBPM}
            decreaseBPM={this.decreaseBPM}
            setBPM={this.setBPM}
            resetAll={this.resetAll}
            toggleRecording={this.toggleRecording}
            recording={this.state.recording}
          />
        </div>
      );
    }
  }
}

export default App;
