import React,{ useRef, useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

const AnimatedWave = React.memo((props) => {
  const { phase = 10, amplitude = 60, speed = 10, frequency = 0.0005, className } = props;
  const myDivRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      // This function will be called whenever the window is resized
      if (myDivRef.current) {
        const { offsetWidth, offsetHeight } = myDivRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup function to remove the event listener when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (myDivRef.current) {
      const { offsetWidth, offsetHeight } = myDivRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    const updateValue = () => {
      setValue((prev) => prev + 0.01); // Increment the value
    };
    const throttledUpdate = throttle(updateValue, speed);
    const intervalId = setInterval(throttledUpdate, speed);
    return () => {
      clearInterval(intervalId);
      throttledUpdate.cancel();
    };
  }, [speed]);

  const wavePath = (x) => {
    const y = dimensions.height / 1.5 + amplitude * Math.sin(2 * Math.PI * frequency * x + (phase + value));
    return `${x} ${y}`;
  };

  const points = Array.from({ length: dimensions.width }, (_, i) => wavePath(i)).join(' ');

  return (
    <div style={{ display: 'inline-block', position: 'absolute' }} ref={myDivRef} className={`${className} animated-wave`} aria-label="Animated wave">
      <svg width={dimensions.width} height={dimensions.height}>
        {props.children}
        <path d={`M0 ${dimensions.height} ${points} L${dimensions.width} ${dimensions.height}`} fill={props.fill||'#000000'} />
      </svg>
    </div>
  );
});

export default AnimatedWave;