import React, { useState, useEffect } from 'react';

const ClawClicker = () => {
  const [count, setCount] = useState(() => {
    // Persist clicks in localStorage so users feel accomplished
    const saved = localStorage.getItem('claw-pinches');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    localStorage.setItem('claw-pinches', count);
  }, [count]);

  const handleClick = (e) => {
    setCount(c => c + 1);
    
    // Create a temporary floating element
    const id = Date.now();
    // Random horizontal offset
    const randomX = (Math.random() - 0.5) * 60; 
    
    setClicks(prev => [...prev, { id, x: randomX, text: getRandomText() }]);
    
    // Clean up old clicks
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== id));
    }, 1000);
  };

  const getRandomText = () => {
    const phrases = ["PINCH!", "SNAP!", "+1", "OUCH!", "CLAWED!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
       {/* Floating Numbers/Text Container */}
       <div className="relative w-full h-0 pointer-events-none">
         {clicks.map(click => (
           <div 
             key={click.id}
             className="absolute bottom-24 right-10 text-xl font-black text-claw-primary whitespace-nowrap pointer-events-none select-none"
             style={{
               '--tx': `${click.x}px`,
               animation: 'float-up 0.8s ease-out forwards'
             }}
           >
             {click.text}
           </div>
         ))}
       </div>

      <div className="bg-black text-white p-2 border-2 border-claw-primary wonky-border text-center min-w-[120px] shadow-[4px_4px_0px_0px_#800000]">
        <div className="text-xs text-gray-400 font-mono">TOTAL PINCHES</div>
        <div className="text-2xl font-black">{count.toLocaleString()}</div>
      </div>

      <button 
        onClick={handleClick}
        className="bg-red-600 w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:scale-110 active:scale-90 transition-all flex items-center justify-center text-4xl cursor-pointer hover:rotate-12 select-none"
        title="Pinch Claw!"
      >
        🦞
      </button>
      
      <style>{`
        @keyframes float-up {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ClawClicker;
