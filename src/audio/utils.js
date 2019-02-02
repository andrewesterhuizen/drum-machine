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
