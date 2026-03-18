import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-[#5c7cfa] rounded-3xl p-10 text-white flex justify-between items-center shadow-lg mx-8 mb-6 h-60 min-h-[240px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 400">
          <path d="M0 100 C 200 50, 400 150, 600 100 C 800 50, 800 200, 800 200 L 800 400 L 0 400 Z" fill="white" />
          <path d="M0 150 C 150 200, 300 100, 450 150 C 600 200, 750 100, 800 150 L 800 400 L 0 400 Z" fill="white" className="opacity-50" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
          <span className="opacity-80">Apr 13, 2021 | 2:12 pm</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Good Day, Dr. Nicholls!</h1>
          <p className="text-blue-100 text-lg">Have a Nice Monday!</p>
        </div>
      </div>

      <div className="relative z-10 w-1/3 flex justify-end">
        {/* Placeholder for Doctor Illustration */}
        <div className="relative">
          <div className="w-48 h-48 bg-blue-100/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/20">
             {/* Simple SVG Doctor Avatar */}
             <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-xl">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
             </svg>
          </div>
          {/* Decorative pills/icons floating around */}
          <div className="absolute top-0 -left-8 w-8 h-4 bg-yellow-400 rounded-full rotate-45 animate-bounce"></div>
          <div className="absolute bottom-4 -right-4 w-6 h-6 bg-pink-400 rounded-lg -rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 -left-12 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-100"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
