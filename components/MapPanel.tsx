
import React from 'react';
import { SubjectStatus } from '../types';

interface MapPanelProps {
  status: SubjectStatus;
}

const MapPanel: React.FC<MapPanelProps> = ({ status }) => {
  return (
    <div className="h-64 md:h-full w-full bg-slate-800 relative overflow-hidden border-t-4 md:border-t-0 md:border-r-4 border-slate-700/50">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Subject's Icon */}
      <div 
        className="absolute transition-all duration-1000 ease-in-out" 
        style={{ 
            left: `${status.position.x}%`, 
            top: `${status.position.y}%`, 
            transform: 'translate(-50%, -50%)' 
        }}
        title={`Location: ${status.location}`}
      >
        <div className="w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center ring-2 ring-slate-900">
            <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute inset-0 rounded-full border border-teal-400 animate-ping"></div>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs bg-slate-900/80 px-2 py-0.5 rounded text-teal-300 whitespace-nowrap">{status.name}</span>
      </div>
    </div>
  );
};

export default MapPanel;
