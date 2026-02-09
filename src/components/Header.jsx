import React from 'react';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b-2 border-green-500/50 p-4 flex justify-between items-center shadow-lg">
      <div 
        className="flex items-center gap-2 animate-bounce cursor-pointer group"
        onClick={() => onTabChange('home')}
      >
        <span className="text-4xl group-hover:rotate-12 transition-transform">🦞</span>
        <h1 className="text-3xl font-bold tracking-tighter text-white">MoltDict</h1>
      </div>
      
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => onTabChange('home')}
          className={`hover:underline decoration-wavy decoration-2 transition-colors ${activeTab === 'home' ? 'text-green-500 font-bold' : 'text-gray-300'}`}
        >
          Markets
        </button>
        <button 
          onClick={() => onTabChange('flappy')}
          className={`hover:underline decoration-wavy decoration-2 transition-colors flex items-center gap-1 ${activeTab === 'flappy' ? 'text-green-500 font-bold' : 'text-gray-300'}`}
        >
          <span>🕹️</span> Flappy Molt
        </button>
        <button className="bg-green-800 text-white border border-green-500 px-4 py-1 rounded-full hover:bg-green-600 transition-all hover:-rotate-2 shadow-[2px_2px_0px_0px_#004400] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
