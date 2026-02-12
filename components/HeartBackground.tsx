import React from 'react';

const HeartBackground: React.FC = () => {
  // Creating a static array of hearts to simulate the random background in the image
  // In a real random scenario, we'd use random(), but we want it to look "designed"
  const hearts = [
    { top: '10%', left: '5%', size: 'text-2xl', color: 'text-red-200', rotate: '-rotate-12' },
    { top: '15%', left: '25%', size: 'text-xl', color: 'text-pink-200', rotate: 'rotate-12' },
    { top: '5%', left: '80%', size: 'text-3xl', color: 'text-red-100', rotate: 'rotate-6' },
    { top: '40%', left: '10%', size: 'text-4xl', color: 'text-pink-100', rotate: '-rotate-45' },
    { top: '60%', left: '85%', size: 'text-2xl', color: 'text-red-200', rotate: 'rotate-12' },
    { top: '80%', left: '20%', size: 'text-xl', color: 'text-pink-200', rotate: '-rotate-6' },
    { top: '90%', left: '70%', size: 'text-3xl', color: 'text-red-100', rotate: 'rotate-45' },
    { top: '30%', left: '90%', size: 'text-xl', color: 'text-pink-200', rotate: '-rotate-12' },
    { top: '50%', left: '5%', size: 'text-2xl', color: 'text-red-200', rotate: 'rotate-6' },
    { top: '20%', left: '60%', size: 'text-lg', color: 'text-pink-200', rotate: '-rotate-12' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart, i) => (
        <div
          key={i}
          className={`absolute ${heart.size} ${heart.color} ${heart.rotate} opacity-60`}
          style={{ top: heart.top, left: heart.left }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;