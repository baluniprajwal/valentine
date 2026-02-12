import React, { useEffect, useRef, useState } from 'react';

const BookCover: React.FC = () => {
  const [page, setPage] = useState(0); 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // 0: Closed
  // 1: Vedanshi / Prajwal
  // 2: Things Loves / Message
  // 3: Tic Tac Toe / How We Meet
  // 4: First Date / December Calendar
  // 5: My Space / I Love You
  // 6: Love Letter / Music
  // 7: Our Best Moment (Left) / Our Best Moment (Right)
  // 8: Back Cover (Love You)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (page < 8) setPage(page + 1);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (page > 0) setPage(page - 1);
  };

  // Logic to center the book based on state
  // Page 0: Centered (Cover)
  // Page 1-7: Spine Centered (Spread) -> translate 50%
  // Page 8: Back Cover Centered -> translate 100% (since back cover is to the left of spine)
  const getBookPositionClass = () => {
    if (page === 0) return '';
    if (page === 8) return 'translate-x-[100%]';
    return 'translate-x-[50%]';
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (page === 6) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [page]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onPause);
    };
  }, []);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e8dfd1] p-4 overflow-hidden [perspective:2000px]">
      
      {/* Texture styles */}
      <style>{`
        .paper-texture {
          background-color: #fcfbf9;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
        }
        .red-texture {
          background-color: #9F1212;
          background-image: url("https://www.transparenttextures.com/patterns/washi.png");
          background-blend-mode: multiply;
        }
        .stripes-texture {
          background-color: #fdfbf7;
          background-image: repeating-linear-gradient(90deg, transparent, transparent 20px, #f2ebe5 20px, #f2ebe5 21px);
        }
        /* Improved Notebook Paper */
        .notebook-paper {
          background-color: #fff;
          background-image: 
            linear-gradient(90deg, transparent 39px, #f87171 39px, #f87171 40px, transparent 40px), /* Red Margin */
            linear-gradient(#e5e7eb 1px, transparent 1px); /* Blue Lines */
          background-size: 100% 1.25rem; /* 20px lines */
          background-position: 0 1rem;
          box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
        }
        
        /* Torn Paper Edge Effect */
        .torn-paper {
            background: #fff;
            position: relative;
        }
        .torn-edge-bottom {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: #fff;
            -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,20 L10,10 L20,20 L30,10 L40,20 L50,10 L60,20 L70,10 L80,20 L90,10 L100,20 L100,0 Z' fill='black'/%3E%3C/svg%3E");
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,20 L10,10 L20,20 L30,10 L40,20 L50,10 L60,20 L70,10 L80,20 L90,10 L100,20 L100,0 Z' fill='black'/%3E%3C/svg%3E");
        }

        /* Rich Red Background Pattern */
        .red-pattern {
           background-color: #8B0000;
           background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0);
           background-size: 20px 20px;
        }

        /* Washi Tape Style */
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
        .tape-beige { background-color: rgba(240, 230, 200, 0.7); }
        .tape-pink { background-color: rgba(255, 180, 180, 0.6); }
        .tape-teal { background-color: rgba(100, 200, 200, 0.5); }
        .tape-pattern {
            background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 10px, transparent 10px, transparent 20px);
        }
        .tape-dots {
            background-image: radial-gradient(rgba(255,255,255,0.5) 20%, transparent 20%);
            background-size: 10px 10px;
        }
        
        /* Scalloped/Wavy Edge Logic */
        .scalloped-paper {
          background: #FDFBF7;
          position: relative;
        }
        .scalloped-paper::before {
          content: "";
          position: absolute;
          top: -6px; bottom: -6px; left: 0; right: 0;
          background-image: radial-gradient(circle at 6px 6px, #FDFBF7 6px, transparent 6.5px);
          background-size: 12px 12px;
          background-repeat: repeat-x;
          background-position: top left, bottom left;
        }
        .scalloped-paper::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0; left: -6px; right: -6px;
          background-image: radial-gradient(circle at 6px 6px, #FDFBF7 6px, transparent 6.5px);
          background-size: 12px 12px;
          background-repeat: repeat-y;
          background-position: top left, top right;
        }
        /* Corners filler */
        .scalloped-corners {
           position: absolute;
           inset: -6px;
           pointer-events: none;
           z-index: 1;
        }
        .scalloped-corners::before {
           content: "";
           position: absolute;
           top: 0; left: 0; width: 12px; height: 12px;
           background: #FDFBF7;
           border-radius: 50%;
        }
        .scalloped-corners::after {
           content: "";
           position: absolute;
           top: 0; right: 0; width: 12px; height: 12px;
           background: #FDFBF7;
           border-radius: 50%;
        }
        /* Handwritten Letter Paper */
        .script-paper {
          background-color: #fbf7f2;
          background-image:
            repeating-linear-gradient(0deg, rgba(120,90,80,0.08) 0, rgba(120,90,80,0.08) 1px, transparent 1px, transparent 16px),
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0);
          background-size: 100% 16px, 14px 14px;
          box-shadow: 3px 6px 18px rgba(0,0,0,0.2);
        }

        /* Photo Corners */
        .photo-corner {
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            z-index: 20;
            filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.3));
        }
        .photo-corner-tl {
            top: -1px; left: -1px;
            border-width: 20px 20px 0 0;
            border-color: #fdfbf7 transparent transparent transparent;
        }
        .photo-corner-tr {
            top: -1px; right: -1px;
            border-width: 0 20px 20px 0;
            border-color: transparent #fdfbf7 transparent transparent;
        }
        .photo-corner-bl {
            bottom: -1px; left: -1px;
            border-width: 20px 0 0 20px;
            border-color: transparent transparent transparent #fdfbf7;
        }
        .photo-corner-br {
            bottom: -1px; right: -1px;
            border-width: 0 0 20px 20px;
            border-color: transparent transparent #fdfbf7 transparent;
        }
        /* Gold variant */
        .pc-gold.photo-corner-tl { border-color: #d4af37 transparent transparent transparent; }
        .pc-gold.photo-corner-tr { border-color: transparent #d4af37 transparent transparent; }
        .pc-gold.photo-corner-bl { border-color: transparent transparent transparent #d4af37; }
        .pc-gold.photo-corner-br { border-color: transparent transparent #d4af37 transparent; }

        /* Black variant */
        .pc-black.photo-corner-tl { border-color: #212121 transparent transparent transparent; }
        .pc-black.photo-corner-tr { border-color: transparent #212121 transparent transparent; }
        .pc-black.photo-corner-bl { border-color: transparent transparent transparent #212121; }
        .pc-black.photo-corner-br { border-color: transparent transparent #212121 transparent; }

        /* Cassette */
        .cassette {
          width: 90%;
          max-width: 320px;
          aspect-ratio: 4 / 2.5;
          background: linear-gradient(180deg, #f2e7d8 0%, #e3d1bc 100%);
          border: 2px solid #c6b19a;
          border-radius: 14px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.2);
          position: relative;
          padding: 14px;
        }
        .cassette.playing {
          animation: cassette-wobble 2.2s ease-in-out infinite;
        }
        .cassette-inner {
          position: absolute;
          inset: 10px;
          border: 2px solid #d3c1ad;
          border-radius: 10px;
          background: linear-gradient(180deg, #f9f3ec, #f1e6db);
        }
        .cassette-window {
          position: absolute;
          top: 20%;
          left: 12%;
          right: 12%;
          height: 42%;
          background: #2a241f;
          border-radius: 8px;
          border: 2px solid #1f1a15;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12%;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.05);
        }
        .cassette-spool {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 3px solid #c9b8a4;
          background: radial-gradient(circle, #f6efe6 0 35%, #c9b8a4 36% 38%, #f6efe6 39% 100%);
          position: relative;
        }
        .cassette-spool::after {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 50%;
          border: 2px solid #b59f88;
          box-shadow: inset 0 0 0 2px rgba(0,0,0,0.08);
        }
        .cassette-spool.playing {
          animation: cassette-spin 1.4s linear infinite;
        }
        .cassette-spool::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, rgba(0,0,0,0.12) 0 10deg, transparent 10deg 20deg, rgba(0,0,0,0.12) 20deg 30deg, transparent 30deg 40deg, rgba(0,0,0,0.12) 40deg 50deg, transparent 50deg 60deg, rgba(0,0,0,0.12) 60deg 70deg, transparent 70deg 80deg, rgba(0,0,0,0.12) 80deg 90deg, transparent 90deg 100deg, rgba(0,0,0,0.12) 100deg 110deg, transparent 110deg 120deg, rgba(0,0,0,0.12) 120deg 130deg, transparent 130deg 140deg, rgba(0,0,0,0.12) 140deg 150deg, transparent 150deg 160deg, rgba(0,0,0,0.12) 160deg 170deg, transparent 170deg 180deg, rgba(0,0,0,0.12) 180deg 190deg, transparent 190deg 200deg, rgba(0,0,0,0.12) 200deg 210deg, transparent 210deg 220deg, rgba(0,0,0,0.12) 220deg 230deg, transparent 230deg 240deg, rgba(0,0,0,0.12) 240deg 250deg, transparent 250deg 260deg, rgba(0,0,0,0.12) 260deg 270deg, transparent 270deg 280deg, rgba(0,0,0,0.12) 280deg 290deg, transparent 290deg 300deg, rgba(0,0,0,0.12) 300deg 310deg, transparent 310deg 320deg, rgba(0,0,0,0.12) 320deg 330deg, transparent 330deg 340deg, rgba(0,0,0,0.12) 340deg 350deg, transparent 350deg 360deg);
          opacity: 0.25;
        }
        .cassette-tape {
          position: absolute;
          top: 50%;
          left: 22%;
          right: 22%;
          height: 3px;
          background: linear-gradient(90deg, #7b6a58, #9a8874, #7b6a58);
          transform: translateY(-50%);
          box-shadow: 0 0 4px rgba(0,0,0,0.25);
        }
        .cassette.playing .cassette-tape {
          animation: tape-sheen 1.1s ease-in-out infinite;
        }
        .cassette-tape.playing {
          background-size: 40px 100%;
          animation: tape-move 0.8s linear infinite;
        }
        .cassette-label {
          position: absolute;
          bottom: 12%;
          left: 10%;
          right: 10%;
          height: 28%;
          background: #fbf7f0;
          border: 1px dashed #d3c2ae;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px 10px;
          gap: 2px;
          text-align: center;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
        }
        .cassette-screws {
          position: absolute;
          inset: 8px;
          pointer-events: none;
        }
        .cassette-screw {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a08f7c;
          position: absolute;
        }
        .cassette-screw.tl { top: 0; left: 0; }
        .cassette-screw.tr { top: 0; right: 0; }
        .cassette-screw.bl { bottom: 0; left: 0; }
        .cassette-screw.br { bottom: 0; right: 0; }
        @keyframes cassette-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cassette-wobble {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(0.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes tape-sheen {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes tape-move {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }

        .vu-meter {
          position: absolute;
          top: 12%;
          right: 10%;
          display: flex;
          gap: 3px;
          align-items: flex-end;
          height: 30px;
          padding: 4px 6px;
          border-radius: 6px;
          background: rgba(43,38,32,0.06);
          border: 1px solid rgba(43,38,32,0.08);
        }
        .vu-bar {
          width: 4px;
          height: 6px;
          background: #b85c61;
          border-radius: 2px;
          opacity: 0.8;
          animation: vu-bounce 1s ease-in-out infinite;
        }
        .vu-bar:nth-child(2) { animation-delay: 0.15s; height: 10px; }
        .vu-bar:nth-child(3) { animation-delay: 0.3s; height: 14px; }
        .vu-bar:nth-child(4) { animation-delay: 0.45s; height: 8px; }
        .vu-bar:nth-child(5) { animation-delay: 0.6s; height: 12px; }
        .vu-paused .vu-bar {
          animation-play-state: paused;
          opacity: 0.4;
        }
        @keyframes vu-bounce {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        .music-paper {
          background:
            radial-gradient(circle at 10% 10%, rgba(201, 93, 93, 0.12), transparent 35%),
            radial-gradient(circle at 90% 20%, rgba(201, 93, 93, 0.12), transparent 40%),
            linear-gradient(180deg, #fffdf9, #f7f1e9);
        }
        .music-grid {
          background-image:
            repeating-linear-gradient(0deg, rgba(120,90,80,0.06) 0, rgba(120,90,80,0.06) 1px, transparent 1px, transparent 18px),
            repeating-linear-gradient(90deg, rgba(120,90,80,0.04) 0, rgba(120,90,80,0.04) 1px, transparent 1px, transparent 18px);
          animation: grid-drift 12s linear infinite;
        }
        @keyframes grid-drift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 18px, 18px 0; }
        }
        .music-fade-in {
          animation: music-fade 800ms ease-out both;
        }
        @keyframes music-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .music-note {
          position: absolute;
          font-size: 26px;
          color: rgba(120,90,80,0.75);
          text-shadow: 0 4px 10px rgba(0,0,0,0.12);
          animation: note-float 3.4s ease-in-out infinite;
          z-index: 2;
        }
        .music-note.n1 { top: 8%; left: 9%; animation-delay: 0s; }
        .music-note.n2 { top: 18%; right: 10%; animation-delay: 0.5s; font-size: 30px; }
        .music-note.n3 { bottom: 22%; left: 10%; animation-delay: 0.9s; font-size: 28px; }
        .music-note.n4 { bottom: 12%; right: 14%; animation-delay: 1.3s; font-size: 24px; }
        .music-note.n5 { top: 38%; left: 6%; animation-delay: 1.8s; font-size: 22px; }
        .music-note.n6 { top: 42%; right: 6%; animation-delay: 2.1s; font-size: 22px; }
        @keyframes note-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-10px) rotate(6deg); opacity: 0.95; }
        }
        .pulse-ring {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rgba(184,92,97,0.5);
          animation: ring-pulse 1.6s ease-out infinite;
        }
        @keyframes ring-pulse {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .music-glow {
          position: absolute;
          inset: 10% 12%;
          background: radial-gradient(circle at 50% 40%, rgba(201, 93, 93, 0.18), transparent 55%);
          filter: blur(18px);
          opacity: 0.6;
          pointer-events: none;
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .music-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 35%, transparent 60%);
          transform: translateX(-120%);
          animation: sheen-sweep 5s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.35;
        }
        @keyframes sheen-sweep {
          0%, 35% { transform: translateX(-120%); }
          60%, 100% { transform: translateX(120%); }
        }
        .music-title {
          display: inline-block;
          animation: title-float 3.5s ease-in-out infinite;
        }
        @keyframes title-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .music-subtitle {
          animation: subtitle-pulse 3s ease-in-out infinite;
        }
        @keyframes subtitle-pulse {
          0%, 100% { opacity: 0.6; letter-spacing: 0.2em; }
          50% { opacity: 1; letter-spacing: 0.28em; }
        }
        .cassette.playing {
          animation: cassette-wobble 2.2s ease-in-out infinite, cassette-bob 3.6s ease-in-out infinite;
        }
        @keyframes cassette-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.04); }
        }
        .cassette-shadow {
          position: absolute;
          width: 72%;
          height: 18px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.25), transparent 65%);
          bottom: -8px;
          left: 14%;
          filter: blur(6px);
          animation: shadow-breathe 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shadow-breathe {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.06); opacity: 0.5; }
        }
      `}</style>

      {/* Book Container - shifts right when open to center the spread */}
      <div 
        className={`relative w-[320px] md:w-[480px] aspect-[3/4.5] transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] ${getBookPositionClass()}`}
      >
        
        {/* --- LAYER 1: COVER & VEDANSHI PAGE --- */}
        <div 
          onClick={page === 0 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-2xl
            ${page > 0 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page === 0 ? 70 : 5 }}
        >
          {/* FRONT: RED COVER */}
          <div className="absolute inset-0 [backface-visibility:hidden] red-texture flex flex-col pt-10 px-8 pb-8 border-l-[12px] border-black/20 overflow-hidden">
             <div className="text-center text-[#F5F5F5] mb-6 relative z-10">
                <h1 className="font-serif-display text-5xl md:text-6xl leading-[0.85] mb-2 tracking-tight">OUR STORY</h1>
                <div className="mt-5 text-white/40 text-sm tracking-[0.3em] font-cursive scale-x-150">xxxxxxxxxxxxx</div>
             </div>
             <div className="flex-1 w-full relative mx-auto bg-black shadow-lg transform rotate-1">
                <div className="absolute inset-0 border-4 border-white/10 z-20 pointer-events-none"></div>
                <img src="/meAndHer/meAndHER4.jpeg" alt="Couple" className="w-full h-full object-cover grayscale contrast-[1.15] brightness-110" />
                
                {/* Handwritten Cover Note */}
                <div className="absolute bottom-4 right-4 transform -rotate-12 z-30">
                    <p className="font-marker text-white text-lg drop-shadow-md">Open me! &rarr;</p>
                </div>
                {/* Fragile Sticker */}
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-[8px] font-bold tracking-widest border border-white/50 rotate-[-5deg] shadow-md uppercase z-30">
                   Fragile: Handle w/ Love
                </div>
                {/* Washi Tape on Cover */}
                <div className="washi-tape tape-dots -top-2 right-12 rotate-[-45deg] opacity-80"></div>
                {/* Barcode Sticker */}
                <div className="absolute bottom-2 left-2 bg-white px-1 py-0.5 transform rotate-90 origin-bottom-left opacity-80">
                   <div className="h-8 w-24 flex items-end gap-[1px]">
                     {Array.from({length:30}).map((_,i) => (
                       <div key={i} className="bg-black" style={{width: Math.random() > 0.5 ? '2px' : '1px', height: Math.random() > 0.5 ? '100%' : '80%'}}></div>
                     ))}
                   </div>
                </div>
             </div>
          </div>

          {/* BACK: LEFT PAGE 1 (VEDANSHI) */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] paper-texture p-6 md:p-8 flex flex-col border-r border-gray-300 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent w-8 pointer-events-none"></div>
             
             {/* Coffee Stain Top Right */}
             <div className="absolute -top-6 -right-6 w-32 h-32 border-[12px] border-[#6D4C41]/10 rounded-full z-0 pointer-events-none blur-sm"></div>
             
             {/* Content Container */}
             <div className="h-full w-full relative z-10">
                
                {/* Title */}
                <div className="relative mb-4">
                  <h2 className="font-serif-display text-4xl text-[#8B3A3A] drop-shadow-sm border-b-2 border-[#8B3A3A]/20 inline-block pb-1">Vedanshi</h2>
                  {/* Scribble heart */}
                  <svg className="absolute -right-8 -top-2 w-10 h-10 text-[#D32F2F] opacity-80 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M50,30 Q70,5 90,30 T50,80 Q30,55 10,30 T50,30" />
                  </svg>
                </div>

                {/* Text Block - Top Left/Mid */}
                <div className="relative w-[65%] z-20 mb-4">
                    <div className="bg-[#fffefb] p-3 shadow-sm border border-gray-100 rotate-[-1deg] relative torn-paper">
                      <div className="torn-edge-bottom"></div>
                      {/* Paper Clip */}
                      <svg className="absolute -top-3 right-4 w-6 h-12 text-gray-400 z-30" viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M14,0 L14,30 Q14,38 6,38 Q-2,38 -2,30 L-2,8 Q-2,2 6,2 Q14,2 14,8 L14,25" transform="translate(3,0)" />
                      </svg>
                      <p className="font-serif text-[10px] md:text-[11px] leading-relaxed text-gray-800 text-justify">
                         <span className="float-left text-4xl font-serif-display text-[#8B3A3A] mr-2 mt-[-8px] leading-[0.8]">V</span>
                         edanshi is gentle, sincere, and romantic. She wears her heart on her sleeve. She is kind, thoughtful, and loyal, and she always goes the extra mile for the people she cares about. She is a baddie with a soft heart and a little bhondu in the cutest way. She can be shy and a bit awkward, but her patience and empathy make her quietly strong.
                      </p>
                    </div>
                    {/* Handwritten annotation */}
                    <div className="absolute -bottom-6 -right-2 transform rotate-[-5deg]">
                       <p className="font-marker text-[#5D4037] text-xs">My favorite human &uarr;</p>
                    </div>
                </div>

                {/* Stamp Seal */}
                <div className="absolute top-[30%] left-[-10px] w-16 h-16 border-2 border-red-700 rounded-full flex items-center justify-center opacity-70 rotate-[-15deg] z-10" style={{borderStyle: 'double'}}>
                   <div className="text-center">
                      <div className="text-[6px] text-red-700 uppercase tracking-widest">Certified</div>
                      <div className="text-[8px] font-bold text-red-700 uppercase">100%</div>
                      <div className="text-[6px] text-red-700 uppercase tracking-widest">Love</div>
                   </div>
                </div>

                {/* Collage Area */}
                
                {/* 1. Large Portrait (Top Right) */}
                <div className="absolute top-2 right-[-10px] w-[42%] bg-white p-2 pb-6 shadow-md transform rotate-3 transition-transform hover:scale-105 hover:z-30 duration-300">
                    <div className="washi-tape tape-beige -top-3 left-1/2 -translate-x-1/2 rotate-1"></div>
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                        <img src="/her/her1.jpeg" alt="Vedanshi 1" className="w-full h-full object-cover contrast-110" />
                        <div className="photo-corner pc-gold photo-corner-bl"></div>
                        <div className="photo-corner pc-gold photo-corner-tr"></div>
                    </div>
                    <span className="absolute bottom-1 right-2 font-marker text-[9px] text-gray-400">beautiful!</span>
                </div>

                {/* 2. Smaller Square (Middle Right overlapping) */}
                <div className="absolute top-[40%] right-[5%] w-[35%] bg-white p-2 pb-6 shadow-md transform -rotate-3 transition-transform hover:scale-105 hover:z-30 duration-300 z-10">
                    <div className="washi-tape tape-pink tape-dots -top-3 left-8 rotate-[-2deg]"></div>
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                        <img src="/her/her2.jpeg" alt="Vedanshi 2" className="w-full h-full object-cover sepia-[0.3]" />
                    </div>
                </div>

                {/* 3. Portrait (Bottom Left) */}
                <div className="absolute bottom-[5%] left-0 w-[35%] bg-white p-2 pb-6 shadow-md transform rotate-[-2deg] transition-transform hover:scale-105 hover:z-30 duration-300">
                     <div className="washi-tape tape-beige -top-3 right-4 rotate-2"></div>
                     <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                        <img src="/her/her3.jpeg" alt="Vedanshi 3" className="w-full h-full object-cover" />
                        <div className="photo-corner pc-black photo-corner-tl"></div>
                        <div className="photo-corner pc-black photo-corner-br"></div>
                    </div>
                </div>

                {/* 4. Landscape (Bottom Right) */}
                <div className="absolute bottom-0 right-[20%] w-[38%] bg-white p-2 pb-6 shadow-md transform rotate-3 transition-transform hover:scale-105 hover:z-30 duration-300 z-0">
                     <div className="washi-tape tape-pink -top-3 left-1/2 -translate-x-1/2 rotate-0"></div>
                     <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        <img src="/her/her4.jpeg" alt="Vedanshi 4" className="w-full h-full object-cover" />
                    </div>
                </div>

             </div>
             <div className="absolute bottom-2 left-4 text-[10px] text-gray-500 font-serif">1</div>
          </div>
        </div>


        {/* --- LAYER 2: PRAJWAL PAGE & LIST PAGE --- */}
        <div 
          onClick={page === 1 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 1 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 1 ? 60 : 10 }}
        >
           {/* FRONT: RIGHT PAGE 1 (PRAJWAL) */}
           <div className="absolute inset-0 [backface-visibility:hidden] paper-texture p-6 md:p-8 flex flex-col border-l border-gray-300 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-l from-gray-200/40 to-transparent w-4 pointer-events-none left-0"></div>
               
               <div className="h-full w-full relative z-10">
                  {/* Title - Top Right */}
                  <div className="flex justify-end mb-4 relative">
                     <h2 className="font-serif-display text-4xl text-[#555] drop-shadow-sm border-b-2 border-gray-400/20 inline-block pb-1">Prajwal</h2>
                     {/* Crown Doodle */}
                     <div className="absolute -top-6 -right-2 text-2xl rotate-12">👑</div>
                  </div>

                  {/* Collage Elements */}
                  
                  {/* 1. Top Left Photo */}
                  <div className="absolute top-0 left-[-5px] w-[40%] bg-white p-2 pb-6 shadow-md transform -rotate-2 transition-transform hover:scale-105 hover:z-30 duration-300 z-10">
                      {/* Torn Lined Paper Scrap behind */}
                      <div className="absolute -top-2 -left-2 w-full h-full bg-[#f8f9fa] border-l-2 border-red-200 -z-10 rotate-[-4deg]" style={{backgroundImage: 'repeating-linear-gradient(transparent, transparent 19px, #e9ecef 20px)'}}></div>
                      
                      <div className="washi-tape tape-pink -top-3 right-4 rotate-3"></div>
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                         <img src="/him/him1.jpeg" alt="Prajwal 1" className="w-full h-full object-cover sepia-[0.2]" />
                         <div className="photo-corner pc-black photo-corner-bl"></div>
                      </div>
                      <div className="absolute -bottom-2 -right-4 font-marker text-[#C62828] text-xs rotate-[-6deg]">King!</div>
                  </div>

                  {/* Text Block - Top Right/Mid */}
                  <div className="absolute top-16 right-0 w-[60%] z-20">
                      <div className="bg-[#fffefb] p-3 shadow-sm border border-gray-100 rotate-1 relative">
                          {/* Sticker Name Tag */}
                          <div className="absolute -top-4 -left-4 w-12 h-8 bg-red-500 rounded-lg flex items-center justify-center rotate-[-12deg] shadow-md z-30 border border-white">
                              <div className="bg-white w-[90%] h-[60%] flex items-center justify-center">
                                  <span className="text-[6px] font-bold text-black uppercase">Hello</span>
                              </div>
                          </div>
                          {/* Push Pin holding the note */}
                          <div className="absolute -top-2 right-1/2 z-40">
                             <div className="w-3 h-3 rounded-full bg-blue-400 shadow-md border border-black/10"></div>
                          </div>

                          <p className="font-serif text-[10px] md:text-[11px] leading-relaxed text-gray-700 text-justify">
                             <span className="float-left text-4xl font-serif-display text-[#555] mr-2 mt-[-8px] leading-[0.8]">P</span>
                             Vedanshi will write this part.
                          </p>
                      </div>
                  </div>

                  {/* 2. Middle Left Photo */}
                  <div className="absolute top-[35%] left-0 w-[35%] bg-white p-2 pb-6 shadow-md transform rotate-3 transition-transform hover:scale-105 hover:z-30 duration-300 z-10">
                      <div className="washi-tape tape-beige -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]"></div>
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                         <img src="/him/him2.jpeg" alt="Prajwal 2" className="w-full h-full object-cover sepia-[0.2]" />
                         <div className="photo-corner pc-gold photo-corner-tr"></div>
                      </div>
                  </div>

                  {/* 3. Bottom Right Photo */}
                  <div className="absolute bottom-[5%] right-[-5px] w-[35%] bg-white p-2 pb-6 shadow-md transform rotate-[-3deg] transition-transform hover:scale-105 hover:z-30 duration-300 z-10">
                      <div className="washi-tape tape-pink tape-dots -top-3 right-6 rotate-2"></div>
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img src="/him/him3.jpeg" alt="Prajwal 3" className="w-full h-full object-cover sepia-[0.2]" />
                      </div>
                  </div>

                  {/* 4. Bottom Left Photo */}
                  <div className="absolute bottom-0 left-[20%] w-[38%] bg-white p-2 pb-6 shadow-md transform rotate-1 transition-transform hover:scale-105 hover:z-30 duration-300 z-0">
                      <div className="washi-tape tape-beige -top-3 left-4 rotate-[-1deg]"></div>
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img src="/him/him4.jpeg" alt="Prajwal 4" className="w-full h-full object-cover sepia-[0.2]" />
                      </div>
                  </div>
                  
                  {/* Random scribbles */}
                  <div className="absolute bottom-16 right-16 opacity-40 rotate-12 pointer-events-none">
                     <svg width="40" height="20">
                        <path d="M0,10 Q20,0 40,10" fill="none" stroke="#555" strokeWidth="1" />
                     </svg>
                  </div>

               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-gray-500 font-serif">2</div>
           </div>

           {/* BACK: LEFT PAGE 2 (THINGS PRAJWAL LOVES) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] paper-texture p-6 md:p-8 flex flex-col border-r border-gray-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent w-8 pointer-events-none"></div>
              {/* Coffee Cup Ring */}
              <div className="absolute top-1/2 left-1/4 w-40 h-40 border-[8px] border-[#5D4037]/10 rounded-full blur-[2px] pointer-events-none"></div>

              <div className="flex flex-col h-full relative z-10">
                 <div className="mb-6 md:mb-8 relative">
                   <h2 className="font-serif-display text-3xl md:text-4xl text-[#8B3A3A] leading-none tracking-tight">
                     Things <span className="text-[#D32F2F] opacity-90 italic">Prajwal</span>
                   </h2>
                   <p className="font-serif-display text-xl text-gray-600 ml-1">loves about Vedanshi</p>
                   {/* Sticker */}
                   <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center shadow-sm transform rotate-12 border border-yellow-300">
                      <span className="font-marker text-[8px] text-center leading-tight">TRUE<br/>FACTS!</span>
                   </div>
                 </div>
                 <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-center px-1">
                    {[
                      "She makes me laugh even on bad days",
                      "She makes everyone around her feel cared for",
                      "She makes me smile when she says “pata hai, aaj kya hua”",
                      "She makes me feel understood and cared for",
                      "She makes even ordinary moments feel special"
                    ].map((text, idx) => (
                      <div key={idx} className="relative group flex items-center">
                         {/* Tape holding the list item */}
                         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 rotate-1 z-30 opacity-70"></div>

                         {/* Number bubble */}
                         <div className="absolute -left-3 md:-left-4 w-6 h-6 bg-[#333] text-white rounded-full flex items-center justify-center font-serif text-[10px] z-20">
                            {idx + 1}
                         </div>
                         <div className="w-full border border-[#8B3A3A]/20 rounded-full px-4 py-3 md:py-3 text-center transition-transform hover:scale-105 bg-white/40 shadow-sm backdrop-blur-[1px] relative z-10">
                           <p className="font-serif text-[10px] md:text-xs text-[#5D4037] font-medium leading-tight tracking-wide">{text}</p>
                         </div>
                         {/* Handwritten checkmark/heart randomly */}
                         {idx % 2 === 0 ? (
                            <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-green-600 font-marker text-lg opacity-80">✓</span>
                         ) : (
                            <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-red-400 font-marker text-lg opacity-80">♥</span>
                         )}
                      </div>
                    ))}
                 </div>
                 <div className="mt-6 text-center text-[#8B3A3A]/30 font-cursive text-xl tracking-[0.4em] select-none">
                    xxxxxxxx
                 </div>
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] text-gray-500 font-serif">3</div>
           </div>
        </div>


        {/* --- LAYER 3: MESSAGE & TIC TAC TOE --- */}
        <div 
          onClick={page === 2 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 2 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 2 ? 50 : 15 }}
        >
           {/* FRONT: RIGHT PAGE 2 (MESSAGE) */}
           <div className="absolute inset-0 [backface-visibility:hidden] red-texture flex flex-col p-6 md:p-8 border-l border-black/10">
               <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent w-4 pointer-events-none left-0"></div>
               <div className="h-full w-full relative flex flex-col">
                  {/* Title */}
                  <h2 className="font-serif-display text-3xl md:text-4xl text-[#f0e7db] mb-4 leading-tight drop-shadow-md">
                    A little<br/>message<br/>to Vedanshi
                  </h2>
                  <div className="absolute top-10 right-4 transform rotate-12 border-2 border-[#f0e7db]/50 p-1 px-2 rounded">
                     <span className="font-marker text-[#f0e7db] text-xs">Read me!</span>
                  </div>

                  {/* The Letter */}
                  <div className="flex-1 relative mt-2 perspective-[1000px]">
                     <div className="absolute inset-2 md:inset-4 paper-texture shadow-lg rotate-1 p-5 md:p-6 flex flex-col justify-between transform transition-transform hover:rotate-0 hover:scale-[1.02] duration-500 origin-top-left">
                        {/* Tape effect */}
                        <div className="washi-tape tape-teal tape-pattern -top-3 left-1/2 -translate-x-1/2 w-20 rotate-1 shadow-sm opacity-80"></div>
                        
                        {/* Cancelled Stamp Mark */}
                        <div className="absolute top-2 right-2 w-16 h-16 opacity-30 pointer-events-none">
                           <svg viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="none"/>
                             <path d="M20,50 L80,50 M50,20 L50,80" stroke="black" strokeWidth="1"/>
                             <text x="50" y="30" fontSize="10" textAnchor="middle">POSTAL</text>
                             <text x="50" y="80" fontSize="10" textAnchor="middle">SERVICE</text>
                             <path d="M10,40 Q30,60 50,40 Q70,20 90,40" fill="none" stroke="black" strokeWidth="1" />
                           </svg>
                        </div>

                        {/* Wax Seal */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-90 z-20">
                           <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                               <circle cx="50" cy="50" r="45" fill="#b71c1c" />
                               <circle cx="50" cy="50" r="35" fill="none" stroke="#d32f2f" strokeWidth="2" />
                               <path d="M50,20 Q60,10 70,20 Q80,10 90,25" fill="none" stroke="#d32f2f" strokeWidth="2" opacity="0.5" />
                               <text x="50" y="65" textAnchor="middle" fill="#d32f2f" fontFamily="serif" fontSize="40" fontWeight="bold">P</text>
                           </svg>
                        </div>

                        {/* Dried Flower Element */}
                        <div className="absolute -bottom-2 -left-2 w-12 h-16 opacity-80 pointer-events-none">
                            <svg viewBox="0 0 100 200">
                                <path d="M50,200 Q60,150 50,100" stroke="#4A6fa5" strokeWidth="2" fill="none" />
                                <circle cx="50" cy="90" r="10" fill="#e0e0e0" />
                                <ellipse cx="50" cy="70" rx="8" ry="15" fill="#90caf9" />
                                <ellipse cx="50" cy="110" rx="8" ry="15" fill="#90caf9" />
                                <ellipse cx="30" cy="90" rx="15" ry="8" fill="#90caf9" />
                                <ellipse cx="70" cy="90" rx="15" ry="8" fill="#90caf9" />
                            </svg>
                        </div>

                        <div className="space-y-3 font-serif text-[10px] md:text-xs text-[#3E2723] leading-relaxed md:leading-loose text-justify pt-2 z-10">
                          <p className="font-bold text-[#2c1b18]">Hey Vedanshi,</p>
                          <p>
                            I probably don't say this enough, but I really do notice you. Everything, from that nervous smile of yours to your patience and just the way you care about things.Honestly, you just make everything feel a little less heavy. When I'm with you, my worries don’t seem like such a big deal anymore. Being with you is just... easy. I feel like I can finally just be myself.
                          </p>
                          <p>
                            I cannot fully explain how much it means to me that you are just you. I feel lucky every day to be the one who gets to see you as you are. You make even the small moments feel special, and you bring a kind of peace that I never want to lose.
                          </p>
                          <p>
                            Thank you for staying patient with me even when I make mistakes.
                          </p>
                        </div>
                        
                        <div className="mt-2 flex justify-between items-end">
                           <div>
                               <p className="font-serif text-xs text-gray-600 italic">Always,</p>
                               <p className="font-brush text-2xl text-[#8B3A3A] -rotate-2 ml-2">Prajwal</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-white/40 font-serif">4</div>
           </div>

           {/* BACK: LEFT PAGE 3 (TIC TAC TOE) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] paper-texture flex flex-col border-r border-gray-300 overflow-hidden items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent w-8 pointer-events-none"></div>
              
              {/* Tic Tac Toe Container */}
              <div className="relative w-full aspect-square max-w-[260px] md:max-w-[300px]">
                  {/* Scribbled note */}
                  <div className="absolute -top-6 -left-4 transform -rotate-12">
                     <p className="font-marker text-red-400 text-sm">I win! &darr;</p>
                  </div>
                  
                  {/* Game Over Doodle */}
                  <div className="absolute -bottom-8 right-0 rotate-[-5deg] border-2 border-black/20 p-1 px-2 rounded">
                      <span className="font-mono text-[10px] text-gray-500 tracking-widest">GAME OVER</span>
                  </div>
                  
                  {/* Score Doodle */}
                  <div className="absolute -top-8 right-0 text-xs font-marker text-gray-500 rotate-6">
                      Score: 1 - 0
                  </div>

                  {/* Hand-drawn Grid Lines */}
                  {/* Vertical 1 */}
                  <div className="absolute left-[33%] top-2 bottom-2 w-1.5 bg-[#5D4037] rounded-full opacity-80 transform rotate-[0.5deg]"></div>
                  {/* Vertical 2 */}
                  <div className="absolute right-[33%] top-2 bottom-2 w-1.5 bg-[#5D4037] rounded-full opacity-80 transform -rotate-[0.5deg]"></div>
                  {/* Horizontal 1 */}
                  <div className="absolute top-[33%] left-0 right-0 h-1.5 bg-[#5D4037] rounded-full opacity-80 transform -rotate-[0.5deg]"></div>
                  {/* Horizontal 2 */}
                  <div className="absolute bottom-[33%] left-0 right-0 h-1.5 bg-[#5D4037] rounded-full opacity-80 transform rotate-[0.5deg]"></div>

                  {/* Grid Cells */}
                  <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                      {/* Row 1, Col 1: X */}
                      <div className="flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#5D4037]">
                              <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                              <path d="M80,20 L20,80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                          </svg>
                      </div>

                      {/* Row 1, Col 2: Text */}
                      <div className="flex items-center justify-center p-1">
                          <div className="text-center font-serif text-[#3E2723] leading-tight">
                              <p className="text-[10px] md:text-xs tracking-wide">The day</p>
                              <p className="text-[10px] md:text-xs font-bold my-0.5">I first</p>
                              <p className="text-[10px] md:text-xs tracking-wide">texted you</p>
                          </div>
                          {/* Arrow pointing to text */}
                          <div className="absolute top-4 left-1/2 w-8 h-8 opacity-40 rotate-90">
                              <svg viewBox="0 0 50 50"><path d="M10,25 Q25,5 40,25" fill="none" stroke="black" /></svg>
                          </div>
                      </div>

                      {/* Row 1, Col 3: Heart 30 */}
                      <div className="flex items-center justify-center">
                          <div className="relative w-14 h-14 transform rotate-[10deg]">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-[#C62828] fill-current drop-shadow-sm">
                                   <path d="M50 85 C10 55 5 30 20 15 C30 5 45 10 50 20 C55 10 70 5 80 15 C95 30 90 55 50 85 Z" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center pt-2">
                                  <span className="text-white font-serif font-bold text-sm">30</span>
                              </div>
                          </div>
                      </div>

                      {/* Row 2, Col 1: Empty */}
                      <div></div>

                      {/* Row 2, Col 2: Heart JUL */}
                      <div className="flex items-center justify-center">
                           <div className="relative w-16 h-16">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-[#C62828] fill-current drop-shadow-sm">
                                   <path d="M50 90 C10 60 0 35 15 15 C28 0 45 10 50 20 C55 10 72 0 85 15 C100 35 90 60 50 90 Z" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center pt-2">
                                  <span className="text-white font-serif font-bold text-sm">JUL</span>
                              </div>
                          </div>
                      </div>

                      {/* Row 2, Col 3: Empty */}
                      <div></div>

                      {/* Row 3, Col 1: Heart 2025 */}
                      <div className="flex items-center justify-center">
                          <div className="relative w-14 h-14 transform -rotate-[10deg]">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-[#C62828] fill-current drop-shadow-sm">
                                   <path d="M50 85 C10 55 5 30 20 15 C30 5 45 10 50 20 C55 10 70 5 80 15 C95 30 90 55 50 85 Z" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center pt-2">
                                  <span className="text-white font-serif font-bold text-[10px]">2025</span>
                              </div>
                          </div>
                      </div>

                      {/* Row 3, Col 2: Empty */}
                      <div></div>

                      {/* Row 3, Col 3: X */}
                       <div className="flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#5D4037] opacity-80">
                              <path d="M25,25 L75,75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                              <path d="M75,25 L25,75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                          </svg>
                      </div>
                  </div>
              </div>

              <div className="absolute bottom-2 left-4 text-[10px] text-gray-500 font-serif">5</div>
           </div>
        </div>


        {/* --- LAYER 4: HOW WE MEET & FIRST DATE --- */}
        <div 
          onClick={page === 3 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 3 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 3 ? 40 : 20 }}
        >
           {/* FRONT: RIGHT PAGE 3 (HOW WE MEET) */}
           <div className="absolute inset-0 [backface-visibility:hidden] red-texture flex flex-col p-6 md:p-8 border-l border-black/10 overflow-hidden">
               <div className="h-full w-full relative flex flex-col">
                  {/* Title */}
                  <div className="mb-4">
                     <h2 className="font-serif-display text-4xl md:text-5xl text-[#e8dfd1] leading-[0.85]">HOW</h2>
                     <h2 className="font-serif-display text-4xl md:text-5xl text-[#e8dfd1] leading-[0.85] ml-8">WE MET</h2>
                  </div>

                  {/* Collage Area */}
                  <div className="relative w-full aspect-square mb-4">
                     

                     
                     
                     

                     {/* Background Circle Image */}
                     <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#e8dfd1]/20 shadow-inner">
                        <img src="/meAndHer/meAndHER7.jpeg" className="w-full h-full object-cover opacity-80" alt="Collage Bg" />
                     </div>
                     
                     {/* Overlay Image Small */}
                     <div className="absolute bottom-4 left-0 w-24 h-24 bg-[#e8dfd1] p-1 rounded-2xl transform -rotate-6 shadow-lg z-10">
                        <img src="/meAndHer/meAndHER4.jpeg" className="w-full h-full object-cover rounded-xl grayscale" alt="Meet" />
                        <div className="washi-tape tape-pink h-3 w-10 -top-1 left-4 opacity-70"></div>
                     </div>

                     {/* Location Pin */}
                     <div className="absolute top-8 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-white/20 transform rotate-2 z-20">
                        <div className="text-red-500">📍</div>
                        <div className="text-[9px] text-white leading-tight text-left">
                           <span className="block font-bold">College</span>
                           <span className="block opacity-80">Bus</span>
                        </div>
                     </div>
                  </div>

                  {/* Text */}
                  <div className="mt-auto">
                     <p className="font-serif text-[9px] md:text-[10px] text-[#e8dfd1]/90 leading-relaxed text-justify">
                        I first saw you on the college bus, and I could not stop thinking about you. I kept replaying that moment in my head, wondering who you were and hoping I would see you again. I even stalked your socials and kept asking my friend how I should approach you, because I wanted to do it right. I was so nervous that I first texted you. When you replied, I blushed like crazy and felt a little braver. The very next day, I finally approached you in person. My heart was racing, but I went up to you and said hi. You looked so beautiful and a little shy, and in that moment I knew I had to try. I still remember how fast my heart was beating when I finally approached you, and how happy I felt after you smiled back.
                     </p>
                  </div>
                  {/* Handwritten arrow */}
                  <div className="absolute bottom-2 left-32 transform rotate-[-2deg]">
                     <span className="font-marker text-white/50 text-xs">destiny calling...</span>
                  </div>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-white/40 font-serif">6</div>
           </div>

           {/* BACK: LEFT PAGE 4 (OUR FIRST DATE) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] paper-texture flex flex-col border-r border-gray-300 overflow-hidden p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent w-8 pointer-events-none z-10"></div>
              
              <div className="h-full w-full flex flex-col relative z-0">
                 {/* Header */}
                 <div className="text-center mb-4 mt-2">
                    <p className="font-serif text-[10px] text-[#8B3A3A] tracking-[0.3em] uppercase mb-1">OUR</p>
                    <h2 className="font-serif-display text-5xl text-[#B71C1C] leading-[0.8] tracking-tight">FIRST<br/>DATE</h2>
                    <div className="absolute top-2 right-4 transform rotate-12">
                       <span className="font-marker text-[#8B3A3A] text-xs border border-[#8B3A3A] rounded px-1">Magical ✨</span>
                    </div>
                 </div>

                 

                 {/* Collage Container */}
                 <div className="flex-1 flex flex-col gap-2">
                    {/* Top Row */}
                    <div className="flex gap-2 h-[34%]">
                       {/* Top Left: Portrait */}
                       <div className="w-[40%] h-full rounded-lg overflow-hidden relative shadow-sm border border-gray-100">
                           <img src="/meAndHer/meAndHER3.jpeg" className="w-full h-full object-cover" alt="Date 1" />
                           <div className="photo-corner pc-gold photo-corner-tl"></div>
                       </div>
                       
                       {/* Top Right: Landscape with Hearts */}
                       <div className="flex-1 h-full rounded-lg overflow-hidden relative shadow-sm border border-gray-100 group">
                           <img src="/meAndHer/meAndHER5.jpeg" className="w-full h-full object-cover object-center" alt="Date 2" />
                           {/* Hearts Overlay - Top */}
                           <div className="absolute top-2 left-0 right-0 flex justify-center gap-2 opacity-80">
                               {Array.from({length: 6}).map((_, i) => (
                                   <span key={i} className="text-[#D32F2F] text-[10px] drop-shadow-sm transform hover:scale-125 transition-transform">♥</span>
                               ))}
                           </div>
                           {/* Hearts Overlay - Bottom */}
                           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-80">
                               {Array.from({length: 6}).map((_, i) => (
                                   <span key={i} className="text-[#D32F2F] text-[10px] drop-shadow-sm transform hover:scale-125 transition-transform">♥</span>
                               ))}
                           </div>
                       </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex gap-2 h-[42%] mt-2 mb-4">
                       <div className="flex-1 h-full rounded-lg overflow-hidden relative shadow-sm border border-gray-100">
                           <img src="/meAndHer/meAndHER9.jpeg" className="w-full h-full object-cover" alt="Date 3" />
                           <div className="washi-tape tape-teal h-3 w-10 -bottom-1 right-2 opacity-70 rotate-[-1deg]"></div>
                       </div>
                    </div>
                    
                    {/* Handwritten caption bottom */}
                    <div className="text-center transform -rotate-2">
                       <span className="font-marker text-gray-500 text-xs">so many butterflies...</span>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-2 left-4 text-[10px] text-gray-500 font-serif">7</div>
           </div>
        </div>


        {/* --- LAYER 5: DECEMBER CALENDAR & MY SPACE --- */}
        <div 
          onClick={page === 4 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 4 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 4 ? 30 : 25 }}
        >
           {/* FRONT: RIGHT PAGE 4 (OCTOBER CALENDAR) */}
           <div className="absolute inset-0 [backface-visibility:hidden] red-texture flex flex-col p-6 md:p-8 border-l border-black/10">
               <div className="h-full w-full relative flex flex-col items-center justify-center">
                   
                   {/* Calendar Paper Card */}
                   <div className="relative w-full max-w-[280px] rotate-2 transition-transform hover:rotate-0 duration-500">
                      
                      {/* Push Pin */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30 drop-shadow-md">
                         <svg width="20" height="30" viewBox="0 0 20 30">
                            <circle cx="10" cy="10" r="8" fill="#d32f2f" />
                            <path d="M10,10 L10,30" stroke="#888" strokeWidth="2" />
                            <circle cx="12" cy="8" r="2" fill="white" opacity="0.5" />
                         </svg>
                      </div>

                      <div className="bg-[#fffbf0] p-6 pb-8 shadow-[0_10px_20px_rgba(0,0,0,0.2)] relative">
                          {/* Paper texture overlay */}
                          <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}></div>

                          {/* Month Header */}
                          <div className="text-center mb-6 border-b border-[#B71C1C]/20 pb-4 relative z-10">
                              <h2 className="font-serif-display text-3xl md:text-3xl text-[#B71C1C] tracking-[0.12em] md:tracking-[0.2em] uppercase">September</h2>
                          </div>

                          {/* Days of Week (Optional but adds structure) */}
                          <div className="grid grid-cols-7 mb-4 relative z-10">
                              {['S','M','T','W','T','F','S'].map(d => (
                                  <div key={d} className="text-center text-[10px] font-serif text-gray-400">{d}</div>
                              ))}
                          </div>

                          {/* Grid */}
                          <div className="grid grid-cols-7 gap-y-5 gap-x-2 place-items-center relative z-10">
                             {Array.from({ length: 35 }).map((_, i) => {
                                // September 17th.
                                // If 1st is Sunday (index 0).
                                // 17th is index 16.
                                const isDate = i === 16; 
                                
                                return (
                                   <div key={i} className="relative flex items-center justify-center w-6 h-6">
                                      {isDate ? (
                                         <div className="relative w-8 h-8 flex items-center justify-center">
                                            {/* Hand-drawn circle SVG */}
                                            <svg className="absolute inset-0 w-full h-full text-[#B71C1C] drop-shadow-sm transform -rotate-12" viewBox="0 0 100 100">
                                                <path d="M20,50 A 25,25 0 1,1 80,50 A 25,25 0 1,1 20,50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="200 100" />
                                            </svg>
                                            <span className="font-serif font-bold text-[#B71C1C] text-lg relative z-10">17</span>
                                            {/* Handwritten "Best Day" arrow */}
                                            <div className="absolute -right-16 -top-4 w-20 transform rotate-[-10deg]">
                                               <span className="font-marker text-[#B71C1C] text-xs">Best Day! &larr;</span>
                                            </div>
                                         </div>
                                      ) : (
                                         // Subtle dot for other days
                                          <div className="w-1 h-1 bg-[#8d6e63] rounded-full opacity-40"></div>
                                      )}
                                   </div>
                                );
                             })}
                          </div>
                      </div>
                   </div>

                   {/* Divider Line (Outside paper) */}
                   <div className="w-full max-w-[240px] mt-10 mb-4 relative opacity-60">
                      <div className="w-full h-[1px] bg-[#f0e7db]"></div>
                   </div>

                   {/* Caption */}
                   <p className="font-serif text-[#f0e7db] text-base tracking-widest uppercase opacity-90 drop-shadow-md">
                      The day we started dating
                   </p>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-white/40 font-serif">8</div>
           </div>

           {/* BACK: LEFT PAGE 5 (MY SPACE) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] red-pattern flex flex-col border-r border-black/20 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent w-8 pointer-events-none"></div>
               
               <div className="h-full w-full relative p-6 md:p-8">
                  {/* Title */}
                  <div className="relative z-10 mb-4">
                     <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase text-white/80 font-serif">
                        personal
                     </div>
                     <h2 className="mt-2 font-serif-display text-4xl md:text-5xl text-white tracking-widest drop-shadow-md">
                        MY SPACE
                     </h2>
                     <div className="mt-2 h-[2px] w-20 bg-white/40"></div>
                  </div>
                  
                  {/* Film Strip Container - Center and Rotate */}
                  <div className="absolute top-20 left-0 right-0 bottom-8 flex justify-center items-center">
                      {/* Soft glow behind strip */}
                      <div className="absolute w-[230px] h-[500px] bg-white/10 blur-2xl rounded-full"></div>
                      <div className="relative w-[180px] md:w-[200px] h-[410px] md:h-[460px] transform -rotate-[1.5deg]">
                          {/* Handwritten paper behind */}
                          <div className="absolute inset-0 script-paper rounded-md border border-[#e9ded2] rotate-[2deg]"></div>
                          {/* Tape */}
                          <div className="washi-tape tape-beige -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-[1deg]"></div>
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/10 blur-sm rotate-[1deg]"></div>
                          
                          {/* Film strip stack */}
                          <div className="absolute inset-5 flex flex-col items-center">
                              {/* Binder Holes */}
                              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-evenly">
                                  <div className="w-3 h-3 bg-[#333] rounded-full opacity-10"></div>
                                  <div className="w-3 h-3 bg-[#333] rounded-full opacity-10"></div>
                                  <div className="w-3 h-3 bg-[#333] rounded-full opacity-10"></div>
                              </div>
                              
                              {/* Camera Doodle */}
                              <div className="absolute top-4 right-4 opacity-30">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
                                      <rect x="2" y="6" width="20" height="14" rx="2" />
                                      <circle cx="12" cy="13" r="4" />
                                      <path d="M7,6 L9,4 L15,4 L17,6" />
                                  </svg>
                              </div>

                              {/* Film Strip */}
                              <div className="w-[120px] md:w-[130px] bg-[#991b1b] p-1.5 flex flex-col gap-2 h-full shadow-md border-x-[4px] border-[#991b1b] relative rounded-sm">
                                  {/* Film strip title */}
                                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] text-white/80 font-serif">
                                    moments
                                  </div>
                                  {/* Safety Pin */}
                                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 z-20">
                                     <svg viewBox="0 0 60 30" className="w-full h-full text-gray-400 drop-shadow-sm">
                                        <path d="M5,15 L55,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="5" cy="15" r="3" fill="currentColor" />
                                        <path d="M55,15 Q60,15 55,20 Q50,25 55,15" fill="none" stroke="currentColor" strokeWidth="2" />
                                     </svg>
                                  </div>

                                  {/* Perforations */}
                                  <div className="absolute -left-1.5 top-0 bottom-0 w-1 flex flex-col justify-between py-1">
                                      {Array.from({length: 8}).map((_, i) => (
                                          <div key={i} className="w-1 h-1.5 bg-white/90 rounded-[1px]"></div>
                                      ))}
                                  </div>
                                  <div className="absolute -right-1.5 top-0 bottom-0 w-1 flex flex-col justify-between py-1">
                                      {Array.from({length: 8}).map((_, i) => (
                                          <div key={i} className="w-1 h-1.5 bg-white/90 rounded-[1px]"></div>
                                      ))}
                                  </div>

                                  {/* Top Frame */}
                                  <div className="aspect-[4/3] bg-black border border-white/20 p-0.5 flex items-center justify-center relative shrink-0 overflow-hidden">
                                      <img src="/meAndHer/meAndHER7.jpeg" className="w-full h-full object-cover" alt="Space 1" />
                                  </div>

                                  {/* Photos - Use Flex-1 to fit available height */}
                                  <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
                                      <div className="flex-1 bg-black p-0.5 border border-white/10 overflow-hidden min-h-0">
                                          <img src="/meAndHer/meAndHER10.jpeg" className="w-full h-full object-cover" alt="1" />
                                      </div>
                                      <div className="flex-1 bg-black p-0.5 border border-white/10 overflow-hidden min-h-0">
                                          <img src="/meAndHer/meAndHER6.jpeg" className="w-full h-full object-cover" alt="2" />
                                      </div>
                                      <div className="flex-1 bg-black p-0.5 border border-white/10 overflow-hidden min-h-0">
                                          <img src="/meAndHer/meAndHER4.jpeg" className="w-full h-full object-cover" alt="3" />
                                      </div>
                                  </div>
                              </div>
                              {/* Handwritten annotation */}
                              <div className="absolute top-1/2 -left-8 transform -rotate-90">
                                 <span className="font-marker text-gray-400 text-xs">Adventures!</span>
                              </div>
                              {/* Arrow pointing to strip */}
                              <div className="absolute bottom-8 right-0 text-xl text-white rotate-[-45deg]">-&gt;</div>
                          </div>
                          
                      </div>
                      
                      <div className="absolute bottom-6 right-6 text-gray-400/50 font-marker text-xs rotate-[-6deg]">memories...</div>
                  </div>
               </div>
               <div className="absolute bottom-2 left-4 text-[10px] text-gray-500 font-serif">9</div>
           </div>
        </div>


        {/* --- LAYER 6: I LOVE YOU & LOVE LETTER --- */}
        <div 
          onClick={page === 5 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 5 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 5 ? 20 : 30 }}
        >
           {/* FRONT: RIGHT PAGE 5 (I LOVE YOU) */}
           <div className="absolute inset-0 [backface-visibility:hidden] stripes-texture flex flex-col p-6 md:p-8 border-l border-gray-300 overflow-hidden">
               <div className="h-full w-full relative flex flex-col z-10">
                  {/* Title */}
                  <div className="mt-3 ml-4">
                     <h2 className="font-brush text-5xl md:text-6xl text-[#8B3A3A] rotate-[-5deg]">I love you.</h2>
                  </div>

                  {/* Photo - Enlarged */}
                  <div className="mt-4 self-center relative w-[85%] max-w-[300px]">
                     <div className="bg-white p-3 pb-8 shadow-xl rotate-[2deg] flex flex-col transition-transform hover:scale-[1.02] duration-300">
                        <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden relative">
                           <img src="/meAndHer/meAndHER6.jpeg" className="w-full h-full object-cover sepia-[0.1]" alt="Love" />
                           {/* Glare */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                           <div className="photo-corner pc-gold photo-corner-bl"></div>
                        </div>
                     </div>
                     {/* Tape */}
                     <div className="washi-tape tape-beige -top-3 left-1/2 -translate-x-1/2 w-24 h-8 rotate-[-1deg] shadow-sm"></div>
                     {/* Doodle heart */}
                     <div className="absolute bottom-4 right-4 text-3xl text-red-400 rotate-12 font-marker">♥</div>
                  </div>

                  {/* Poem/Lyrics */}
                  <div className="mt-6 ml-auto w-3/4 text-right">
                     <p className="font-marker text-[#5D4037] text-xs md:text-sm leading-relaxed rotate-[-2deg]">
                        You are my favorite place to be and the best part of every single day.<br/>
                        I love the little moments with you the most.<br/>
                        Thank you for being you and being mine.
                     </p>
                     <div className="text-right mt-2">
                     </div>
                  </div>
                  
                  {/* Bottom fill: doodles + tiny note */}
                  <div className="mt-auto flex items-end justify-between">
                     <div className="font-marker text-xs text-[#8B3A3A]/70 rotate-[-2deg]">
                        forever & always
                     </div>
                     <div className="flex items-center gap-2 text-[#8B3A3A]/40">
                        <span className="text-lg">♡</span>
                        <span className="text-lg">♡</span>
                        <span className="text-lg">♡</span>
                     </div>
                  </div>
                  
                  {/* Moon Doodle */}
                  <div className="absolute top-10 right-4 text-yellow-500 opacity-60 rotate-12 text-4xl">
                     ☾
                  </div>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-serif">10</div>
           </div>

           {/* BACK: LEFT PAGE 6 (LOVE LETTER) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] red-texture flex flex-col border-r border-gray-300 overflow-hidden p-6 md:p-8">
               <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent w-8 pointer-events-none"></div>
               
               {/* Letter Paper Container with Wavy Edge */}
               <div className="h-full w-full relative scalloped-paper shadow-lg flex flex-col px-6 py-6 md:px-8 md:py-8">
                  <div className="scalloped-corners"></div>
                  
                  {/* Confidential Stamp */}
                   <div className="absolute bottom-10 left-10 w-24 h-8 border-2 border-red-800 opacity-20 transform -rotate-12 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest">CONFIDENTIAL</span>
                   </div>

                  {/* Paper Clip */}
                  <div className="absolute -top-4 right-6 w-12 z-20 opacity-80">
                      <svg viewBox="0 0 50 120" fill="none" stroke="#9ca3af" strokeWidth="3">
                          <path d="M15,0 L15,80 Q15,100 35,100 Q55,100 55,80 L55,20 Q55,0 35,0 Q15,0 15,20 L15,80" />
                          <path d="M10,20 L10,80 A20,20 0 1,0 50,80 L50,20 A15,15 0 1,0 20,20 L20,80 A5,5 0 1,0 30,80" strokeLinecap="round" />
                      </svg>
                  </div>
                  
                  {/* Air Mail Sticker */}
                   <div className="absolute -top-2 left-4 w-24 h-8 bg-blue-100 border border-blue-300 flex items-center justify-center transform rotate-[-4deg] shadow-sm z-20">
                      <div className="w-full h-full border-2 border-dashed border-red-500 flex items-center justify-center">
                          <span className="font-serif font-bold text-blue-800 text-[8px] tracking-[0.2em] uppercase">AIR MAIL</span>
                      </div>
                   </div>

                   {/* Kiss Mark */}
                   <div className="absolute bottom-20 right-8 w-16 h-12 opacity-40 z-0 rotate-12">
                      <svg viewBox="0 0 100 60">
                         <path d="M10,30 Q30,10 50,30 Q70,10 90,30 Q70,50 50,30 Q30,50 10,30" fill="#e91e63" />
                         <path d="M20,30 Q40,20 60,30 M40,30 Q60,40 80,30" stroke="#c2185b" strokeWidth="2" fill="none" opacity="0.6" />
                      </svg>
                   </div>

                  {/* Header Section */}
                  <h2 className="font-serif-display text-3xl md:text-4xl text-[#B71C1C] uppercase tracking-wide leading-none mb-6 mt-4 text-left">A LOVE LETTER</h2>

                  <div className="flex justify-between items-start mb-4">
                      {/* To/From Fields */}
                      <div className="flex-1 space-y-3 pt-2">
                           <div className="relative border-b-2 border-[#B71C1C]/30 pb-1 w-[85%] flex items-end group">
                              <span className="font-serif text-xs md:text-sm text-[#5D4037] uppercase tracking-wider mr-2 mb-1">TO:</span>
                              <span className="font-brush text-2xl md:text-3xl text-black -mb-2 ml-2 transform group-hover:scale-105 transition-transform origin-left">Vedanshi</span>
                           </div>
                           <div className="relative border-b-2 border-[#B71C1C]/30 pb-1 w-[85%] flex items-end group">
                              <span className="font-serif text-xs md:text-sm text-[#5D4037] uppercase tracking-wider mr-2 mb-1">FROM:</span>
                              <span className="font-brush text-2xl md:text-3xl text-black -mb-2 ml-2 transform group-hover:scale-105 transition-transform origin-left">Prajwal</span>
                           </div>
                      </div>

                      {/* Stamps */}
                      <div className="flex gap-2 transform rotate-2">
                          {/* Stamp 1 */}
                          <div className="w-12 h-14 border-[3px] border-[#d4aeb0] p-1 flex flex-col items-center justify-center bg-[#fceceb] relative overflow-hidden">
                              <div className="absolute inset-0 border-2 border-white border-dashed opacity-50"></div>
                              <div className="text-xl text-[#e15b64]">♥</div>
                              <div className="mt-1 text-[5px] font-bold text-[#b85c61] tracking-widest uppercase">POSTAGE</div>
                              {/* Wavy lines */}
                              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#333] opacity-10 transform -rotate-12"></div>
                              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#333] opacity-10 transform rotate-12"></div>
                          </div>
                          {/* Stamp 2 */}
                          <div className="w-12 h-14 border-[3px] border-[#d4aeb0] p-1 flex flex-col items-center justify-center bg-[#fceceb] relative overflow-hidden">
                               <div className="absolute inset-0 border-2 border-white border-dashed opacity-50"></div>
                              <div className="text-xl text-[#e15b64]">❦</div>
                              <div className="mt-1 text-[5px] font-bold text-[#b85c61] tracking-widest uppercase">POSTAGE</div>
                          </div>
                      </div>
                  </div>

                  {/* Body Text */}
                  <div className="flex-1 mb-2 relative z-10">
                       <h3 className="font-brush text-2xl md:text-3xl text-[#B71C1C] mb-2">To My Gf,</h3>
                       <p className="font-brush text-lg md:text-xl text-[#5D4037] leading-relaxed tracking-wide text-justify">
                          I was just thinking about how much I love the way you are with people you’re just so genuinely kind to everyone. And honestly? Those little 'pata hai, aaj kya hua' moments of yours are my favorite part of the day.

You have this way of making me feel so calm, so cared for, and just... understood. With you, even the most basic, simple days feel like something special.

I wish I could just lend you my eyes for a second, just so you could see yourself the way I see you. Maybe then you’d finally realize how much you’re worth, and just how deeply you are loved.
                       </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end mt-auto pt-2 relative border-t border-dashed border-[#B71C1C]/20">
                      <div className="font-brush text-2xl text-[#B71C1C]">02/14</div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 text-center bottom-1">
                          <div className="font-brush text-xl text-[#B71C1C]">happy</div>
                          <div className="font-serif text-[8px] uppercase tracking-[0.2em] text-[#B71C1C]/70">VALENTINE'S DAY</div>
                      </div>
                      {/* Round Stamp Mark */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#B71C1C]/30 flex items-center justify-center transform -rotate-12 opacity-60">
                          <div className="w-8 h-8 rounded-full border border-[#B71C1C]/30 flex items-center justify-center">
                              <span className="text-[6px] text-[#B71C1C] font-serif">LOVE</span>
                          </div>
                          {/* Wavy lines over stamp */}
                          <svg className="absolute w-14 h-8 text-[#B71C1C]/20" viewBox="0 0 100 50">
                              <path d="M0,25 Q12,10 25,25 T50,25 T75,25 T100,25" fill="none" stroke="currentColor" strokeWidth="2" />
                              <path d="M0,35 Q12,20 25,35 T50,35 T75,35 T100,35" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                      </div>
                      <div className="absolute right-0 bottom-4 rotate-[-10deg]">
                          <span className="font-marker text-xs text-[#5D4037]">xoxo</span>
                      </div>
                  </div>
               </div>
               
               <div className="absolute bottom-2 left-4 text-[10px] text-white/50 font-serif">11</div>
           </div>
        </div>

        {/* --- LAYER 7: MUSIC & BEST MOMENT LEFT --- */}
        <div 
          onClick={page === 6 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 6 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 6 ? 10 : 35 }}
        >
           {/* FRONT: RIGHT PAGE 6 (MUSIC - PAGE 12) */}
           <div className="absolute inset-0 [backface-visibility:hidden] music-paper flex flex-col p-5 md:p-6 border-l border-gray-300 overflow-hidden">
               {/* Custom Border Effect - Fuzzy Red Line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <filter id="roughPaper">
                     <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                     <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                  </filter>
                  <rect x="15" y="15" width="calc(100% - 30px)" height="calc(100% - 30px)" rx="10" fill="none" stroke="#C62828" strokeWidth="3" filter="url(#roughPaper)" className="opacity-80" />
               </svg>

               <div className="h-full w-full relative flex flex-col z-10 px-4 py-3 music-grid music-fade-in">
                  <audio ref={audioRef} src="/realLoveBaby" preload="auto" loop />
                  <div className="music-glow"></div>


                  <div className="music-note n1">♪</div>
                  <div className="music-note n2">♫</div>
                  <div className="music-note n3">♩</div>
                  <div className="music-note n4">♪</div>
                  <div className="music-note n5">♫</div>
                  <div className="mb-4">
                     <p className="font-serif text-[10px] uppercase tracking-widest text-gray-500 mb-1">NOW PLAYING</p>
                     <h2 className="font-serif-display text-3xl md:text-4xl text-[#5D4037] leading-none music-title">REAL LOVE BABY</h2>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                     <div className={`cassette ${isPlaying ? 'playing' : ''}`} onClick={handleToggleAudio}>
                        {isPlaying && <div className="pulse-ring" style={{ top: '-6px', right: '-6px' }}></div>}
                        <div className={`vu-meter ${isPlaying ? '' : 'vu-paused'}`}>
                           <div className="vu-bar"></div>
                           <div className="vu-bar"></div>
                           <div className="vu-bar"></div>
                           <div className="vu-bar"></div>
                           <div className="vu-bar"></div>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#e9d8c4] border border-[#c6b19a] rounded-sm shadow-sm rotate-[1deg]"></div>
                        <div className="cassette-inner"></div>
                        <div className="cassette-window">
                           <div className={`cassette-spool ${isPlaying ? 'playing' : ''}`}></div>
                           <div className={`cassette-tape ${isPlaying ? 'playing' : ''}`}></div>
                           <div className={`cassette-spool ${isPlaying ? 'playing' : ''}`}></div>
                        </div>
                        <div className="cassette-label">
                           <div className="font-serif-display text-sm text-[#5D4037] tracking-wide">Real Love Baby</div>
                           <div className="text-[9px] text-gray-500 uppercase tracking-widest">Audio</div>
                        </div>
                        <div className="cassette-screws">
                           <div className="cassette-screw tl"></div>
                           <div className="cassette-screw tr"></div>
                           <div className="cassette-screw bl"></div>
                           <div className="cassette-screw br"></div>
                        </div>
                        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                        <div className="cassette-shadow"></div>
                     </div>
                  </div>

                  <div className="text-center text-[9px] text-gray-500 tracking-widest uppercase">Playing for us</div>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-serif">12</div>
           </div>

           {/* BACK: LEFT PAGE 7 (OUR BEST MOMENT LEFT - PAGE 13) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white flex flex-col border-r border-gray-300 overflow-hidden">
                <div className="h-full w-full relative">
                    {/* -- Left side of Heart Collage -- */}
                    
                    {/* 1. Top Left - Large Vertical */}
                    <div className="absolute top-[5%] left-[8%] w-[40%] h-[35%] bg-white p-1 shadow-md rotate-[-2deg] z-10">
                         <img src="/meAndHer/meAndHER1.jpeg" className="w-full h-full object-cover" alt="couple1" />
                         <div className="washi-tape tape-teal h-3 w-10 -top-1 left-2 opacity-70 rotate-3"></div>
                    </div>

                    {/* 2. Top Right (Near Spine) - Vertical */}
                    <div className="absolute top-[10%] left-[52%] w-[35%] h-[30%] bg-white p-1 shadow-md rotate-[1deg] z-20">
                         <img src="/meAndHer/meAndHER2.jpeg" className="w-full h-full object-cover" alt="couple2" />
                    </div>

                    {/* 3. Mid Left - Horizontal */}
                    <div className="absolute top-[42%] left-[5%] w-[42%] h-[25%] bg-white p-1 shadow-md rotate-[1deg] z-10">
                         <img src="/meAndHer/meAndHER3.jpeg" className="w-full h-full object-cover" alt="couple3" />
                         <div className="photo-corner pc-gold photo-corner-tr"></div>
                    </div>

                    {/* 4. Mid Right (Near Spine) - Vertical/Square */}
                    <div className="absolute top-[42%] right-[5%] w-[42%] h-[30%] bg-white p-1 shadow-md rotate-[-1deg] z-20">
                         <img src="/meAndHer/meAndHER4.jpeg" className="w-full h-full object-cover" alt="couple4" />
                    </div>

                    {/* 5. Window Couple */}
                     <div className="absolute top-[70%] left-[25%] w-[22%] h-[20%] bg-white p-1 shadow-md rotate-[-2deg] z-10">
                         <img src="/meAndHer/meAndHER5.jpeg" className="w-full h-full object-cover" alt="window" />
                    </div>

                    {/* 6. Blue Shirt Hug */}
                    <div className="absolute top-[74%] left-[50%] w-[25%] h-[22%] bg-white p-1 shadow-md rotate-[2deg] z-20">
                         <img src="/meAndHer/meAndHER6.jpeg" className="w-full h-full object-cover" alt="bluehug" />
                    </div>

                    {/* 7. Group Selfie */}
                    <div className="absolute bottom-[2%] right-[2%] w-[35%] h-[18%] bg-white p-1 shadow-md rotate-[-1deg] z-30">
                         <img src="/meAndHer/meAndHER7.jpeg" className="w-full h-full object-cover" alt="group" />
                         <div className="washi-tape tape-pink h-3 w-10 -bottom-1 right-2 opacity-70 rotate-[-4deg]"></div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 z-40">
                        <h2 className="font-serif-display text-4xl text-[#5D4037] uppercase leading-[0.85] tracking-tight drop-shadow-sm">
                            OUR BEST<br/><span className="ml-2">MOMENT</span>
                        </h2>
                        {/* Sticker */}
                        <div className="absolute -top-6 -right-6 w-16 h-8 bg-yellow-200 rotate-12 flex items-center justify-center border border-black/10 shadow-sm font-marker text-[8px]">
                            UNFORGETTABLE
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-2 left-4 text-[10px] text-gray-400 font-serif">13</div>
           </div>
        </div>

        {/* --- LAYER 8: BASE PAGE (OUR BEST MOMENT RIGHT - PAGE 14) & BACK COVER --- */}
        <div 
          onClick={page === 7 ? handleNext : handlePrev}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] origin-left cursor-pointer shadow-lg
            ${page > 7 ? '[transform:rotateY(-180deg)]' : ''}`}
          style={{ zIndex: page <= 7 ? 5 : 40 }}
        >
           {/* FRONT: RIGHT PAGE 7 (Our Best Moment Right) */}
           <div className="absolute inset-0 [backface-visibility:hidden] bg-white flex flex-col border-l border-gray-300 overflow-hidden">
               <div className="h-full w-full relative">
                    {/* Heart Doodle */}
                    <div className="absolute top-6 right-6 text-4xl text-gray-400 font-marker rotate-12 z-0 opacity-60">♡</div>

                    {/* -- Right side of Heart Collage -- */}

                    {/* 1. Top Left (Near Spine) - B&W Sitting */}
                    <div className="absolute top-[5%] left-[5%] w-[38%] h-[30%] bg-white p-1 shadow-md rotate-[-2deg] z-20">
                         <img src="/meAndHer/meAndHer8.jpeg" className="w-full h-full object-cover grayscale" alt="couple6" />
                    </div>

                    {/* 2. Top Right - Traditional */}
                    <div className="absolute top-[8%] right-[8%] w-[35%] h-[30%] bg-white p-1 shadow-md rotate-[3deg] z-10">
                         <img src="/meAndHer/meAndHER9.jpeg" className="w-full h-full object-cover" alt="couple7" />
                         <div className="washi-tape tape-beige h-3 w-10 -top-1 right-2 opacity-70 rotate-2"></div>
                    </div>

                    {/* 3. Mid Left 1 - Horizontal */}
                    <div className="absolute top-[38%] left-[5%] w-[28%] h-[20%] bg-white p-1 shadow-md rotate-[2deg] z-10">
                         <img src="/meAndHer/meAndHER10.jpeg" className="w-full h-full object-cover" alt="couple8" />
                         <div className="photo-corner pc-black photo-corner-bl"></div>
                    </div>

                    {/* 4. Mid Left 2 - Horizontal */}
                    <div className="absolute top-[38%] left-[36%] w-[28%] h-[20%] bg-white p-1 shadow-md rotate-[-3deg] z-20">
                         <img src="/meAndHer/meAndHER11.jpeg" className="w-full h-full object-cover" alt="couple9" />
                    </div>

                    {/* 5. Mid Right - Dark Couple */}
                    <div className="absolute top-[40%] right-[5%] w-[28%] h-[22%] bg-white p-1 shadow-md rotate-[1deg] z-10">
                         <img src="/meAndHer/meAndHER12.jpeg" className="w-full h-full object-cover" alt="couple10" />
                    </div>

                    {/* 6. Group White Shirts */}
                    <div className="absolute top-[62%] left-[8%] w-[35%] h-[30%] bg-white p-1 shadow-md rotate-[-2deg] z-20">
                         <img src="/meAndHer/meAndHER1.jpeg" className="w-full h-full object-cover" alt="couple11" />
                    </div>

                    {/* 7. Dark Guy Vertical */}
                    <div className="absolute top-[65%] right-[10%] w-[35%] h-[28%] bg-white p-1 shadow-md rotate-[4deg] z-10">
                        <img src="/meAndHer/meAndHER2.jpeg" className="w-full h-full object-cover" alt="couple12" />
                    </div>
                    
                    {/* 8. Couple Landscape Bottom */}
                    <div className="absolute bottom-[2%] left-[30%] w-[35%] h-[18%] bg-white p-1 shadow-md rotate-[1deg] z-30">
                        <img src="/meAndHer/meAndHER3.jpeg" className="w-full h-full object-cover" alt="couple13" />
                        <div className="washi-tape tape-pink h-3 w-10 -top-1 left-2 opacity-70 rotate-[-1deg]"></div>
                    </div>

                    {/* Scribble */}
                    <div className="absolute bottom-16 right-8 rotate-[-12deg]">
                        <span className="font-marker text-gray-400 text-xs">Favs!</span>
                    </div>
                    <div className="absolute top-[50%] right-2 rotate-90 text-xs font-serif text-gray-300 tracking-widest uppercase">
                        so much fun!
                    </div>
               </div>
               <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-serif">14</div>
           </div>

           {/* BACK: LEFT PAGE 8 (BACK COVER - LOVE YOU) */}
           <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#9F1212] flex flex-col border-r border-gray-300 overflow-hidden items-center p-8 text-center">
                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/washi.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent w-8 pointer-events-none"></div>
                
                {/* Title */}
                <h1 className="font-serif-display text-5xl md:text-6xl text-[#f0e7db] tracking-widest mt-12 mb-8 drop-shadow-sm uppercase">LOVE YOU</h1>

                {/* Centerpiece */}
                <div className="relative w-full flex-1 flex items-center justify-center">
                    {/* Soft glow */}
                    <div className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="relative w-44 h-44 md:w-48 md:h-48 bg-white/10 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.35)] overflow-hidden flex items-center justify-center rounded-2xl">
                        <img src="/cat.gif" alt="cat kiss" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Closing Message */}
                <div className="mb-10 space-y-3 px-4">
                    <p className="font-brush text-3xl md:text-4xl text-[#f0e7db] pt-2">~ Prajwal</p>
                </div>
                
           </div>
        </div>

      </div>
    </div>
  );
}

export default BookCover;
