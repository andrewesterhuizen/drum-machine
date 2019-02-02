import React, { Component } from "react";
import "./App.css";

// Components
import Loading from "./Loading.js";
import StepRow from "./StepRow.js";
import StepIndicatorRow from "./StepIndicatorRow.js";
import Controls from "./Controls.js";

// Audio
import Sample from "../audio/Sample";
import { fetchSample } from "../audio/utils";

const sampleList = ["bd1", "sd1", "lt", "mt", "ht", "rim", "hcp", "hhc", "hho", "ride"];

const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

class App extends Component {
  state = {
    samplesLoaded: false,
    beat: 0,
    bpm: 120,
    paused: true,
    recording: false,
    sequences: new Array(10).fill().map(_ => new Array(16).fill(false)),
    isPlaying: []
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
    Promise.all(sampleList.map(s => fetchSample(context, `./samples/${s}.wav`, s))).then(
      samples => {
        samples.forEach((sample, id) => {
          const s = new Sample(context, sample, id);
          s.onPlay = sampleID => {
            this.setState(({ isPlaying }) => ({
              isPlaying: [...isPlaying, sampleID]
            }));

            setTimeout(() => {
              this.setState(({ isPlaying }) => ({
                isPlaying: isPlaying.filter(id => id !== sampleID)
              }));
            }, 200);
          };
          this.samples.push(s);
        });

        this.setState({
          samplesLoaded: true
        });
      }
    );
  }
  initKeyListeners() {
    const keyMap = keys.reduce(
      (p, k, i) => ({
        ...p,
        [k]: () => {
          this.samples[i].play();
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
    const sequences = [...this.state.sequences];
    sequences[id][step] = !sequences[id][step];
    this.setState({ sequences });
  };
  checkStep(beat) {
    this.state.sequences.forEach((sequence, id) => {
      if (sequence[beat]) this.samples[id].play();
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
    const sequences = [...this.state.sequences];
    sequences[id] = this.getRandomSequence();
    this.setState({ sequences });
  };
  resetAll = () => {
    this.setState({
      sequences: new Array(10).fill().map(_ => new Array(16).fill(false))
    });
  };
  toggleRecording = () => {
    this.setState({
      recording: !this.state.recording
    });
  };
  recordStep = id => {
    if (!this.state.paused && this.state.recording) {
      const sequences = [...this.state.sequences];
      sequences[id][this.state.beat] = 1;
      this.setState({ sequences });
    }
  };
  render() {
    if (!this.state.samplesLoaded) {
      return <Loading />;
    } else {
      return (
        <div className="drum-machine">
          {this.state.sequences.map((sequence, i) => {
            const sample = this.samples[i];
            return (
              <StepRow
                key={sample.id}
                onStepClick={step => this.toggleStep(sample.id, step)}
                onRandomiseClick={() => this.randomise(sample.id)}
                isPlaying={this.state.isPlaying.includes(sample.id)}
                sequence={sequence}
                title={`${keys[sample.id]}: ${sample.name}`}
              />
            );
          })}
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
