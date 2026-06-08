import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';

interface PriceCalculatorProps {
  onSelectService?: (summary: { bags: number; washFold: boolean; dryClean: boolean; ironing: boolean; total: number }) => void;
}

export default function PriceCalculator({ onSelectService }: PriceCalculatorProps) {
  const [bags, setBags] = useState(3);
  const [serviceType, setServiceType] = useState({
    washFold: true,
    dryClean: false,
    ironing: false,
  });

  // Prices
  const PRICE_PER_BAG_WASH_FOLD = 14.99;
  const PRICE_PER_BAG_DRY_CLEAN = 24.50;
  const PRICE_PER_BAG_IRONING = 9.99;

  // Calculate live estimation
  let costPerBag = 0;
  if (serviceType.washFold) costPerBag += PRICE_PER_BAG_WASH_FOLD;
  if (serviceType.dryClean) costPerBag += PRICE_PER_BAG_DRY_CLEAN;
  if (serviceType.ironing) costPerBag += PRICE_PER_BAG_IRONING;

  // If no services are selected, defaults to 0
  const totalPrice = bags * costPerBag;

  const handleCheckboxChange = (key: 'washFold' | 'dryClean' | 'ironing') => {
    setServiceType(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one service is selected
      if (!next.washFold && !next.dryClean && !next.ironing) {
        return prev;
      }
      return next;
    });
  };

  const handleBook = () => {
    if (onSelectService) {
      onSelectService({
        bags,
        washFold: serviceType.washFold,
        dryClean: serviceType.dryClean,
        ironing: serviceType.ironing,
        total: parseFloat(totalPrice.toFixed(2))
      });
    }
    // Scroll smoothly to booking
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper arrays to render clothes inside the visual basket
  const renderClothesInBasket = () => {
    // Generate clothes based on number of bags
    const clothes = [
      { emoji: '👕', color: 'text-red-400', y: -10, x: -15, rotate: -15 },
      { emoji: '🧦', color: 'text-yellow-400', y: -2, x: 20, rotate: 30 },
      { emoji: '👖', color: 'text-blue-500', y: -5, x: 5, rotate: -5 },
      { emoji: '👔', color: 'text-cyan-400', y: -20, x: -5, rotate: 10 },
      { emoji: '🧣', color: 'text-pink-400', y: -14, x: 18, rotate: -40 },
      { emoji: '👗', color: 'text-purple-400', y: -25, x: -10, rotate: 25 },
      { emoji: '🩳', color: 'text-emerald-400', y: -22, x: 15, rotate: -20 },
      { emoji: '👚', color: 'text-orange-400', y: -30, x: 2, rotate: 12 },
    ];

    // Show clothing items progressively based on bags selected
    const itemsCount = Math.min(clothes.length, Math.ceil(bags / 1.5));
    return clothes.slice(0, itemsCount).map((cloth, idx) => (
      <motion.span
        key={idx}
        initial={{ y: 50, opacity: 0, scale: 0.5 }}
        animate={{ y: cloth.y, x: cloth.x, scale: 1, opacity: 1, rotate: cloth.rotate }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="absolute text-2xl filter drop-shadow-md"
        style={{ left: '42%' }}
      >
        {cloth.emoji}
      </motion.span>
    ));
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-sky-100 flex flex-col lg:flex-row gap-8 items-center">
      
      {/* Left Column: Form & Inputs */}
      <div className="flex-1 w-full space-y-6">
        <div>
          <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
            Estimator
          </span>
          <h4 className="text-2xl font-display font-bold text-slate-800 mt-2">
            Build Your Laundry Bundle
          </h4>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Adjust the slider and configure options to calculate your same-day estimation instantly.
          </p>
        </div>

        {/* Bags Slider Input */}
        <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100/40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-space font-semibold text-slate-700 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-brand-blue" /> Number of Bags
            </span>
            <span className="bg-brand-blue text-white font-display text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-sm">
              {bags} {bags === 1 ? 'Bag' : 'Bags'}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="12"
            value={bags}
            onChange={(e) => setBags(parseInt(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>1 Bag (Solo)</span>
            <span>6 Bags (Family)</span>
            <span>12 Bags (Commercial Load)</span>
          </div>
        </div>

        {/* Checkbox Services Selection */}
        <div className="space-y-3">
          <label className="text-sm font-space font-semibold text-slate-700 block">
            Select Services Included:
          </label>

          {/* Wash & Fold Option */}
          <div
            onClick={() => handleCheckboxChange('washFold')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
              serviceType.washFold
                ? 'border-brand-blue bg-sky-50/50 shadow-sm'
                : 'border-slate-100 hover:border-sky-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                serviceType.washFold ? 'bg-brand-blue border-brand-blue text-white' : 'border-slate-300'
              }`}>
                {serviceType.washFold && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-space font-bold text-slate-800">Standard Wash, Dry & Fold</p>
                <p className="text-[10px] text-slate-400 font-sans">Freshly scented, perfectly crisp folded</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">
              ${PRICE_PER_BAG_WASH_FOLD}/bag
            </span>
          </div>

          {/* Dry Cleaning Option */}
          <div
            onClick={() => handleCheckboxChange('dryClean')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
              serviceType.dryClean
                ? 'border-brand-blue bg-sky-50/50 shadow-sm'
                : 'border-slate-100 hover:border-sky-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                serviceType.dryClean ? 'bg-brand-blue border-brand-blue text-white' : 'border-slate-300'
              }`}>
                {serviceType.dryClean && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-space font-bold text-slate-800">Delicate Dry Cleaning</p>
                <p className="text-[10px] text-slate-400 font-sans">Organic solvents, suit & gown care</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">
              ${PRICE_PER_BAG_DRY_CLEAN}/bag
            </span>
          </div>

          {/* Ironing Option */}
          <div
            onClick={() => handleCheckboxChange('ironing')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
              serviceType.ironing
                ? 'border-brand-blue bg-sky-50/50 shadow-sm'
                : 'border-slate-100 hover:border-sky-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                serviceType.ironing ? 'bg-brand-blue border-brand-blue text-white' : 'border-slate-300'
              }`}>
                {serviceType.ironing && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-space font-bold text-slate-800">Express Steam Ironing</p>
                <p className="text-[10px] text-slate-400 font-sans">Crisp wrinkle-free hanger finish</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">
              ${PRICE_PER_BAG_IRONING}/bag
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Basket Animation + Price Output */}
      <div className="w-full lg:w-80 bg-gradient-to-b from-[#F0F9FF] to-sky-100/40 p-6 rounded-3xl border border-sky-100/60 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[360px] shadow-inner select-none">
        
        {/* Dynamic Clothes & Basket Stage */}
        <div className="w-full relative h-40 flex items-end justify-center pt-8">
          {/* Bubbles Overflowing if bags > 6 */}
          {bags >= 5 && (
            <div className="absolute top-8 inset-x-0 flex justify-center gap-1 z-10">
              <motion.span 
                animate={{ y: [-10, -30], opacity: [0.8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-4 h-4 bg-white/90 border border-sky-200 rounded-full"
              />
              <motion.span 
                animate={{ y: [-5, -25], opacity: [0.6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                className="w-3 h-3 bg-white/90 border border-sky-100 rounded-full"
              />
              <motion.span 
                animate={{ y: [-15, -40], opacity: [0.7, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="w-5 h-5 bg-white/80 border border-sky-200 rounded-full"
              />
            </div>
          )}

          {/* Clothes rendering */}
          {renderClothesInBasket()}

          {/* Basket SVG Element */}
          <div className="relative w-36 h-24 z-10">
            {/* Plastic Laundromat Basket rendering */}
            <svg viewBox="0 0 100 70" className="w-full h-full text-brand-blue fill-current filter drop-shadow-md">
              {/* Basket rim */}
              <ellipse cx="50" cy="15" rx="45" ry="8" className="fill-brand-blue border-b-2 border-white" />
              {/* Basket basket walls */}
              <path d="M 12,15 L 20,62 L 80,62 L 88,15 Z" />
              {/* Holes in the laundry basket for realism */}
              <ellipse cx="30" cy="30" rx="4" ry="4" className="fill-[#F0F9FF]" />
              <ellipse cx="50" cy="30" rx="4" ry="4" className="fill-[#F0F9FF]" />
              <ellipse cx="70" cy="30" rx="4" ry="4" className="fill-[#F0F9FF]" />
              <ellipse cx="40" cy="45" rx="4" ry="4" className="fill-[#F0F9FF]" />
              <ellipse cx="60" cy="45" rx="4" ry="4" className="fill-[#F0F9FF]" />
            </svg>

            {/* Handle visual */}
            <div className="absolute top-2 left-[-10px] right-[-10px] h-3 border-4 border-brand-blue rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Price Output */}
        <div className="w-full mt-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-space font-semibold">
            Estimated Total
          </p>
          
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-lg font-bold text-slate-700">$</span>
            <span className="text-4xl md:text-5xl font-display font-black text-brand-dark-blue tracking-tight">
              {totalPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-[10px] text-slate-400 font-mono mt-1">
            {bags} {bags === 1 ? 'bag' : 'bags'} &bull; ${costPerBag.toFixed(2)}/bag avg
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBook}
          className="mt-6 w-full cursor-pointer bg-brand-blue hover:bg-brand-dark-blue text-white py-3 px-4 rounded-2xl font-display font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 hover:shadow-lg"
        >
          Book This Service <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
