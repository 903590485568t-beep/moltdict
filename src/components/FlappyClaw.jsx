import React, { useState, useEffect, useRef } from 'react';

const FlappyClaw = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('flappy-claw-highscore')) || 0);
  const [birdPos, setBirdPos] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  
  const gameLoopRef = useRef();
  const requestRef = useRef();
  const containerRef = useRef();

  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -8;
  const GAP_SIZE = 200;
  const OBSTACLE_SPEED = 3;
  const OBSTACLE_WIDTH = 60;
  const SPAWN_RATE = 1500; // ms

  useEffect(() => {
    if (gameState === 'playing') {
      const spawnInterval = setInterval(() => {
        setObstacles(obs => [
          ...obs,
          {
            x: 800, // Start off screen
            height: Math.random() * (400 - 100) + 100, // Random height
            passed: false
          }
        ]);
      }, SPAWN_RATE);

      return () => clearInterval(spawnInterval);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const loop = () => {
        setBirdPos(pos => {
          const newPos = pos + birdVelocity;
          // Floor/Ceiling collision
          if (newPos > 560 || newPos < 0) {
            handleGameOver();
            return pos;
          }
          return newPos;
        });

        setBirdVelocity(v => v + GRAVITY);

        setObstacles(obs => {
          return obs
            .map(ob => ({ ...ob, x: ob.x - OBSTACLE_SPEED }))
            .filter(ob => ob.x + OBSTACLE_WIDTH > 0);
        });

        // Collision detection
        obstacles.forEach(ob => {
            const birdLeft = 100; // Fixed bird x position
            const birdRight = 140;
            const birdTop = birdPos;
            const birdBottom = birdPos + 40;

            const obsLeft = ob.x;
            const obsRight = ob.x + OBSTACLE_WIDTH;
            
            // Top obstacle collision
            if (
              birdRight > obsLeft && 
              birdLeft < obsRight && 
              birdTop < ob.height
            ) {
              handleGameOver();
            }

            // Bottom obstacle collision
            if (
              birdRight > obsLeft && 
              birdLeft < obsRight && 
              birdBottom > ob.height + GAP_SIZE
            ) {
              handleGameOver();
            }

            // Score counting
            if (!ob.passed && birdLeft > obsRight) {
                ob.passed = true;
                setScore(s => s + 1);
            }
        });

        requestRef.current = requestAnimationFrame(loop);
      };

      requestRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [gameState, birdVelocity, obstacles, birdPos]);

  const handleGameOver = () => {
    setGameState('gameover');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappy-claw-highscore', score);
    }
    cancelAnimationFrame(requestRef.current);
  };

  const jump = () => {
    if (gameState === 'playing') {
      setBirdVelocity(JUMP_STRENGTH);
    } else if (gameState === 'start' || gameState === 'gameover') {
      setGameState('playing');
      setBirdPos(300);
      setBirdVelocity(0);
      setObstacles([]);
      setScore(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4">
      <h2 className="text-4xl font-black text-claw-primary mb-4 transform -rotate-2">Flappy Claw 🦞</h2>
      <p className="mb-4 text-gray-400">Tap, Click or Spacebar to Swim!</p>
      
      <div 
        ref={containerRef}
        onClick={jump}
        className="relative w-full max-w-[800px] h-[600px] bg-blue-900/30 wonky-border overflow-hidden cursor-pointer select-none shadow-[0_0_50px_rgba(0,0,0,0.5)_inset]"
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Bird */}
        <div 
          className="absolute left-[100px] text-4xl transition-transform"
          style={{ 
            top: `${birdPos}px`,
            transform: `rotate(${birdVelocity * 5}deg)`
          }}
        >
          🦞
        </div>

        {/* Obstacles */}
        {obstacles.map((ob, i) => (
          <React.Fragment key={i}>
            {/* Top Obstacle (Seaweed hanging down) */}
            <div 
              className="absolute top-0 bg-green-800 border-x-4 border-b-4 border-green-950 wonky-border-sm"
              style={{
                left: `${ob.x}px`,
                height: `${ob.height}px`,
                width: `${OBSTACLE_WIDTH}px`,
                borderRadius: '0 0 20px 20px'
              }}
            >
                <div className="w-full h-full opacity-30 bg-[radial-gradient(circle,transparent_20%,#000_20%,#000_80%,transparent_80%,transparent),radial-gradient(circle,transparent_20%,#000_20%,#000_80%,transparent_80%,transparent)] bg-[length:20px_20px]"></div>
            </div>

            {/* Bottom Obstacle (Coral rising up) */}
            <div 
              className="absolute bottom-0 bg-red-900 border-x-4 border-t-4 border-red-950 wonky-border-sm"
              style={{
                left: `${ob.x}px`,
                height: `${600 - ob.height - GAP_SIZE}px`,
                width: `${OBSTACLE_WIDTH}px`,
                borderRadius: '20px 20px 0 0'
              }}
            >
                <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:20px_20px]"></div>
            </div>
          </React.Fragment>
        ))}

        {/* Score Overlay */}
        <div className="absolute top-4 right-4 text-4xl font-black text-white drop-shadow-[2px_2px_0_#000]">
            {score}
        </div>

        {/* Start/Game Over Screen */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <h3 className="text-5xl font-bold text-white mb-4">
              {gameState === 'start' ? 'Get Ready!' : 'Game Over!'}
            </h3>
            {gameState === 'gameover' && (
              <div className="text-2xl text-claw-primary mb-6">Score: {score}</div>
            )}
            <div className="text-xl text-gray-300 mb-8">Best: {highScore}</div>
            <button className="px-8 py-4 bg-claw-primary text-white text-2xl font-bold wonky-border hover:scale-105 transition-transform animate-pulse">
              {gameState === 'start' ? 'START SWIMMING' : 'TRY AGAIN'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
          Tip: Avoid the seaweed and coral reefs! They are bearish!
      </div>
    </div>
  );
};

export default FlappyClaw;
