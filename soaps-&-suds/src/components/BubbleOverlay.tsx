import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Bubble {
  id: number;
  x: number; // percentage from left
  size: number; // px size
  duration: number; // float duration in seconds
  delay: number; // start delay
  burst: boolean;
}

export default function BubbleOverlay() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [popScore, setPopScore] = useState(0);

  // Initialize bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // Keep away from extreme edges
      size: Math.random() * 40 + 15,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      burst: false,
    }));
    setBubbles(initialBubbles);

    // Keep adding new bubbles as older ones complete or pop
    const interval = setInterval(() => {
      setBubbles((prev) => {
        // If we have less than 18 bubbles, inject a new one
        if (prev.filter((b) => !b.burst).length < 20) {
          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * 95 + 2.5,
              size: Math.random() * 35 + 15,
              duration: Math.random() * 10 + 8,
              delay: 0,
              burst: false,
            },
          ];
        }
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handlePop = (id: number) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, burst: true } : b))
    );
    setPopScore((prev) => prev + 1);

    // Remove popped bubble from state after burst animation
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 400);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Dynamic Pop Counter in bottom corner - subtle, playful */}
      {popScore > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-24 right-6 bg-brand-blue/85 backdrop-blur-md text-white py-1.5 px-3 rounded-full text-xs font-display flex items-center gap-1.5 shadow-lg border border-sky-200/20 z-40 pointer-events-auto"
        >
          <span className="text-sunshine-yellow font-bold">✨ {popScore}</span> Bubbles Popped!
          <button 
            onClick={() => setPopScore(0)}
            className="ml-1 hover:text-sunshine-yellow transition-colors font-sans text-[10px] uppercase font-bold"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Render Active Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => {
          if (bubble.burst) {
            // Burst animation
            return (
              <div
                key={`burst-${bubble.id}`}
                className="absolute"
                style={{
                  left: `${bubble.x}%`,
                  bottom: '50%', // approximate height static center or simple top fade
                  width: bubble.size,
                  height: bubble.size,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="absolute w-2 h-2 bg-fresh-aqua/60 rounded-full animate-ping" />
                  <span className="absolute w-1 h-1 bg-white/80 rounded-full translate-x-3 -translate-y-3" />
                  <span className="absolute w-1 h-1 bg-white/80 rounded-full -translate-x-3 translate-y-3" />
                  <span className="absolute w-1.5 h-1.5 bg-sky-300/80 rounded-full -translate-y-3 translate-x-1" />
                </div>
              </div>
            );
          }

          return (
            <motion.div
              key={bubble.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${bubble.x}%`,
                bottom: '-60px',
                width: bubble.size,
                height: bubble.size,
              }}
              initial={{ y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                y: '-200vh', // Float way up above browser window
                opacity: [0, 0.7, 0.7, 0.6, 0.3, 0],
                scale: [0.6, 1, 1, 1.1, 1.2, 1.3],
                x: [0, 30, -30, 25, -15, 0], // S-curve drift
              }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }}
              onClick={() => handlePop(bubble.id)}
              onMouseEnter={() => {
                // Pop on hover to make it even easier and more satisfying!
                handlePop(bubble.id);
              }}
            >
              {/* Bubble Visual Styles - Realistic translucent soap bubble with rainbow specular reflections */}
              <div className="w-full h-full rounded-full relative border border-white/50 bg-gradient-to-tr from-fresh-aqua/10 via-sky-blue/20 to-pink-300/15 backdrop-blur-[0.5px] shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),_0_2px_4px_rgba(3,169,244,0.1)] group-hover:scale-110 transition-transform duration-150">
                {/* Bubble Highlight Specular Reflection */}
                <div className="absolute top-[15%] left-[20%] w-[25%] h-[25%] rounded-full bg-white/70 filter blur-[0.5px]" />
                <div className="absolute bottom-[20%] right-[20%] w-[15%] h-[15%] rounded-full bg-pink-100/30" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
