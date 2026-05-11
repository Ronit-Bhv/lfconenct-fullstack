import { useState, useEffect } from 'react';
import '../styles/LiveClock.css';

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = String(hours).padStart(2, '0');

    return { timeStr: `${hoursStr}:${minutes}:${seconds}`, ampm };
  };

  const { timeStr, ampm } = formatTime(time);

  return (
    <div className="clock-container">
      <div className="clock-face">
        <div>{timeStr}</div>
        <div className="clock-ampm">{ampm}</div>
      </div>
    </div>
  );
}

export default LiveClock;
