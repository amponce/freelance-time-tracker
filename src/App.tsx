import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Timer from './components/Timer';
import RateInput from './components/RateInput';
import SessionSummary from './components/SessionSummary';
import SessionHistory from './components/SessionHistory';
import { TimeSession, TimeSessionWithDuration } from './types';
import { calculateAmount } from './utils/timeUtils';

function App() {
  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Session details
  const [hourlyRate, setHourlyRate] = useState(50);
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');
  
  // Session history
  const [sessions, setSessions] = useState<TimeSessionWithDuration[]>([]);
  const [currentSession, setCurrentSession] = useState<TimeSession | null>(null);

  // Load sessions from localStorage on initial render
  useEffect(() => {
    const savedSessions = localStorage.getItem('timeTrackerSessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        // Convert string dates back to Date objects
        const formattedSessions = parsedSessions.map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : null
        }));
        setSessions(formattedSessions);
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('timeTrackerSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleStart = () => {
    const now = new Date();
    
    if (!currentSession) {
      // Create a new session
      const newSession: TimeSession = {
        id: Date.now().toString(),
        projectName,
        startTime: now,
        endTime: null,
        hourlyRate,
        notes,
        isActive: true
      };
      setCurrentSession(newSession);
    }
    
    setStartTime(now);
    setIsRunning(true);
  };

  const handlePause = () => {
    if (isRunning && startTime) {
      const now = new Date();
      const additionalTime = now.getTime() - startTime.getTime();
      setElapsedTime(prevElapsedTime => prevElapsedTime + additionalTime);
      setStartTime(null);
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    if (startTime) {
      const now = new Date();
      const additionalTime = now.getTime() - startTime.getTime();
      const totalElapsedTime = elapsedTime + additionalTime;
      
      if (currentSession) {
        const completedSession: TimeSessionWithDuration = {
          ...currentSession,
          endTime: now,
          isActive: false,
          duration: totalElapsedTime,
          amount: calculateAmount(totalElapsedTime, hourlyRate)
        };
        
        setSessions(prevSessions => [completedSession, ...prevSessions]);
      }
    } else if (elapsedTime > 0 && currentSession) {
      const completedSession: TimeSessionWithDuration = {
        ...currentSession,
        endTime: new Date(),
        isActive: false,
        duration: elapsedTime,
        amount: calculateAmount(elapsedTime, hourlyRate)
      };
      
      setSessions(prevSessions => [completedSession, ...prevSessions]);
    }
    
    // Reset current session
    setCurrentSession(null);
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prevSessions => prevSessions.filter(session => session.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Clock size={24} className="text-turbo-blue-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Freelance Time Tracker</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Timer
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onStop={handleStop}
              startTime={startTime}
              elapsedTime={elapsedTime}
            />
            
            <SessionSummary
              elapsedTime={elapsedTime}
              hourlyRate={hourlyRate}
              isActive={isRunning}
              startTime={startTime}
            />
          </div>
          
          <div>
            <RateInput
              hourlyRate={hourlyRate}
              setHourlyRate={setHourlyRate}
              projectName={projectName}
              setProjectName={setProjectName}
              notes={notes}
              setNotes={setNotes}
              disabled={isRunning || elapsedTime > 0}
            />
          </div>
        </div>
        
        <div className="mt-8">
          <SessionHistory
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
