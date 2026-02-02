import React from 'react';

const Hero = ({ onBetClick }) => {
  return (
    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible">
      
      {/* Floating lobster decoration */}
      <div className="absolute top-0 left-1/4 text-6xl opacity-20 animate-bounce delay-700 pointer-events-none select-none">🦞</div>
      <div className="absolute bottom-10 right-1/4 text-4xl opacity-10 animate-pulse delay-300 pointer-events-none select-none">🧂</div>
      
      <div className="max-w-xl space-y-6 z-10">
        <div className="inline-block bg-red-900 text-white border-2 border-red-600 px-4 py-1 rotate-[-2deg] font-bold shadow-[2px_2px_0px_0px_#ff0000] mb-2 cursor-help hover:scale-110 transition-transform">
           $ClawDict on Pumpfun 🚀
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black leading-none transform -rotate-1 text-white">
          Predict <br/>
          <span className="text-claw-primary decoration-wavy underline decoration-4">Crypto</span> Chaos!
        </h2>
        <p className="text-xl md:text-2xl border-l-4 border-red-600 pl-4 text-gray-200">
          The only prediction market run by a <span className="font-bold text-claw-primary">Lobster</span> named Claw. 
          Bigger claws, bigger gains.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onBetClick}
            className="bg-claw-primary text-white text-xl border-2 border-red-900 px-8 py-3 wonky-border hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_#800000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-2"
          >
            <span>🦞</span> Place a Bet
          </button>
          <a 
            href="https://pump.fun/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent text-claw-primary text-xl border-2 border-claw-primary px-8 py-3 wonky-border hover:bg-claw-primary/10 transition-all shadow-[4px_4px_0px_0px_#800000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] font-bold flex items-center justify-center gap-2 no-underline"
          >
            <span>💸</span> Buy $ClawDict
          </a>
          <a 
            href="https://x.com/ClawDictFun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white text-xl border-2 border-claw-primary px-8 py-3 wonky-border hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_#800000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] font-bold flex items-center justify-center gap-2 no-underline"
          >
            <span>🐦</span> Twitter
          </a>
        </div>
        
        {/* Token Stats / Growth References - Replaced with Honest Meme Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-2 border-red-900/50 p-4 wonky-border bg-black/20 backdrop-blur-sm mt-4">
           <div className="text-center">
             <div className="text-xs text-gray-400 uppercase font-bold">Claw Sharpness</div>
             <div className="text-xl md:text-2xl font-black text-red-400">Razor ✂️</div>
           </div>
           <div className="text-center">
             <div className="text-xs text-gray-400 uppercase font-bold">Vibe Check</div>
             <div className="text-xl md:text-2xl font-black text-green-400">Passed ✅</div>
           </div>
           <div className="text-center col-span-2 md:col-span-1">
             <div className="text-xs text-gray-400 uppercase font-bold">Community</div>
             <div className="text-xl md:text-2xl font-black text-white">Early 🦞</div>
           </div>
        </div>

        
        {/* Small funny references */}
        <div className="text-sm font-mono opacity-60 rotate-1 text-gray-400">
            * Claw pinch: Strong Buy signal
        </div>
      </div>
      
      <div className="relative w-64 h-64 md:w-96 md:h-96 z-10 group">
        {/* Abstract "Child Drawing" of a Lobster */}
        <div className="absolute inset-0 bg-red-900 wonky-border animate-pulse opacity-20 rotate-3 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute inset-0 border-4 border-red-600 bg-claw-primary wonky-border flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500 overflow-hidden">
            <span className="text-9xl filter drop-shadow-[4px_4px_0px_#000] group-hover:scale-110 transition-transform duration-300">🦞</span>
            
            {/* Hidden Claws appearing on hover */}
            <span className="absolute -left-4 top-1/2 text-6xl transform -translate-y-1/2 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">✂️</span>
            <span className="absolute -right-4 top-1/2 text-6xl transform -translate-y-1/2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">✂️</span>
        </div>
        
        {/* Speech Bubble */}
        <div className="absolute -top-12 -right-12 bg-black text-white p-4 border-2 border-red-600 wonky-border-sm shadow-[4px_4px_0px_0px_#ff0000] transform rotate-12 z-20 group-hover:rotate-6 transition-transform">
          <p className="font-bold text-lg">Pinch the Dip!</p>
        </div>
        
        {/* Tiny Easter Egg */}
        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 bg-red-900 text-white border border-red-600 p-1 text-xs rotate-[-10deg] shadow-sm">
            Not a shrimp!
        </div>
      </div>
    </div>
  );
};

export default Hero;
