import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketCard from './components/MarketCard';
import ClawClicker from './components/ClawClicker';
import FlappyClaw from './components/FlappyClaw';
import { markets } from './data/mockMarkets';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [globalToken, setGlobalToken] = useState(null);
  const marketsRef = useRef(null);

  const scrollToMarkets = () => {
    marketsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Top Banner CA: soon... */}
      <div className="bg-green-800 text-white text-center font-bold font-mono text-sm py-1 border-b-2 border-green-600 flex justify-center items-center gap-4 animate-pulse">
          <span>🦞 $MoltDict</span>
          {globalToken ? (
            <span 
                className="bg-black px-2 py-0.5 rounded text-green-400 border border-green-600 cursor-pointer hover:bg-green-900 transition-colors"
                onClick={() => {
                    navigator.clipboard.writeText(globalToken.mint);
                    alert('CA copied!');
                }}
                title="Click to copy CA"
            >
                CA: {globalToken.mint}
            </span>
          ) : (
            <span className="bg-black px-2 py-0.5 rounded text-green-400 border border-green-600">CA: Scanning...</span>
          )}
          <span>Shedding soon 🚀</span>
      </div>

      {/* Background decoration elements */}
      <div className="fixed top-20 left-10 text-8xl opacity-5 pointer-events-none -rotate-12 z-0 select-none text-green-500">🦞</div>
      <div className="fixed bottom-40 right-10 text-8xl opacity-5 pointer-events-none rotate-12 z-0 select-none text-green-500">🌊</div>
      <div className="fixed top-1/3 right-1/4 text-6xl opacity-5 pointer-events-none rotate-45 z-0 select-none text-green-500">✂️</div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none z-0 select-none text-green-500">🐚</div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 relative z-10">
        {activeTab === 'home' ? (
          <>
            <Hero onBetClick={scrollToMarkets} onTokenFoundGlobal={setGlobalToken} />
            
            {/* Markets Section */}
            <section ref={marketsRef} className="mt-12 scroll-mt-24">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <h2 className="text-4xl font-bold transform -rotate-2 decoration-wavy underline decoration-green-500 decoration-4 text-white">
                  Live Events
                </h2>
                <span className="text-sm bg-green-600 text-white px-2 py-1 rotate-3 font-mono border border-white/20 rounded shadow-sm">HOT</span>
                <span className="hidden md:inline text-xl ml-auto animate-pulse text-green-400/80">🦞 Molt is watching...</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                {markets.map(market => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <FlappyClaw />
        )}

        {/* Footer / Disclaimer */}
        <section className="mt-20 text-center border-t border-green-500/30 pt-8 border-dashed bg-black/20 p-8 wonky-border mb-8">
            <p className="text-xl font-bold text-white">
                🦞 $MoltDict &copy; 2024. Not financial advice. 
            </p>
            <p className="text-sm mt-2 opacity-70 text-gray-400">
                We are just lobsters shedding in the boiling pot of crypto.
            </p>
            <div className="flex justify-center gap-4 mt-4 opacity-50 text-2xl">
                <span>🦞</span>
                <span>🌊</span>
                <span>💎</span>
                <span>🙌</span>
            </div>
        </section>
      </main>

      <ClawClicker />
    </div>
  );
}

export default App;
