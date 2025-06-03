import React from 'react';
import { Clock, DollarSign, Trash2, Calendar, Briefcase } from 'lucide-react';
import { TimeSessionWithDuration } from '../types';
import { formatDuration, formatCurrency, formatShortDate } from '../utils/timeUtils';

interface SessionHistoryProps {
  sessions: TimeSessionWithDuration[];
  onDeleteSession: (id: string) => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onDeleteSession }) => {
  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-turbo shadow-turbo-md p-6 transition-all hover:shadow-turbo-lg">
        <h2 className="text-lg font-medium text-gray-800 mb-5">Session History</h2>
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-turbo">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No completed sessions yet</p>
          <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
            Start tracking time to see your session history here
          </p>
        </div>
      </div>
    );
  }

  const totalAmount = sessions.reduce((sum, session) => sum + session.amount, 0);
  const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);

  return (
    <div className="bg-white rounded-turbo shadow-turbo-md p-6 transition-all hover:shadow-turbo-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-5">Session History</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-turbo border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-turbo-blue-100 flex items-center justify-center mr-3">
              <Clock size={20} className="text-turbo-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Total Time</h3>
          </div>
          <p className="text-3xl font-light text-gray-800 mt-2">{formatDuration(totalDuration)}</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-turbo border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-turbo-green-100 flex items-center justify-center mr-3">
              <DollarSign size={20} className="text-turbo-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Total Earnings</h3>
          </div>
          <p className="text-3xl font-light text-gray-800 mt-2">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-turbo border border-gray-200">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Briefcase size={18} className="text-turbo-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {session.projectName || 'Unnamed Project'}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatShortDate(session.startTime)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{formatDuration(session.duration)}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      <span>{formatCurrency(session.amount)}</span>
                    </div>
                  </div>
                  {session.notes && (
                    <p className="text-sm text-gray-500 mt-2 max-w-lg">{session.notes}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteSession(session.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                aria-label="Delete session"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionHistory;
