export default class Sample {
  constructor(context, sample, id) {
    this.context = context;
    this.buffer = sample.buffer;
    this.name = sample.name;
    this.id = id;
  }
  play() {
    // create buffer and connect to context
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;

    source.connect(this.context.destination);

    // play sample
    source.start();

    if (this.onPlay) {
      this.onPlay(this.id);
    }
  }
}
