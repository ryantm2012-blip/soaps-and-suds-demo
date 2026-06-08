import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  avatarColor: string;
  avatarEmoji: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah",
    name: "Sarah M.",
    role: "Busy mother of 3",
    quote: "My clothes always come back perfectly folded and smelling amazing. I used to spend my entire Sunday doing laundry, but now I get that time back to play with my kids!",
    stars: 5,
    avatarColor: "bg-amber-100 text-amber-700",
    avatarEmoji: "👩‍🦰"
  },
  {
    id: "james",
    name: "James K.",
    role: "Tech Consultant",
    quote: "The pickup and delivery service saves me so much time. They pick it up from my porch, and 24 hours later, it's back, ironed, on hangers. Simply flawless service.",
    stars: 5,
    avatarColor: "bg-sky-100 text-sky-700",
    avatarEmoji: "🧔"
  },
  {
    id: "priya",
    name: "Priya N.",
    role: "Local Cafe Owner",
    quote: "Fast, affordable, and incredibly friendly staff. We use them for all our commercial kitchen towels and aprons. They look as bright as new, and prices are unbeatable.",
    stars: 5,
    avatarColor: "bg-emerald-100 text-emerald-700",
    avatarEmoji: "👩‍💼"
  },
  {
    id: "marcus",
    name: "Marcus A.",
    role: "Fitness Instructor",
    quote: "With so many workout clothes, standard washing machines just look tired. Soaps & Suds makes my sports gear smell entirely fresh and completely sweat-free!",
    stars: 5,
    avatarColor: "bg-violet-100 text-violet-700",
    avatarEmoji: "👨‍🚀"
  }
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance slide intervals
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-sky-50 relative overflow-hidden select-none">
      
      {/* Absolute giant quote background indicator */}
      <Quote className="absolute right-6 top-6 w-32 h-32 text-sky-50 opacity-40 pointer-events-none" />

      {/* Slide body with transitions */}
      <div className="relative min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Stars rendering */}
            <div className="flex gap-1 mb-4 justify-center">
              {Array.from({ length: TESTIMONIALS[activeIndex].stars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-sunshine-yellow text-sunshine-yellow filter drop-shadow-sm" />
              ))}
            </div>

            {/* Quote content */}
            <blockquote className="text-slate-600 font-sans italic text-sm md:text-base leading-relaxed max-w-xl">
              "{TESTIMONIALS[activeIndex].quote}"
            </blockquote>

            {/* Bio info */}
            <div className="mt-6 flex items-center gap-3">
              {/* Illustrated profile avatar */}
              <div className={`w-11 h-11 rounded-full ${TESTIMONIALS[activeIndex].avatarColor} border border-white flex items-center justify-center text-2xl shadow-sm`}>
                {TESTIMONIALS[activeIndex].avatarEmoji}
              </div>
              <div className="text-left">
                <p className="font-display font-bold text-sm text-slate-800">
                  {TESTIMONIALS[activeIndex].name}
                </p>
                <p className="text-[10px] text-slate-400 font-space tracking-wider uppercase font-semibold">
                  {TESTIMONIALS[activeIndex].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
        {/* Step dots */}
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-200'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full border border-slate-100 hover:border-sky-100 hover:bg-sky-50 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full border border-slate-100 hover:border-sky-100 hover:bg-sky-50 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
