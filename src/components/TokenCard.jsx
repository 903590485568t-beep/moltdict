import React, { useState } from 'react';

const TokenCard = ({ token }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (token?.mint) {
      navigator.clipboard.writeText(token.mint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!token) return null;

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-green-500 rounded-xl blur-xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity"></div>
      
      <div className="relative bg-black/80 backdrop-blur-md border-2 border-green-500 p-6 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.3)]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 border-b border-green-500/30 pb-4">
            {token.image_uri ? (
                <img src={token.image_uri} alt={token.name} className="w-16 h-16 rounded-full border-2 border-green-400 shadow-lg object-cover" />
            ) : (
                <div className="w-16 h-16 rounded-full border-2 border-green-400 bg-green-900/50 flex items-center justify-center text-2xl">🦞</div>
            )}
            <div>
                <h3 className="text-3xl font-black text-white tracking-wide">{token.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-green-400 font-mono font-bold">${token.symbol}</span>
                    <span className="px-2 py-0.5 bg-green-900 text-green-200 text-xs rounded border border-green-700">LIVE ON PUMPFUN</span>
                </div>
            </div>
        </div>

        {/* CA Section */}
        <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Contract Address (CA)</div>
            <div 
                onClick={copyToClipboard}
                className="bg-green-900/20 border border-green-500/50 rounded p-3 flex items-center justify-between cursor-pointer hover:bg-green-900/40 transition-colors group/ca"
            >
                <code className="text-green-300 font-mono truncate mr-2 select-all">
                    {token.mint}
                </code>
                <div className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold shadow-sm group-hover/ca:scale-105 transition-transform">
                    {copied ? 'COPIED! ✅' : 'COPY'}
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-2 bg-black/40 rounded border border-gray-800">
                <div className="text-xs text-gray-500">Market Cap</div>
                <div className="text-xl font-bold text-white">Soon 🚀</div>
            </div>
            <div className="text-center p-2 bg-black/40 rounded border border-gray-800">
                <div className="text-xs text-gray-500">Bonding Curve</div>
                <div className="text-xl font-bold text-green-400">Active 🟢</div>
            </div>
        </div>

        {/* Action Button */}
        <a 
            href={`https://pump.fun/${token.mint}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-6 w-full bg-green-600 hover:bg-green-500 text-white font-black text-center py-3 rounded-lg shadow-[0_4px_0_rgb(20,83,45)] active:shadow-none active:translate-y-1 transition-all uppercase tracking-widest"
        >
            Buy on Pump.fun 💊
        </a>
      </div>
    </div>
  );
};

export default TokenCard;
