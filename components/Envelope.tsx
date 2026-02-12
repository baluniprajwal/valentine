import React from 'react';
import { EnvelopeProps } from '../types';

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick }) => {
  return (
    <div 
      className="relative w-72 h-72 md:w-96 md:h-96 mx-auto cursor-pointer group transition-transform hover:scale-105 duration-300"
      onClick={onClick}
    >
      {/* Mini cover textures (match big book) */}
      <style>{`
        .red-texture {
          background-color: #9F1212;
          background-image: url("https://www.transparenttextures.com/patterns/washi.png");
          background-blend-mode: multiply;
        }
        .washi-tape {
           position: absolute;
           height: 24px;
           width: 80px;
           background-color: rgba(230, 100, 100, 0.4);
           backdrop-filter: blur(1px);
           box-shadow: 0 1px 2px rgba(0,0,0,0.1);
           z-index: 20;
           opacity: 0.9;
        }
        .tape-dots {
            background-image: radial-gradient(rgba(255,255,255,0.5) 20%, transparent 20%);
            background-size: 10px 10px;
        }
      `}</style>
      {/* 
        Layering order is critical here for the effect:
        1. Back of envelope (behind everything)
        2. Book (slides up/down inside)
        3. Front of envelope (the 'V' pocket)
      */}

      {/* 1. Back of Envelope - 75% height of container */}
      <div className="absolute bottom-0 w-full h-[75%] bg-[#B71C1C] rounded-b-md shadow-lg z-10"></div>

      {/* 1b. Top Flap (Open) - Added to make it look like an open envelope */}
      <div className="absolute bottom-[75%] w-full h-[35%] z-10 flex justify-center origin-bottom">
         <svg viewBox="0 0 300 100" className="w-full h-full drop-shadow-sm" preserveAspectRatio="none">
           <path d="M0,100 L150,0 L300,100 Z" fill="#B71C1C" />
         </svg>
      </div>
      
      {/* 2. The Book/Magazine */}
      <div className={`
        absolute left-1/2 transform -translate-x-1/2 
        w-[66%] h-[49vh] bg-white z-20 transition-all duration-700 ease-in-out book-shadow
        ${isOpen ? '-translate-y-[55%]' : 'translate-y-[5%]'}
      `}>
        {/* Book Cover Design */}
        <div className="w-full h-full relative overflow-hidden red-texture border-l-4 border-black/20">
          <div className="absolute inset-0 scale-[0.85] origin-top">
            <div className="text-center text-[#F5F5F5] mb-6 relative z-10 pt-6 px-6">
               <h1 className="font-serif-display text-4xl leading-[0.85] mb-2 tracking-tight">OUR STORY</h1>
               <div className="mt-4 text-white/40 text-[10px] tracking-[0.3em] font-cursive scale-x-150">xxxxxxxxxxxxx</div>
            </div>
            <div className="flex-1 w-full relative mx-auto bg-black shadow-lg transform rotate-1 px-2">
               <div className="absolute inset-0 border-4 border-white/10 z-20 pointer-events-none"></div>
               <img src="/meAndHer/meAndHER4.jpeg" alt="Couple" className="w-full h-full object-cover grayscale contrast-[1.15] brightness-110" />
               
               {/* Handwritten Cover Note */}
               <div className="absolute bottom-3 right-3 transform -rotate-12 z-30">
                   <p className="font-marker text-white text-sm drop-shadow-md">Open me! &rarr;</p>
               </div>
               {/* Fragile Sticker */}
               <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-[7px] font-bold tracking-widest border border-white/50 rotate-[-5deg] shadow-md uppercase z-30">
                  Fragile: Handle w/ Love
               </div>
               {/* Washi Tape on Cover */}
               <div className="washi-tape tape-dots -top-2 right-10 rotate-[-45deg] opacity-80"></div>
               {/* Barcode Sticker */}
               <div className="absolute bottom-2 left-2 bg-white px-1 py-0.5 transform rotate-90 origin-bottom-left opacity-80">
                  <div className="h-7 w-20 flex items-end gap-[1px]">
                    {Array.from({length:24}).map((_,i) => (
                      <div key={i} className="bg-black" style={{width: Math.random() > 0.5 ? '2px' : '1px', height: Math.random() > 0.5 ? '100%' : '80%'}}></div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Front of Envelope (The Pocket) - 62.5% height of container */}
      <div className="absolute bottom-0 w-full h-[62.5%] z-30 pointer-events-none">
        {/* 
           Using SVG to create the exact "V" shape pocket 
           Color: Red (#D32F2F) - slightly lighter than back to show depth
           preserveAspectRatio="none" allows the SVG to stretch to fill the new responsive container dimensions
        */}
        <svg viewBox="0 0 300 200" className="w-full h-full drop-shadow-md" preserveAspectRatio="none">
          {/* Left Flap */}
          <path d="M0,200 L0,0 L150,120 L0,200" fill="#D32F2F" />
          {/* Right Flap */}
          <path d="M300,200 L300,0 L150,120 L300,200" fill="#C62828" />
          {/* Bottom center blend to make it look cohesive */}
          <path d="M0,200 L150,120 L300,200 Z" fill="#B71C1C" />
        </svg>
      </div>
    </div>
  );
};

export default Envelope;
