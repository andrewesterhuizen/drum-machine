import React, { Component } from "react";
import "./App.css";
import Machine from "./Machine.js";
import Loading from "./Loading.js";

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

class DrumPart {
  constructor(name, sample) {
    this.name = name;
    this.sample = sample;
    this.sequence = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this._isPlaying = false;
  }
  play() {
    this.sample.play();
    this._isPlaying = true;
    setTimeout(() => {
      this._isPlaying = false;
    }, 200);
  }
  isPlaying() {
    return this._isPlaying;
  }
}

const fetchSample = (context, path, name) =>
  new Promise((resolve, reject) =>
    fetch(path)
      .then(r => r.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer))
      .then(buffer => resolve({ buffer, name }))
      .catch(err => reject(err))
  );

class AudioSample {
  constructor(context, sample) {
    this.context = context;
    this.buffer = sample.buffer;
    this.name = sample.name;
  }
  play() {
    // create buffer and connect to context
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;

    source.connect(this.context.destination);

    // play sample
    source.start();
  }
}

const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

class App extends Component {
  constructor() {
    super();
    this.state = {
      samplesLoaded: false,
      beat: 0,
      bpm: 120,
      paused: true,
      recording: false,
      sequences: new Array(8).fill(new Array(8).fill(0))
    };
  }
  context = null;
  samples = [];

  then = Date.now();
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
  componentDidMount() {
    const context = new AudioContext();
    this.context = context;

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
  initKeyListeners() {
    document.addEventListener("keydown", e => {
      const drums = this.state.drums;
      e.preventDefault();

      switch (e.key) {
        case " ":
          this.togglePause();
          break;
        case "q":
          drums[0].play();
          this.recordStep(0);
          break;
        case "w":
          drums[1].play();
          this.recordStep(1);
          break;
        case "e":
          drums[2].play();
          this.recordStep(2);
          break;
        case "r":
          drums[3].play();
          this.recordStep(3);
          break;
        case "t":
          drums[4].play();
          this.recordStep(4);
          break;
        case "y":
          drums[5].play();
          this.recordStep(5);
          break;
        case "u":
          drums[6].play();
          this.recordStep(6);
          break;
        case "i":
          drums[7].play();
          this.recordStep(7);
          break;
        case "o":
          drums[8].play();
          this.recordStep(8);
          break;
        case "p":
          drums[9].play();
          this.recordStep(9);
          break;
        default:
      }
    });
  }
  render() {
    if (!this.state.samplesLoaded) {
      return <Loading />;
    } else {
      return (
        <Machine
          drums={this.state.drums}
          bpm={this.state.bpm}
          paused={this.state.paused}
          increaseBPM={this.increaseBPM}
          decreaseBPM={this.decreaseBPM}
          togglePause={this.togglePause}
          randomise={this.randomise}
          toggleRecording={this.toggleRecording}
          recording={this.state.recording}
          resetAll={this.resetAll}
          selectDrum={this.selectDrum}
          toggleStep={this.toggleStep}
          beat={this.state.beat}
        />
      );
    }
  }
}

export default App;
