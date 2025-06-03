import React, { useState, useEffect } from 'react';
import { Play, Pause, StopCircle } from 'lucide-react';
import { formatTime } from '../utils/timeUtils';

interface TimerProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  startTime: Date | null;
  elapsedTime: number;
}

const Timer: React.FC<TimerProps> = ({
  isRunning,
  onStart,
  onPause,
  onStop,
  startTime,
  elapsedTime
}) => {
  const [displayTime, setDisplayTime] = useState('00:00:00');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime() + elapsedTime;
        setDisplayTime(formatTime(elapsed));
      }, 1000);
    } else if (!isRunning) {
      setDisplayTime(formatTime(elapsedTime));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime, elapsedTime]);

  return (
    <div className="bg-white rounded-turbo shadow-turbo-md p-8 transition-all hover:shadow-turbo-lg">
      <div className="text-7xl font-light text-center mb-10 font-mono tracking-wider text-gray-800">{displayTime}</div>
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center justify-center bg-turbo-green-500 hover:bg-turbo-green-600 text-white px-8 py-4 rounded-full transition-colors font-medium text-base shadow-sm"
          >
            <Play size={20} className="mr-2" />
            Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full transition-colors font-medium text-base shadow-sm"
          >
            <Pause size={20} className="mr-2" />
            Pause
          </button>
        )}
        <button
          onClick={onStop}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition-colors font-medium text-base shadow-sm"
          disabled={!isRunning && elapsedTime === 0}
        >
          <StopCircle size={20} className="mr-2" />
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
