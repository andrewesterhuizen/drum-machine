import React, { useState, useEffect } from "react";

const map = (num, in_min, in_max, out_min, out_max) =>
  ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

const getPos = (height, heightOffset, time, offset) => {
  const sinValue = Math.sin(time + offset);
  const mapped = map(sinValue, -1, 1, 0, height - heightOffset);
  const edgeOffset = mapped + heightOffset / 2;

  return edgeOffset;
};

const Loading = () => {
  const [time, setTime] = useState(0);

  let height = 60;
  let heightOffset = height / 5;
  let animate = true;

  const update = () => {
    if (!animate) return;
    setTime(time + 0.07);
    requestAnimationFrame(update);
  };

  useEffect(() => {
    requestAnimationFrame(update);
    return () => {
      animate = false;
    };
  });

  return (
    <svg width={100} height={height}>
      <circle
        cx="20%"
        cy={getPos(height, heightOffset, time, 0)}
        r={4}
        fill="#fff"
      />
      <circle
        cx="35%"
        cy={getPos(height, heightOffset, time, 1)}
        r={4}
        fill="#fff"
      />
      <circle
        cx="50%"
        cy={getPos(height, heightOffset, time, 2)}
        r={4}
        fill="#fff"
      />
      <circle
        cx="65%"
        cy={getPos(height, heightOffset, time, 3)}
        r={4}
        fill="#fff"
      />
      <circle
        cx="80%"
        cy={getPos(height, heightOffset, time, 4)}
        r={4}
        fill="#fff"
      />
    </svg>
  );
};

export default Loading;
