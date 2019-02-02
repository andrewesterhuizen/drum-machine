import { makeDistortionCurve } from "./utils";

export default class Sample {
  static distortionCurveCache = {};
  constructor(context, sample, id) {
    this.context = context;
    this.buffer = sample.buffer;
    this.name = sample.name;
    this.id = id;
    this.volume = 0.8;
    this.pitch = 1;
    this.filter = 100;
    this.drive = 0;
  }
  play() {
    // create buffer and connect to context
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;

    source.playbackRate.value = this.pitch;

    const gainNode = this.context.createGain();
    gainNode.gain.value = this.volume;

    const filter = this.context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = this.filter * 100;

    const drive = this.context.createWaveShaper();
    let curve = Sample.distortionCurveCache[this.drive];
    if (!curve) {
      curve = makeDistortionCurve(this.drive);
      Sample.distortionCurveCache[this.drive] = curve;
    }

    drive.curve = curve;
    drive.oversample = "4x";

    source.connect(filter);
    filter.connect(drive);
    drive.connect(gainNode);
    gainNode.connect(this.context.destination);

    // play sample
    source.start();

    if (this.onPlay) {
      this.onPlay(this.id);
    }
  }
}
