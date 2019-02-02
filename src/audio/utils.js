export const fetchSample = (context, path, name) =>
  new Promise((resolve, reject) =>
    fetch(path)
      .then(r => r.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer))
      .then(buffer => resolve({ buffer, name }))
      .catch(err => reject(err))
  );

export const initSequences = (rows = 10, steps = 16) => {
  return new Array(rows).fill().map(_ => new Array(steps).fill(false));
};

export const getRandomSequence = (steps = 16) => {
  return new Array(steps).fill().map(_ => Math.random() < 0.3);
};

export const makeDistortionCurve = amount => {
  var samples = 44100;
  var curve = new Float32Array(samples);
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
};
