import React, { useState } from 'react';
import { StickyNoteProps } from '../types';

const StickyNote: React.FC<StickyNoteProps> = ({ className }) => {
  const [yesPressed, setYesPressed] = useState(false);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});

  const handleNoAction = () => {
    // Random position within the parent container
    // Using specific ranges to try and keep it somewhat visible but chaotic
    const top = Math.floor(Math.random() * 80) + '%';
    const left = Math.floor(Math.random() * 80) + '%';
    
    setNoStyle({
      position: 'absolute',
      top: top,
      left: left,
      transition: 'all 0.15s ease-out',
      zIndex: 50,
    });
  };

  return (
    <div className={`relative bg-[#FFF9C4] p-6 w-64 md:w-80 mx-auto rotate-[-2deg] note-shadow transition-all duration-300 ${className}`}>
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 md:w-32 md:h-10 bg-white/40 rotate-1 shadow-sm backdrop-blur-sm"></div>
      
      <div className="text-center space-y-2 md:space-y-4">
        <h2 className="font-marker text-3xl md:text-5xl text-red-500 font-bold tracking-wide leading-none">
          WILL YOU BE MY<br />VALENTINE<span className="text-4xl md:text-6xl">?</span>
        </h2>
        
        <div className="flex justify-center items-center gap-6 md:gap-8 mt-4 relative min-h-[3rem]">
          {/* Yes Option */}
          <div 
            className="flex items-center gap-2 cursor-pointer group select-none"
            onClick={() => setYesPressed(!yesPressed)}
          >
            <div className={`relative w-6 h-6 md:w-8 md:h-8 border-2 border-red-800 rounded-sm bg-white flex items-center justify-center transition-colors ${yesPressed ? 'bg-red-50' : ''}`}>
              {/* Checkmark */}
              <svg 
                className={`w-6 h-6 md:w-10 md:h-10 text-red-600 absolute -top-1 -left-1 md:-top-2 md:-left-2 transition-all duration-300 ${yesPressed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="font-marker text-xl md:text-2xl text-gray-700 group-hover:text-red-600 transition-colors">Yes</span>
          </div>
          
          {/* No Option */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none transition-all duration-150"
            style={noStyle}
            onMouseEnter={handleNoAction}
            onClick={handleNoAction}
          >
             <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-red-800 rounded-sm bg-white"></div>
             <span className="font-marker text-xl md:text-2xl text-gray-700">No</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
