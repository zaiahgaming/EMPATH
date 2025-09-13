import React from 'react';
import { ElaraStatus } from '../types';

interface MapPanelProps {
  status: ElaraStatus;
}

const mapLocations = [
    { name: 'Apartment', x: 25, y: 30 },
    { name: 'Chronos Institute', x: 70, y: 25 },
    { name: 'Lumina Park', x: 55, y: 75 },
    { name: 'Old Market', x: 20, y: 65 },
    { name: "Dr. Thorne's", x: 80, y: 80 },
];

const MapPanel: React.FC<MapPanelProps> = ({ status }) => {
  return (
    <div className="flex-1 md:w-2/3 bg-slate-800 relative overflow-hidden border-t-4 md:border-t-0 md:border-l-4 border-indigo-900/50">
      <img 
        src="https://images.unsplash.com/photo-1549642332-99877c1f08a4?q=80&w=2938&auto=format&fit=crop" 
        alt="Map of Aethelburg" 
        className="w-full h-full object-cover opacity-30" 
      />
      
      {mapLocations.map(loc => (
          <div key={loc.name} className="absolute text-center" style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}>
              <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
              <span className="text-xs text-indigo-300/60 font-semibold uppercase tracking-wider">{loc.name}</span>
          </div>
      ))}

      {/* Elara's Icon */}
      <div 
        className="absolute w-6 h-6 transition-all duration-1000 ease-in-out" 
        style={{ 
            left: `${status.position.x}%`, 
            top: `${status.position.y}%`, 
            transform: 'translate(-50%, -50%)' 
        }}
      >
        <div className="w-full h-full rounded-full bg-teal-400 flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-ping"></div>
      </div>
    </div>
  );
};

export default MapPanel;