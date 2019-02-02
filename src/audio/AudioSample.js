export default class AudioSample {
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
