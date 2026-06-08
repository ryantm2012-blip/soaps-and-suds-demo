import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 shadow-xl border border-sky-100">
      <div className="mb-4 text-center">
        <h4 className="text-xl font-display font-bold text-slate-800">See the Difference We Make</h4>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Drag the blue slider to watch coffee and soup stains vanish!
        </p>
      </div>

      {/* Interactive slider window */}
      <div
        ref={containerRef}
        className="relative h-72 md:h-80 w-full rounded-2xl overflow-hidden cursor-ew-resize bg-[#F0F9FF] border border-sky-100 select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* BEFORE IMAGE (Stained Clothing) - Full width */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4">
          <div className="relative w-48 h-56 flex items-center justify-center">
            {/* T-Shirt Base SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-100 fill-current drop-shadow-md">
              <path d="M 30,10 C 35,14 65,14 70,10 L 88,24 C 90,26 88,32 82,32 L 78,31 L 78,85 C 78,88 74,90 70,90 L 30,90 C 26,90 22,88 22,85 L 22,31 L 18,32 C 12,32 10,26 12,24 Z" />
            </svg>
            
            {/* Stains (Brown / Tomato red) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {/* Coffee Stain */}
              <div 
                className="absolute top-[35%] left-[30%] w-12 h-10 bg-amber-800/60 rounded-full filter blur-[4px] transform rotate-12"
                style={{ clipPath: 'polygon(20% 0%, 80% 20%, 100% 60%, 50% 90%, 0% 50%)' }}
              />
              {/* Tomato Soup Splatter */}
              <div 
                className="absolute top-[50%] right-[32%] w-10 h-8 bg-red-600/50 rounded-full filter blur-[3px] transform -rotate-45"
                style={{ clipPath: 'polygon(10% 20%, 90% 0%, 70% 80%, 30% 90%)' }}
              />
              {/* Grass Stain */}
              <div 
                className="absolute bottom-[20%] left-[45%] w-14 h-6 bg-emerald-800/40 rounded-full filter blur-[5px] transform rotate-6"
              />
            </div>
            
            {/* "Dirty" label stamp */}
            <span className="absolute top-4 left-4 bg-red-500/90 text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full shadow-inner select-none uppercase tracking-wider">
              Stubborn Stain
            </span>
          </div>
        </div>

        {/* AFTER IMAGE (Fresh Clean Coating) - Positioned layered on top with clip-path */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 bg-sky-50 overflow-hidden pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <div className="relative w-48 h-56 flex items-center justify-center">
            {/* Shiny White Clean T-Shirt SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current drop-shadow-lg">
              <path d="M 30,10 C 35,14 65,14 70,10 L 88,24 C 90,26 88,32 82,32 L 78,31 L 78,85 C 78,88 74,90 70,90 L 30,90 C 26,90 22,88 22,85 L 22,31 L 18,32 C 12,32 10,26 12,24 Z" />
            </svg>

            {/* Sparkle animations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.span 
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[25%] right-[25%] text-2xl text-sunshine-yellow filter drop-shadow-sm"
              >
                ✨
              </motion.span>
              <motion.span 
                animate={{ scale: [1.1, 0.7, 1.1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute bottom-[30%] left-[20%] text-xl text-fresh-aqua filter drop-shadow-sm"
              >
                ✨
              </motion.span>
              {/* Soft fresh gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-blue/5 to-white/10 rounded-xl" />
            </div>

            {/* "Fresh" label stamp */}
            <span className="absolute top-4 left-4 bg-green-500/90 text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full shadow-inner select-none uppercase tracking-wider">
              Perfect Wash
            </span>
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand-blue cursor-ew-resize flex items-center justify-center z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-brand-blue border-4 border-white text-white flex items-center justify-center shadow-lg transform -translate-x-1/2 hover:scale-110 active:scale-95 transition-all duration-150">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Labels positioned as feedback */}
        <div className="absolute bottom-4 left-4 font-space text-xs font-bold text-slate-400 bg-white/80 backdrop-blur px-2.5 py-1 rounded-md shadow-sm">
          Before
        </div>
        <div className="absolute bottom-4 right-4 font-space text-xs font-bold text-brand-blue bg-sky-100/95 backdrop-blur px-2.5 py-1 rounded-md shadow-sm">
          After
        </div>
      </div>
    </div>
  );
}
