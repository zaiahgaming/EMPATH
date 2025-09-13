
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 p-2">
      <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse"></div>
    </div>
  );
};

export default LoadingIndicator;
