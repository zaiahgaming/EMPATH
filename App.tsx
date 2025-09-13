
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapPanel from './components/MapPanel';
import ControlConsole from './components/ControlConsole';
import { EventLogMessage, SubjectStatus } from './types';
import { getSubjectUpdate } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subjectStatus, setSubjectStatus] = useState<SubjectStatus>({
        name: "Subject...",
        location: "Initializing...",
        activity: "Calibrating...",
        position: { x: 50, y: 50 },
        conditions: [],
    });

    const [eventLog, setEventLog] = useState<EventLogMessage[]>([]);
    
    // Initial boot-up sequence for the subject
    useEffect(() => {
        handleProvideStimulus("You wake up. Describe your first thoughts and your surroundings.");
    }, []);


    const parseAndProcessUpdate = (text: string) => {
        let remainingText = text;

        // Use a function for safe parsing to avoid crashes on malformed tags
        const parseTag = (tagName: string) => {
            const regex = new RegExp(`\\[${tagName}:\\s*([^\\]]+)\\]`, 'i');
            const match = remainingText.match(regex);
            if (match) {
                remainingText = remainingText.replace(regex, '').trim();
                return match[1].trim();
            }
            return null;
        };

        const newStatus = { ...subjectStatus };
        
        const name = parseTag('NAME');
        if (name) newStatus.name = name;
        
        const location = parseTag('LOCATION');
        if (location) newStatus.location = location;

        const activity = parseTag('ACTIVITY');
        if (activity) newStatus.activity = activity;
        
        const positionStr = parseTag('POSITION');
        if (positionStr) {
            const [x, y] = positionStr.split(',').map(Number);
            if (!isNaN(x) && !isNaN(y)) {
                newStatus.position = { x, y };
            }
        }
        setSubjectStatus(newStatus);
        
        // Parse thoughts and dialogues
        const newLogMessages: EventLogMessage[] = [];
        const contentRegex = /\[(THOUGHT|DIALOGUE)\]([\s\S]*?)\[\/\1\]/gi;
        let match;
        while ((match = contentRegex.exec(remainingText)) !== null) {
            newLogMessages.push({
                id: uuidv4(),
                type: match[1].toLowerCase() as 'thought' | 'dialogue',
                text: match[2].trim(),
            });
        }
        
        if (newLogMessages.length > 0) {
            setEventLog(prev => [...prev, ...newLogMessages]);
        }
    };


    const handleProvideStimulus = async (stimulus: string) => {
        setIsLoading(true);
        if (stimulus) {
            setEventLog(prev => [...prev, { id: uuidv4(), type: 'system', text: `Stimulus: ${stimulus}` }]);
        }

        try {
            const responseText = await getSubjectUpdate(stimulus, subjectStatus);
            parseAndProcessUpdate(responseText);

        } catch (error) {
            console.error("Failed to get subject update:", error);
            const errorMessage: EventLogMessage = { id: uuidv4(), type: 'system', text: "A critical error occurred in the simulation." };
            setEventLog(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 text-white h-screen flex flex-col font-mono">
            <Header />
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="flex-1 flex flex-col md:w-2/3">
                   <MapPanel status={subjectStatus} />
                </div>
                <ControlConsole 
                    status={subjectStatus}
                    eventLog={eventLog} 
                    onProvideStimulus={handleProvideStimulus} 
                    isLoading={isLoading} 
                />
            </main>
        </div>
    );
};

export default App;
