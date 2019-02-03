let paused = true;
let bpm = 120;

onmessage = function(e) {
  const message = e.data;

  switch (message.type) {
    case "TOGGLE_PAUSE":
      paused = !paused;
      break;
    case "SET_BPM":
      bpm = message.payload;
      break;
    default:
      console.log(message);
  }
};

let beat = 0;
let then = Date.now();

const update = () => {
  // this timing system could probably be much better
  let interval = ((1000 / bpm) * 60) / 4;
  let now = Date.now();
  let elapsed = now - then;

  if (elapsed > interval) {
    then = now - (elapsed % interval);

    if (!paused) {
      beat = beat + 1;
      postMessage({ type: "BEAT", payload: beat });

      if (beat > 15) {
        beat = 0;
        postMessage({ type: "BEAT", payload: beat });
      }
    }
  }

  requestAnimationFrame(update);
};

requestAnimationFrame(update);
