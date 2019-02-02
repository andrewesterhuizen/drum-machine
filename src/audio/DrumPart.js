export default class DrumPart {
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
