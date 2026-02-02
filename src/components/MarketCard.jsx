import React, { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

const MarketCard = ({ market }) => {
  const [voted, setVoted] = useState(null);

  const handleVote = (type) => {
    setVoted(type);
    // Here we would trigger confetti or something
  };

  return (
    <div className={`relative group bg-claw-card border-2 border-claw-primary p-6 transition-all hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_#800000] shadow-[3px_3px_0px_0px_#800000] wonky-border flex flex-col h-full overflow-visible`}>
      
      {/* Header Image */}
      <div className="absolute -top-5 -right-5 bg-claw-bg w-14 h-14 border-2 border-claw-primary rounded-full flex items-center justify-center text-3xl shadow-sm z-10">
        {market.image}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold leading-tight mb-3 pr-6 text-claw-text">{market.question}</h3>
        <p className="text-base font-sans opacity-80 text-claw-dim">{market.description}</p>
      </div>

      {/* Progress Bar styled as a drawn line */}
      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-end">
            <span className="text-4xl font-black text-claw-primary">{market.chance}%</span>
            <span className="text-xs font-mono font-bold flex items-center gap-1 text-claw-dim bg-black/20 px-2 py-1 rounded">
                <TrendingUp size={14} /> ${market.volume}
            </span>
        </div>

        <div className="w-full h-3 border border-claw-primary rounded-full p-0.5 bg-black/50">
            <div 
                className="h-full bg-claw-primary rounded-full" 
                style={{ width: `${market.chance}%` }}
            ></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={() => handleVote('yes')}
                className={`py-3 border border-claw-primary rounded-lg font-bold transition-all text-sm
                ${voted === 'yes' ? 'bg-green-900 text-white translate-y-[2px] shadow-none' : 'bg-transparent text-green-400 hover:bg-green-900/20 shadow-[2px_2px_0px_0px_#1a4d1a]'}
                `}
            >
                YES
            </button>
            <button 
                onClick={() => handleVote('no')}
                className={`py-3 border border-claw-primary rounded-lg font-bold transition-all text-sm
                ${voted === 'no' ? 'bg-red-900 text-white translate-y-[2px] shadow-none' : 'bg-transparent text-red-400 hover:bg-red-900/20 shadow-[2px_2px_0px_0px_#4d1a1a]'}
                `}
            >
                NO
            </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
