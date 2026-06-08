import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WashingMachineLoaderProps {
  onComplete?: () => void;
  isLoading?: boolean;
}

const LAUNDRY_MESSAGES = [
  "Gathering the virtual laundry baskets...",
  "Powering up the high-spin eco washers...",
  "Infusing water with organic lavender bubbles...",
  "Inspecting fabrics for rogue stains...",
  "Heating up the fluffiest air dryers...",
  "Warming up the steam-glide iron..."
];

export default function WashingMachineLoader({ onComplete, isLoading = true }: WashingMachineLoaderProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through funny laundry-themed loading messages
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LAUNDRY_MESSAGES.length);
    }, 1200);

    // Dynamic progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (onComplete) {
            setTimeout(onComplete, 300);
          }
          return 100;
        }
        return prev + Math.random() * 8 + 3;
      });
    }, 150);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-brand-navy flex flex-col items-center justify-center z-50 px-6">
      {/* Background bubble atmosphere */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-fresh-aqua blur-3xl -top-32 -left-32 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-sky-blue blur-3xl -bottom-32 -right-32" />
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center z-10 max-w-sm"
      >
        {/* Animated Washing Machine */}
        <div className="relative w-40 h-48 bg-white rounded-2xl shadow-2xl border-4 border-sky-blue/20 mx-auto flex flex-col justify-between overflow-hidden">
          {/* Top Panel */}
          <div className="h-12 bg-sky-100 border-b-4 border-sky-blue/20 p-2.5 flex justify-between items-center">
            {/* Control Knobs */}
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-brand-blue border border-sky-blue/30 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-sunshine-yellow" />
              <div className="w-2 h-2 rounded-full bg-soft-mint" />
            </div>
            {/* Digital Display */}
            <div className="bg-brand-navy rounded px-1.5 py-0.5 font-mono text-[10px] text-fresh-aqua font-bold">
              {Math.min(99, Math.round(progress))}%
            </div>
          </div>

          {/* Machine Body & Drum Door */}
          <div className="flex-1 flex items-center justify-center relative bg-sky-50">
            {/* Washing Soap Dispenser line */}
            <div className="absolute top-2 left-3 w-6 h-1.5 bg-gray-300 rounded" />

            {/* Circular Drum */}
            <div className="w-28 h-28 rounded-full border-4 border-sky-300 bg-cyan-900/10 shadow-inner flex items-center justify-center relative overflow-hidden">
              {/* Swirling Water Line (Rotates and slides) */}
              <motion.div 
                animate={{ 
                  y: [40, 20, 30, 42],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-36 h-36 bg-gradient-to-t from-fresh-aqua/60 to-sky-blue/70 -bottom-12 rounded-[40%] flex justify-center items-center"
              >
                {/* White Swirl Suds */}
                <div className="w-3 h-3 bg-white rounded-full absolute top-4 left-6 opacity-80" />
                <div className="w-2.5 h-2.5 bg-white rounded-full absolute bottom-8 right-6 opacity-70" />
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-4 left-8 opacity-90" />
              </motion.div>

              {/* Clothes in Washer */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute w-14 h-14 flex items-center justify-center"
              >
                {/* Visual clothing items */}
                <span className="text-3xl filter drop-shadow">👕</span>
                <span className="text-xl absolute -top-1 -right-1 filter drop-shadow">🧦</span>
              </motion.div>

              {/* Glossy Reflection Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none rounded-full" />
            </div>
          </div>

          {/* Base of Washing Machine */}
          <div className="h-2 bg-sky-200" />
        </div>

        {/* Spinner progress spinner text */}
        <div className="mt-8">
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-sm font-sans font-medium tracking-wide"
              >
                {LAUNDRY_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar Container */}
          <div className="w-48 bg-cyan-950 rounded-full h-1.5 mx-auto mt-4 overflow-hidden p-[1px] border border-fresh-aqua/20">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-fresh-aqua via-sky-blue to-sunshine-yellow h-full rounded-full"
            />
          </div>
          <div className="text-[11px] font-space text-sky-200/60 mt-2 uppercase tracking-widest font-semibold">
            EST. SPIN SPEED &bull; 1400 RPM
          </div>
        </div>
      </motion.div>
    </div>
  );
}
