import React, { useRef, useState, useEffect } from 'react';

const AnimatedWave = (props) => {
  const { phase = 10, amplitude = 60, speed = 10, frequency = 0.0005, className } = props;
  const myDivRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (myDivRef.current) {
      const { offsetWidth, offsetHeight } = myDivRef.current;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => prev + 0.01); // Increment the value
    }, speed); // Increment every second (adjust as needed)

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [speed]);

  const wavePath = (x) => {
    const y = height / 1.5 + amplitude * Math.sin(2 * Math.PI * frequency * x + (phase + value));
    return `${x} ${y}`;
  };

  const points = Array.from({ length: width }, (_, i) => wavePath(i)).join(' ');

  return (
    <div style={{ display: 'inline-block', position: 'absolute' }} ref={myDivRef} className={className}>
      <svg width={width} height={height}>
        <polygon points={`0 ${height} ${points} ${width} ${height}`} fill={props.color || '#00ffff'} />
      </svg>
    </div>
  );
};

export default AnimatedWave;
