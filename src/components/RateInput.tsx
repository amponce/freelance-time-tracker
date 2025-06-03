import React from 'react';
import { DollarSign, Briefcase, FileText } from 'lucide-react';

interface RateInputProps {
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  disabled: boolean;
}

const RateInput: React.FC<RateInputProps> = ({
  hourlyRate,
  setHourlyRate,
  projectName,
  setProjectName,
  notes,
  setNotes,
  disabled
}) => {
  // Handle rate input change with proper empty string handling
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // If the input is empty, allow it to be empty in the UI
    if (value === '') {
      // Set to 0 in the state but don't display it
      setHourlyRate(0);
      // Set the input value to empty string directly
      e.target.value = '';
    } else {
      // Otherwise convert to number and update state
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setHourlyRate(numValue);
      }
    }
  };

  return (
    <div className="bg-white rounded-turbo shadow-turbo-md p-6 transition-all hover:shadow-turbo-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-5">Session Details</h2>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Briefcase size={16} className="text-turbo-blue-500" />
            </div>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-turbo-blue-500 focus:border-turbo-blue-500 transition-colors"
              placeholder="Enter project name"
              disabled={disabled}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <DollarSign size={16} className="text-turbo-green-500" />
            </div>
            <input
              type="number"
              id="hourlyRate"
              defaultValue={hourlyRate || ''}
              onChange={handleRateChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-turbo-green-500 focus:border-turbo-green-500 transition-colors"
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={disabled}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <div className="relative">
            <div className="absolute top-3 left-4 flex items-start pointer-events-none">
              <FileText size={16} className="text-gray-400" />
            </div>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-turbo focus:outline-none focus:ring-2 focus:ring-turbo-blue-500 focus:border-turbo-blue-500 transition-colors"
              placeholder="Add session notes here..."
              rows={3}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateInput;
