
import React, { useRef, useEffect, useState } from 'react';
import { SubjectStatus, EventLogMessage } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface ControlConsoleProps {
  status: SubjectStatus;
  eventLog: EventLogMessage[];
  onProvideStimulus: (stimulus: string) => void;
  isLoading: boolean;
}

const ControlConsole: React.FC<ControlConsoleProps> = ({ status, eventLog, onProvideStimulus, isLoading }) => {
    const logEndRef = useRef<HTMLDivElement>(null);
    const [stimulus, setStimulus] = useState('');

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [eventLog]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (stimulus.trim() && !isLoading) {
            onProvideStimulus(stimulus.trim());
            setStimulus('');
        }
    };

    const getMessageStyle = (type: EventLogMessage['type']) => {
        switch (type) {
            case 'thought':
                return "bg-slate-800/60 border-slate-700/50 text-slate-300 italic self-start";
            case 'dialogue':
                return "bg-indigo-900/50 border-indigo-700/50 text-indigo-200 self-start";
            case 'system':
                return "bg-transparent text-slate-500 self-center text-xs italic text-center w-full";
            default:
                return "bg-slate-700 text-slate-300";
        }
    };

    return (
        <div className="md:w-1/3 flex flex-col bg-slate-900/80 backdrop-blur-sm h-full border-l-2 border-slate-800">
            {/* Status Display */}
            <div className="p-4 border-b border-slate-700/50">
                <h2 className="text-lg font-bold text-teal-300">{status.name}</h2>
                <p className="text-sm text-slate-400"><span className="font-semibold text-slate-300">Location:</span> {status.location}</p>
                <p className="text-sm text-slate-400"><span className="font-semibold text-slate-300">Activity:</span> {status.activity}</p>
            </div>

            {/* Event Log */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
                {eventLog.map((msg) => (
                    <div key={msg.id} className={`max-w-md lg:max-w-lg p-3 rounded-lg border text-sm ${getMessageStyle(msg.type)}`}>
                         <p className="whitespace-pre-wrap">{msg.type === 'dialogue' ? `"${msg.text}"` : msg.text}</p>
                    </div>
                ))}
                {isLoading && (
                    <div className="self-start">
                        <LoadingIndicator />
                    </div>
                )}
                <div ref={logEndRef} />
            </div>
            
            {/* Stimulus Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
                <div className="relative">
                    <input
                        type="text"
                        value={stimulus}
                        onChange={(e) => setStimulus(e.target.value)}
                        placeholder={isLoading ? "Subject is processing..." : "Provide stimulus..."}
                        disabled={isLoading}
                        className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !stimulus.trim()}
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-full h-8 w-8 flex items-center justify-center transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                          <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ControlConsole;
