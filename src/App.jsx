import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketCard from './components/MarketCard';
import ClawClicker from './components/ClawClicker';
import FlappyClaw from './components/FlappyClaw';
import { markets } from './data/mockMarkets';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const marketsRef = useRef(null);

  const scrollToMarkets = () => {
    marketsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Top Banner CA: soon... */}
      <div className="bg-claw-primary text-white text-center font-bold font-mono text-sm py-1 border-b-2 border-red-900 flex justify-center items-center gap-4 animate-pulse">
          <span>🦞 $ClawDict</span>
          <span className="bg-black px-2 py-0.5 rounded text-yellow-400 border border-yellow-600">CA: soon...</span>
          <span>Moon Mission 🚀</span>
      </div>

      {/* Background decoration elements */}
      <div className="fixed top-20 left-10 text-8xl opacity-5 pointer-events-none -rotate-12 z-0 select-none text-claw-primary">🦞</div>
      <div className="fixed bottom-40 right-10 text-8xl opacity-5 pointer-events-none rotate-12 z-0 select-none text-claw-primary">🌊</div>
      <div className="fixed top-1/3 right-1/4 text-6xl opacity-5 pointer-events-none rotate-45 z-0 select-none text-claw-primary">✂️</div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none z-0 select-none text-claw-primary">🐚</div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 relative z-10">
        {activeTab === 'home' ? (
          <>
            <Hero onBetClick={scrollToMarkets} />
            
            {/* Markets Section */}
            <section ref={marketsRef} className="mt-12 scroll-mt-24">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <h2 className="text-4xl font-bold transform -rotate-2 decoration-wavy underline decoration-claw-primary decoration-4 text-claw-text">
                  Live Events
                </h2>
                <span className="text-sm bg-claw-primary text-white px-2 py-1 rotate-3 font-mono border border-white/20 rounded shadow-sm">HOT</span>
                <span className="hidden md:inline text-xl ml-auto animate-pulse text-claw-primary/80">🦞 Claw is watching...</span>
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
        <section className="mt-20 text-center border-t border-claw-primary/30 pt-8 border-dashed bg-black/20 p-8 wonky-border mb-8">
            <p className="text-xl font-bold text-claw-text">
                🦞 ClawDict &copy; 2024. Not financial advice. 
            </p>
            <p className="text-sm mt-2 opacity-70 text-claw-dim">
                We are just lobsters in the boiling pot of crypto.
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
