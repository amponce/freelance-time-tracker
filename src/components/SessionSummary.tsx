import React, { useState, useEffect } from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { formatTime, formatCurrency } from '../utils/timeUtils';

interface SessionSummaryProps {
  elapsedTime: number;
  hourlyRate: number;
  isActive: boolean;
  startTime: Date | null;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ 
  elapsedTime, 
  hourlyRate, 
  isActive,
  startTime 
}) => {
  const [currentElapsed, setCurrentElapsed] = useState(elapsedTime);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && startTime) {
      // Update the elapsed time every 100ms for smoother updates
      interval = setInterval(() => {
        const now = new Date();
        const currentTotal = elapsedTime + (now.getTime() - startTime.getTime());
        setCurrentElapsed(currentTotal);
      }, 100);
    } else {
      setCurrentElapsed(elapsedTime);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, elapsedTime]);
  
  const hours = currentElapsed / 3600000; // Convert milliseconds to hours
  const amount = Math.round((hours * hourlyRate) * 100) / 100; // Ensure exact 2 decimal precision

  return (
    <div className="bg-white rounded-turbo shadow-turbo-md p-6 transition-all hover:shadow-turbo-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-5">Current Session Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-turbo border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-turbo-blue-100 flex items-center justify-center mr-3">
              <Clock size={20} className="text-turbo-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Time Tracked</h3>
          </div>
          <p className="text-3xl font-light text-gray-800 mt-2">{formatTime(currentElapsed)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {isActive ? 'Timer running' : 'Timer stopped'}
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-turbo border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-turbo-green-100 flex items-center justify-center mr-3">
              <DollarSign size={20} className="text-turbo-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Amount Due</h3>
          </div>
          <p className="text-3xl font-light text-gray-800 mt-2">{formatCurrency(amount)}</p>
          <p className="text-sm text-gray-500 mt-2">
            At {formatCurrency(hourlyRate)}/hour
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
