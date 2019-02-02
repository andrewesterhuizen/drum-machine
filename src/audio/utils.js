export const fetchSample = (context, path, name) =>
  new Promise((resolve, reject) =>
    fetch(path)
      .then(r => r.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer))
      .then(buffer => resolve({ buffer, name }))
      .catch(err => reject(err))
  );
