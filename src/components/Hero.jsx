import React, { useEffect, useState } from 'react';
import TokenCard from './TokenCard';
import { supabase } from '../lib/supabase';
import { startTokenScanner, stopTokenScanner } from '../services/pumpScanner';

const Hero = ({ onBetClick, onTokenFoundGlobal }) => {
  const [tokenFound, setTokenFound] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 0. Check LocalStorage for INSTANT display
    const cachedToken = localStorage.getItem('molt_token');
    if (cachedToken) {
        const parsed = JSON.parse(cachedToken);
        console.log("⚡ Loaded token from LocalStorage");
        setTokenData(parsed);
        setTokenFound(true);
        setIsSearching(false);
        if (onTokenFoundGlobal) onTokenFoundGlobal(parsed);
    }

    // 1. Start Scanner IMMEDIATELY (Parallel)
    console.log("🔍 Starting Live Scanner (Parallel)...");
    startTokenScanner((newToken) => {
        if (!mounted) return;
        console.log("🚨 Scanner found token!");
        setTokenData(newToken);
        setTokenFound(true);
        setIsSearching(false);
        localStorage.setItem('molt_token', JSON.stringify(newToken));
        if (onTokenFoundGlobal) onTokenFoundGlobal(newToken);
    });

    // 2. Check Supabase IMMEDIATELY (Parallel)
    const checkDB = async () => {
        console.log("🔄 Fetching latest token from DB...");
        const { data, error } = await supabase
            .from('tokens')
            .select('*')
            .ilike('name', '%moltdict%') 
            .order('id', { ascending: false })
            .limit(1);

        if (error) {
            console.error("❌ Supabase Error:", error);
            return;
        }

        if (data && data.length > 0 && mounted) {
            console.log("✅ Token found in Supabase:", data[0]);
            setTokenData(data[0]);
            setTokenFound(true);
            setIsSearching(false);
            localStorage.setItem('molt_token', JSON.stringify(data[0]));
            if (onTokenFoundGlobal) onTokenFoundGlobal(data[0]);
            
            // If found in DB, we can arguably stop scanning, 
            // but keeping it running ensures we catch if a NEW one is launched (unlikely but possible).
            // For efficiency, let's stop it if we have a valid one.
            stopTokenScanner();
        }
    };
    checkDB();

    // 3. Realtime Subscription (The "Instant" magic for other users)
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tokens' },
        (payload) => {
          if (!mounted) return;
          console.log("🔥 Realtime Insert detected:", payload.new);
          if (payload.new.name.toLowerCase().includes('moltdict')) {
             setTokenData(payload.new);
             setTokenFound(true);
             setIsSearching(false);
             localStorage.setItem('molt_token', JSON.stringify(payload.new));
             if (onTokenFoundGlobal) onTokenFoundGlobal(payload.new);
             stopTokenScanner();
          }
        }
      )
      .subscribe();

    return () => {
        mounted = false;
        stopTokenScanner();
        supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible">
      
      {/* Floating decoration */}
      <div className="absolute top-0 left-1/4 text-6xl opacity-20 animate-bounce delay-700 pointer-events-none select-none">🦞</div>
      <div className="absolute bottom-10 right-1/4 text-4xl opacity-10 animate-pulse delay-300 pointer-events-none select-none">🧂</div>
      
      <div className="max-w-xl space-y-6 z-10">
        <div className="inline-block bg-green-900 text-white border-2 border-green-600 px-4 py-1 rotate-[-2deg] font-bold shadow-[2px_2px_0px_0px_#00ff00] mb-2 cursor-help hover:scale-110 transition-transform">
           $MoltDict on Pumpfun 🚀
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black leading-none transform -rotate-1 text-white">
          Predict <br/>
          <span className="text-green-500 decoration-wavy underline decoration-4">Crypto</span> Chaos!
        </h2>
        <p className="text-xl md:text-2xl border-l-4 border-green-600 pl-4 text-gray-200">
          The only prediction market run by <span className="font-bold text-green-500">$MoltDict</span>. 
          Shed the weak hands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onBetClick}
            className="bg-green-600 text-white text-xl border-2 border-green-900 px-8 py-3 wonky-border hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_#004400] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-2"
          >
            <span>🦞</span> Place a Bet
          </button>
          
          <a 
            href="https://x.com/MoltDict_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white text-xl border-2 border-green-500 px-8 py-3 wonky-border hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_#004400] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] font-bold flex items-center justify-center gap-2 no-underline"
          >
            <span>🐦</span> Twitter
          </a>
        </div>
        
        {/* Token Stats / Growth References - Replaced with Honest Meme Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-2 border-green-900/50 p-4 wonky-border bg-black/20 backdrop-blur-sm mt-4">
           <div className="text-center">
             <div className="text-xs text-gray-400 uppercase font-bold">Molting Status</div>
             <div className="text-xl md:text-2xl font-black text-red-400">Shedding ✂️</div>
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
            * Molt pinch: Strong Buy signal
        </div>
      </div>
      
      <div className="relative w-full md:w-96 min-h-[400px] z-10 flex items-center justify-center">
        {tokenFound ? (
            <TokenCard token={tokenData} />
        ) : (
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                 {/* Abstract "Child Drawing" of a Lobster/Molt - Placeholder until found */}
                <div className="absolute inset-0 bg-green-900 wonky-border animate-pulse opacity-20 rotate-3"></div>
                <div className="absolute inset-0 border-4 border-green-600 bg-black wonky-border flex flex-col items-center justify-center text-center p-4">
                    <span className="text-6xl animate-bounce mb-4">🛰️</span>
                    <h3 className="text-xl font-bold text-green-500">Scanning PumpFun...</h3>
                    <p className="text-sm text-gray-400 mt-2">Waiting for $MoltDict launch...</p>
                    <div className="mt-4 flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-100"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-200"></div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
