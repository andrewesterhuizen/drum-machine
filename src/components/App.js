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
    selected: 0
  };
  samples = [];
  then = Date.now();
  componentDidMount() {
    const context = new AudioContext();
    this.initSamples(context);
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
  initSamples(context) {
    const handleSamplePlay = sampleID => {
      this.setState(({ isPlaying }) => ({ isPlaying: [...isPlaying, sampleID] }));

      setTimeout(() => {
        this.setState(({ isPlaying }) => ({ isPlaying: isPlaying.filter(id => id !== sampleID) }));
      }, 200);
    };

    Promise.all(sampleList.map(s => fetchSample(context, `./samples/${s}.wav`, s))).then(
      samples => {
        this.samples = [
          ...samples.map((sample, id) => {
            const s = new Sample(context, sample, id);
            s.onPlay = handleSamplePlay;
            return s;
          })
        ];

        this.setState({
          samplesLoaded: true
        });
      }
    );
  }
  initKeyListeners() {
    const handleSampleKeydown = id => {
      this.samples[id].play();
      this.setState({ selected: id });
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
  randomise = id => {
    const sequences = [...this.state.sequences];
    sequences[id] = getRandomSequence();
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
  render() {
    if (!this.state.samplesLoaded) return <Loading />;

    const { beat, bpm, paused, recording, sequences, isPlaying, selected } = this.state;

    const stepRows = sequences.map((sequence, i) => {
      const sample = this.samples[i];
      return (
        <StepRow
          key={sample.id}
          onStepClick={step => this.toggleStep(sample.id, step)}
          onRandomiseClick={() => this.randomise(sample.id)}
          isPlaying={isPlaying.includes(sample.id)}
          sequence={sequence}
          title={`${keys[sample.id]}: ${sample.name}`}
          selected={sample.id === selected}
        />
      );
    });

    return (
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
        />
        {stepRows}
        <StepIndicatorRow beat={beat} />
      </div>
    );
  }
}

export default App;
