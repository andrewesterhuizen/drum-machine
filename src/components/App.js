import React, { Component } from "react";
import "./App.css";

// Components
import Loading from "./Loading.js";
import StepRow from "./StepRow.js";
import StepIndicatorRow from "./StepIndicatorRow.js";
import Controls from "./Controls.js";

// Audio
import Sample from "../audio/Sample";
import { fetchSample, initSequences, getRandomSequence } from "../audio/utils";

import samples from "../samples.json";

console.log(samples);

const sampleList = ["bd1", "sd1", "lt", "mt", "ht", "rim", "hcp", "hhc", "hho", "ride"];
const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

class App extends Component {
  state = {
    samplesLoaded: false,
    beat: 0,
    bpm: 120,
    paused: true,
    recording: false,
    sequences: initSequences(),
    isPlaying: [],
    selected: 0,
    samples: samples
  };
  samples = [];
  then = Date.now();

  componentDidMount() {
    this.context = new AudioContext();
    this.initSamples(this.context);
    this.initWorker();
    this.initKeyListeners();
  }
  initWorker() {
    if (!window.Worker) {
      // TODO: handle not supported
      return;
    }
    const worker = new Worker("worker.js");
    this.worker = worker;

    worker.onmessage = e => {
      const message = e.data;
      switch (message.type) {
        case "BEAT":
          this.setState({ beat: message.payload });
          this.handleSequencerPlay(message.payload);
          break;
        default:
      }
    };
  }
  loadSample = (context, sample, id) => {
    const handleSamplePlay = sampleID => {
      this.setState(({ isPlaying }) => ({ isPlaying: [...isPlaying, sampleID] }));

      setTimeout(() => {
        this.setState(({ isPlaying }) => ({
          isPlaying: isPlaying.filter(id => id !== sampleID)
        }));
      }, 200);
    };

    const s = new Sample(context, sample, id);
    s.onPlay = handleSamplePlay;
    return s;
  };
  initSamples(context) {
    const samplePromises = samples["505"].map(s => fetchSample(context, `/samples/505/${s}`, s));

    Promise.all(samplePromises).then(samples => {
      this.samples = samples.map((sample, id) => {
        return this.loadSample(context, sample, id);
      });

      this.setState({
        samplesLoaded: true
      });
    });
  }
  initKeyListeners() {
    const handleSampleKeydown = id => {
      this.samples[id].play();
      this.selectSample(id);
      this.recordStep(id);
    };

    const keyMapReducer = (p, k, i) => ({ ...p, [k]: () => handleSampleKeydown(i) });
    const keyMap = keys.reduce(keyMapReducer, {});

    keyMap[" "] = () => {
      this.togglePause();
    };

    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.key in keyMap) keyMap[e.key]();
    });
  }
  selectSample = id => {
    this.setState({ selected: id });
  };
  toggleStep = (id, step) => {
    const sequences = [...this.state.sequences];
    sequences[id][step] = !sequences[id][step];
    this.setState({ sequences });
  };
  handleSequencerPlay(beat) {
    this.state.sequences.forEach((sequence, id) => {
      if (sequence[beat]) this.samples[id].play();
    });
  }
  togglePause = () => {
    this.setState(({ paused }) => ({ paused: !paused }));
    this.worker.postMessage({ type: "TOGGLE_PAUSE" });
  };
  setBPM = bpm => {
    this.setState({ bpm });
    this.worker.postMessage({ type: "SET_BPM", payload: bpm });
  };
  randomise = () => {
    const sequences = [...this.state.sequences];
    sequences[this.state.selected] = getRandomSequence();
    this.setState({ sequences });
  };
  resetAll = () => this.setState({ sequences: initSequences() });
  toggleRecording = () => this.setState(({ recording }) => ({ recording: !recording }));
  recordStep = id => {
    if (!this.state.paused && this.state.recording) {
      const sequences = [...this.state.sequences];
      sequences[id][this.state.beat] = 1;
      this.setState({ sequences });
    }
  };
  setVolume = value => {
    this.samples[this.state.selected].volume = value;
  };
  handleTitleClick = id => {
    this.selectSample(id);
    this.samples[id].play();
    this.recordStep(id);
  };
  handleSampleClick = (kit, sample) => {
    fetchSample(`./samples/${kit}/${sample}`).then(sample => {
      this.samples[this.state.selected] = this.loadSample(
        this.context,
        sample,
        this.state.selected
      );
    });
  };
  render() {
    if (!this.state.samplesLoaded) return <Loading />;

    const { beat, bpm, paused, recording, sequences, isPlaying, selected } = this.state;

    const stepRows = sequences.map((sequence, i) => {
      const sample = this.samples[i];
      return (
        <StepRow
          key={sample.id}
          onTitleClick={() => this.handleTitleClick(sample.id)}
          onStepClick={step => this.toggleStep(sample.id, step)}
          isPlaying={isPlaying.includes(sample.id)}
          sequence={sequence}
          title={`${keys[sample.id]}`}
          selected={sample.id === selected}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="drum-machine">
          <Controls
            bpm={bpm}
            togglePause={this.togglePause}
            paused={paused}
            setBPM={this.setBPM}
            resetAll={this.resetAll}
            toggleRecording={this.toggleRecording}
            recording={recording}
            selectedSample={this.samples[this.state.selected]}
            setVolume={this.setVolume}
            onRandomiseClick={this.randomise}
          />
          {stepRows}
          <StepIndicatorRow beat={beat} />
        </div>
        <div className="samples">
          {Object.keys(this.state.samples).map(kit => (
            <React.Fragment>
              <h3 className="samples__header">{kit}</h3>
              <ul className="samples__list">
                {this.state.samples[kit].map(sample => (
                  <li
                    className="samples__list-item"
                    onClick={() => this.handleSampleClick(kit, sample)}
                  >
                    {sample}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
