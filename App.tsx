import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import StickyNote from './components/StickyNote';
import Envelope from './components/Envelope';
import BookCover from './components/BookCover';

const App: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showFullBook, setShowFullBook] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
    } else {
      // If book is already visible/open, clicking it again opens the full page
      setShowFullBook(true);
    }
  };

  if (showFullBook) {
    return <BookCover />;
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center justify-center py-12 px-4 selection:bg-red-100">
      <HeartBackground />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg md:max-w-2xl mx-auto flex flex-col items-center gap-8 md:gap-12 transition-all duration-300">
        
        {/* 1. Sticky Note Section */}
        <div className="w-full flex justify-center pt-4 scale-100 hover:scale-105 transition-transform duration-300">
          <StickyNote />
        </div>

        {/* 2. Text Prompt */}
        <div className="text-center space-y-2 md:space-y-3">
          <p className="font-marker text-xl md:text-3xl text-red-800/90 rotate-[-1deg]">
            You think I forgot your Valentine's gift ?
          </p>
          <p className="font-marker text-xl md:text-3xl text-red-800/90 font-bold rotate-[1deg]">
            NO CHANCE!
          </p>
          <p 
            className="font-marker text-lg md:text-2xl text-red-600 mt-4 underline decoration-wavy decoration-red-300 underline-offset-4 animate-pulse cursor-pointer hover:text-red-700 transition-colors"
            onClick={handleEnvelopeClick}
          >
            Click on the book to get your surprise
          </p>
        </div>

        {/* 3. Envelope/Book Section */}
        <div className="mt-8 mb-4 md:mt-12">
          <Envelope isOpen={isBookOpen} onClick={handleEnvelopeClick} />
        </div>
      </div>
    </div>
  );
};

export default App;