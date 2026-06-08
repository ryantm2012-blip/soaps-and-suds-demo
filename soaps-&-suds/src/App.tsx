import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChevronRight, 
  Shirt, 
  Trash2, 
  Truck, 
  Clock3, 
  Scissors, 
  Award, 
  Smile, 
  Coins, 
  ShieldCheck, 
  Check, 
  Star,
  ThumbsUp,
  Heart,
  Calendar,
  Send,
  MessageCircle,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// Custom sub-components
import StickyHeader from './components/StickyHeader';
import BubbleOverlay from './components/BubbleOverlay';
import WashingMachineLoader from './components/WashingMachineLoader';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import GalleryLightbox from './components/GalleryLightbox';
import PriceCalculator from './components/PriceCalculator';
import TestimonialCarousel from './components/TestimonialCarousel';
import FAQAccordion from './components/FAQAccordion';
import BookingForm from './components/BookingForm';

// Reusable Count-Up Animation Component
function AnimatedCountUp({ end, suffix = "", duration = 1500 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="font-display font-black text-3xl md:text-4xl text-slate-800 tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [selectedCalcSummary, setSelectedCalcSummary] = useState({
    bags: 3,
    washFold: true,
    dryClean: false,
    ironing: false,
    total: 44.97
  });

  const handleCalculatorSync = (summary: { bags: number; washFold: boolean; dryClean: boolean; ironing: boolean; total: number }) => {
    setSelectedCalcSummary(summary);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <>
      {/* 1. INITIAL LOADING SCREEN */}
      <AnimatePresence>
        {initialLoading && (
          <WashingMachineLoader 
            isLoading={initialLoading} 
            onComplete={() => setInitialLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!initialLoading && (
        <div className="bg-gradient-to-b from-[#F3F9FD] via-white to-[#EEF7FC] text-slate-700 font-sans min-h-screen pt-24 overflow-x-hidden relative">
          
          {/* 2. FLOATING SOAP BUBBLE ATMOSPHERE */}
          <BubbleOverlay />

          {/* 3. STICKY NAV HEADER */}
          <StickyHeader />

          {/* 4. HERO SECTION */}
          <section id="hero" className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
            {/* Background glowing blobs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-fresh-aqua/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column Text details */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-sky-100/90 text-brand-blue py-1.5 px-4 rounded-full text-xs font-space font-bold uppercase tracking-wider shadow-sm border border-sky-200/50">
                    <Sparkles className="w-3.5 h-3.5 text-sunshine-yellow fill-sunshine-yellow animate-spin" style={{ animationDuration: '3s' }} /> Same-Day Clothes Care Experts
                  </div>

                  <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-tight tracking-tight">
                    Fresh Clothes.<br/>
                    <span className="text-brand-blue relative">
                      Happy Days.
                      {/* Artistic vector underline */}
                      <svg viewBox="0 0 100 10" className="absolute left-0 bottom-[-6px] w-full h-2 text-sunshine-yellow fill-current pointer-events-none">
                        <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </span>
                  </h1>

                  <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Fast, reliable, affordable laundry services that give you more time for the things you love. Let us handle the dirt while you enjoy your life.
                  </p>

                  {/* Main Call to Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <a
                      href="#booking"
                      className="w-full sm:w-auto text-center cursor-pointer bg-brand-blue hover:bg-brand-dark-blue text-white font-display text-sm font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center justify-center gap-2 group"
                    >
                      Schedule Pickup 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a
                      href="#services"
                      className="w-full sm:w-auto text-center cursor-pointer bg-white hover:bg-sky-50 text-brand-blue border border-sky-200 py-3.5 px-8 rounded-full font-display text-sm font-bold transition-colors block"
                    >
                      View Services
                    </a>
                  </div>

                  {/* Hero Statistics Counters Block */}
                  <div className="pt-8 border-t border-sky-100/60 grid grid-cols-3 gap-4">
                    <div className="text-center lg:text-left">
                      <AnimatedCountUp end={10024} suffix="+" />
                      <p className="text-[10px] sm:text-xs text-slate-500 font-space font-medium uppercase tracking-wider block mt-1">Loads Cleaned</p>
                    </div>
                    <div className="text-center lg:text-left border-l border-sky-100 pl-4">
                      <AnimatedCountUp end={520} suffix="+" />
                      <p className="text-[10px] sm:text-xs text-slate-500 font-space font-medium uppercase tracking-wider block mt-1">Happy Clients</p>
                    </div>
                    <div className="text-center lg:text-left border-l border-sky-100 pl-4">
                      <span className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-emerald-600 leading-none">FREE</span>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-space font-medium uppercase tracking-wider block mt-2">Delivery &lt; 5mi</p>
                    </div>
                  </div>
                </div>

                {/* Right Column Layout: Pristine Graphic Illustration Pile */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                  
                  {/* Ambient Bubble Ring Frame */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-full border border-sky-200/50 shadow-inner flex items-center justify-center p-6">
                    
                    {/* Layered Colorful CSS towels */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="absolute text-5xl top-6 left-12 animate-bounce" style={{ animationDelay: '0.4s' }}>🧼</span>
                      <span className="absolute text-3xl bottom-12 left-6">🫧</span>
                      <span className="absolute text-4xl top-10 right-10 animate-pulse">✨</span>
                      <span className="absolute text-2xl bottom-6 right-16">👖</span>
                    </div>

                    {/* Towel stack illustration */}
                    <div className="flex flex-col items-center justify-end pb-12 w-full h-full relative z-10 cursor-pointer group">
                      
                      {/* Top Soft Mint folded blanket */}
                      <motion.div 
                        whileHover={{ y: -8 }}
                        className="w-10/12 h-6 bg-soft-mint rounded-lg border-2 border-white/80 shadow transform -rotate-1 relative"
                      >
                        <div className="absolute top-1 left-2 w-4 h-1.5 bg-white/40 rounded-full" />
                      </motion.div>

                      {/* Sunshine yellow towel */}
                      <motion.div 
                        whileHover={{ y: -12 }}
                        className="w-11/12 h-7 bg-sunshine-yellow rounded-lg border-2 border-white/80 shadow -mt-2 transform rotate-1 relative"
                      >
                        <div className="absolute top-1.5 left-3 w-6 h-1.5 bg-white/30 rounded-full" />
                      </motion.div>

                      {/* Fresh Aqua towel */}
                      <motion.div 
                        whileHover={{ y: -15 }}
                        className="w-[96%] h-8 bg-fresh-aqua rounded-lg border-2 border-white/80 shadow -mt-2 transform -rotate-1 relative"
                      >
                        <span className="absolute top-1 right-2 text-xs">✨</span>
                      </motion.div>

                      {/* Navy Blue bottom base towel */}
                      <motion.div 
                        className="w-full h-10 bg-brand-blue rounded-xl border-2 border-white shadow-lg -mt-3 relative"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-space font-extrabold tracking-widest text-white uppercase opacity-90">SOAPS & SUDS</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Circle badges pulsing */}
                    <div className="absolute bottom-4 right-2 bg-sunshine-yellow pulse-badge text-brand-navy p-3 rounded-full text-center font-display font-extrabold text-xs tracking-tight shadow-md z-20">
                      SAME DAY<br/><span className="text-[10px] font-bold">AVAILABLE!</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 5. SERVICES CARDS HIGHLIGHTS */}
          <section id="services" className="py-16 bg-white border-y border-sky-100/40 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header block */}
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Our Specialties
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Worry-Free Laundry Solutions
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Enjoy custom settings for all types of clothing. Checked, sorted, washed, folded and returned with love.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* 1. Wash & Fold */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-b from-[#F3F9FD] to-white rounded-3xl p-5 border border-sky-100/50 shadow hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4">👕</div>
                    <h3 className="font-display font-extrabold text-slate-800 text-base leading-tight">Wash & Fold</h3>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                      Freshly cleaned, sorted, dried, and returned soft, flat, and ready to wear.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-mono">From $14.99/bag</span>
                    <a href="#pricing" className="text-xs font-bold text-brand-blue hover:underline">Calculate &rarr;</a>
                  </div>
                </motion.div>

                {/* 2. Dry Cleaning */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-b from-[#FFFDF0] to-white rounded-3xl p-5 border border-amber-100/50 shadow hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4">👔</div>
                    <h3 className="font-display font-extrabold text-slate-800 text-base leading-tight">Dry Cleaning</h3>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                      Professional care for organic yarns, coats, suits, wedding gowns, and formal wear.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-mono">From $24.50/bag</span>
                    <a href="#pricing" className="text-xs font-bold text-brand-blue hover:underline">Calculate &rarr;</a>
                  </div>
                </motion.div>

                {/* 3. Ironing Services */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-b from-[#F0FFF4] to-white rounded-3xl p-5 border border-emerald-100/50 shadow hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4">💨</div>
                    <h3 className="font-display font-extrabold text-slate-800 text-base leading-tight">Ironing Only</h3>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                      Steam press station ensuring crisp, sharp, wrinkle-free clothes returned on sturdy hangers.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-mono">From $9.99/bag</span>
                    <a href="#pricing" className="text-xs font-bold text-brand-blue hover:underline">Calculate &rarr;</a>
                  </div>
                </motion.div>

                {/* 4. Pickup & Delivery */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-b from-[#F3F9FD] to-white rounded-3xl p-5 border border-sky-100/50 shadow hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4">🚚</div>
                    <h3 className="font-display font-extrabold text-slate-800 text-base leading-tight">Pickup & Delivery</h3>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                      Zero-friction doorstop service. We collect your bag and deliver it back freshly cleaned in 24h.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-600 font-semibold font-mono">Free &lt; 5 miles</span>
                    <a href="#booking" className="text-xs font-bold text-brand-blue hover:underline">Book Now &rarr;</a>
                  </div>
                </motion.div>

                {/* 5. Commercial Laundry */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-b from-[#FAF5FF] to-white rounded-3xl p-5 border border-purple-100/50 shadow hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4">🏢</div>
                    <h3 className="font-display font-extrabold text-slate-800 text-base leading-tight">Commercial</h3>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                      Scale solutions for hotels, gyms, salons, restaurants, and medical client linens.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-mono">Custom Quotes</span>
                    <a href="https://wa.me/15550199" target="_blank" rel="noreferrer" className="text-xs font-bold text-brand-blue hover:underline">Inquire &rarr;</a>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* 6. ABOUT US SECTION */}
          <section id="about" className="py-16 lg:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left side process vector diagram */}
                <div className="relative flex justify-center">
                  <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-sky-100 to-emerald-50 rounded-3xl border border-sky-100 p-6 shadow-inner relative flex items-center justify-center">
                    
                    {/* Floating mini bubblers */}
                    <div className="absolute top-4 left-4 text-xs bg-white py-1 px-2.5 rounded-full shadow-sm font-space font-medium text-slate-500 animate-bounce">
                      🧼 Hypoallergenic Soap
                    </div>
                    <div className="absolute bottom-6 right-6 text-xs bg-white py-1 px-2.5 rounded-full shadow-sm font-space font-medium text-slate-500 animate-bounce" style={{ animationDelay: '0.6s' }}>
                      🍃 Eco-Friendly Dryer sheets
                    </div>

                    {/* Cute washing machine schematic layout */}
                    <div className="text-center space-y-4">
                      {/* Interactive giant spinning graphic */}
                      <div className="w-32 h-32 rounded-full border-8 border-white bg-slate-100 mx-auto flex items-center justify-center relative shadow-md overflow-hidden">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                          className="w-24 h-24 border-4 border-dashed border-fresh-aqua/60 rounded-full flex items-center justify-center"
                        >
                          <span className="text-5xl">🌀</span>
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-blue/10 to-transparent" />
                      </div>
                      <p className="font-display font-bold text-base text-brand-navy">Tripled-Filtered Air Purification</p>
                      <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">We use high-grade mechanical filters that recycle and warm fresh air to eliminate fluff allergens from garments.</p>
                    </div>

                  </div>
                </div>

                {/* Right side Info text */}
                <div className="space-y-6">
                  <span className="bg-[#E0F7FA] text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                    Why Everyone Loves Us
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-display font-black text-brand-navy leading-tight">
                    Why Everyone Loves Soaps & Suds
                  </h3>
                  
                  <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed">
                    At Soaps & Suds, we believe laundry should be easy, affordable, and stress-free. Our team treats every single load with personal care, ensuring your clothes come back absolutely fresh, perfectly clean, and smelling like a lavender spring day.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex gap-2.5">
                      <div className="bg-sky-100/70 p-1.5 rounded-xl text-brand-blue block h-fit">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">100% Organic Soaps</h4>
                        <p className="text-[11px] text-slate-500 font-sans">Baby-friendly, toxic-chemical free</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="bg-sky-100/70 p-1.5 rounded-xl text-brand-blue block h-fit">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Delicate Stain Audit</h4>
                        <p className="text-[11px] text-slate-500 font-sans">Individual fibers checked by hand</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="bg-sky-100/70 p-1.5 rounded-xl text-brand-blue block h-fit">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Allergen Free</h4>
                        <p className="text-[11px] text-slate-500 font-sans">We never mix your clothes with other loads</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="bg-sky-100/70 p-1.5 rounded-xl text-brand-blue block h-fit">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Punctual Drivers</h4>
                        <p className="text-[11px] text-slate-500 font-sans">Real-time GPS porch notifications</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="#booking"
                    className="inline-flex cursor-pointer bg-brand-blue hover:bg-brand-dark-blue text-white py-3 px-6 rounded-full font-display text-xs font-bold transition-colors"
                  >
                    Experience Safe Laundry Today
                  </a>
                </div>

              </div>
            </div>
          </section>

          {/* 7. HOW IT WORKS TIMELINE */}
          <section id="timeline" className="py-16 bg-gradient-to-b from-white to-[#EEF7FC] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Simple 4-Step Process
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  How Soaps & Suds Works
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Ready, set, fresh! Our contactless streamlined pipeline gets laundry completed in under 24 hours.
                </p>
              </div>

              {/* Steps grid with connecting line */}
              <div className="relative">
                {/* Horizontal connection line for desktops */}
                <div className="hidden lg:block absolute top-[64px] left-[15%] right-[15%] h-1 bg-gradient-to-r from-sky-200 via-emerald-200 to-sky-200 z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                  
                  {/* Step 1 */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-3xl border border-sky-100 text-center shadow-sm relative group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-brand-blue mx-auto flex items-center justify-center text-xl font-bold font-display shadow-inner mb-4 relative z-10 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      1
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-800">Schedule a Pickup</h3>
                    <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
                      Select your preferred timeslot online or via WhatsApp in under 60 seconds.
                    </p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-3xl border border-sky-100 text-center shadow-sm relative group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-xl font-bold font-display shadow-inner mb-4 relative z-10 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      2
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-800">We Collect It</h3>
                    <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
                      Our friendly driver sweeps your laundry bags straight from your doorstep safely.
                    </p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-3xl border border-sky-100 text-center shadow-sm relative group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-xl font-bold font-display shadow-inner mb-4 relative z-10 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      3
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-800">We Wash, Dry & Fold</h3>
                    <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
                      Every garment is audited, organic sanitized, fluff dried, and crisply aligned.
                    </p>
                  </motion.div>

                  {/* Step 4 */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-3xl border border-sky-100 text-center shadow-sm relative group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-brand-blue mx-auto flex items-center justify-center text-xl font-bold font-display shadow-inner mb-4 relative z-10 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      4
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-800">We Deliver Back Fresh</h3>
                    <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
                      Within 24 hours, your clothes return on hangers, ready to slide straight into your wardrobe.
                    </p>
                  </motion.div>

                </div>
              </div>

            </div>
          </section>

          {/* 8. INTERACTIVE PRICING CALCULATOR SECTION */}
          <section id="pricing" className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Simple Flat pricing
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Estimate Your Laundry Instantly
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Adjust standard laundry counts to get clear estimations without surprise add-on costs.
                </p>
              </div>

              {/* Calculator Component */}
              <PriceCalculator onSelectService={handleCalculatorSync} />

            </div>
          </section>

          {/* 9. STAIN REMOVAL SHOWCASE SECTION */}
          <section id="showcase" className="py-16 bg-sky-50/50 border-y border-sky-100/30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Text column */}
                <div className="lg:col-span-5 space-y-5">
                  <span className="bg-amber-100 text-amber-700 py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                    Stain Magic
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-display font-black text-slate-800 leading-tight">
                    Dirt & Coffee Splatters Have Met Their Match
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    We use organic active-enzyme cleaning concentrates that gently break down rigid tannin molecules (coffee, red wine, baby formula, grass) without fading delicate fabrics or leaking dyes.
                  </p>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-space text-slate-600 font-semibold">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-[10px]">✔</div>
                      Eco-friendly mechanical pre-treat washes
                    </div>
                    <div className="flex items-center gap-2 text-xs font-space text-slate-600 font-semibold">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-[10px]">✔</div>
                      Absolutely chlorine bleach-free protection
                    </div>
                  </div>
                </div>

                {/* Slider Column */}
                <div className="lg:col-span-7">
                  <BeforeAfterSlider />
                </div>

              </div>
            </div>
          </section>

          {/* 10. REVIEWS SECTION WITH CAROUSEL */}
          <section id="reviews" className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-purple-100 text-[#7B1FA2] py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Happy Families
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Loved by Local Neighborhoods
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  We treat every item as if it were our own. See why laundry day has become the favorite day of the week!
                </p>
              </div>

              {/* Testimonials Carousel widget */}
              <TestimonialCarousel />

            </div>
          </section>

          {/* 11. FUN FACTS STATS FLASH */}
          <section className="py-12 bg-brand-navy text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#26C6DA_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Fact 1 */}
                <div className="text-center space-y-1">
                  <p className="text-3xl md:text-4xl font-display font-black text-sunshine-yellow">25,000+</p>
                  <p className="text-[10px] md:text-xs font-space uppercase tracking-widest text-sky-200/80 font-bold">Shirts Handled</p>
                </div>

                {/* Fact 2 */}
                <div className="text-center space-y-1 border-l border-white/10">
                  <p className="text-3xl md:text-4xl font-display font-black text-white">15,000+</p>
                  <p className="text-[10px] md:text-xs font-space uppercase tracking-widest text-sky-200/80 font-bold">Towels Fluffed</p>
                </div>

                {/* Fact 3 */}
                <div className="text-center space-y-1 border-l border-white/10">
                  <p className="text-3xl md:text-4xl font-display font-black text-fresh-aqua">8,000+</p>
                  <p className="text-[10px] md:text-xs font-space uppercase tracking-widest text-sky-200/80 font-bold">Deliveries Fulfilled</p>
                </div>

                {/* Fact 4 */}
                <div className="text-center space-y-1 border-l border-white/10">
                  <p className="text-3xl md:text-4xl font-display font-black text-soft-mint">99%</p>
                  <p className="text-[10px] md:text-xs font-space uppercase tracking-widest text-sky-200/80 font-bold">Client Star Rating</p>
                </div>

              </div>
            </div>
          </section>

          {/* 12. EXPANDABLE LIGHTBOX PHOTO GALLERY SECTION */}
          <section id="gallery" className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Behind the Bubbles
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Take a Peek at Our Spic-and-Span Setup
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Click on any card box down below to explore our delivery van, laundry folders, and friendly facilities!
                </p>
              </div>

              {/* Lightbox Gallery Container */}
              <GalleryLightbox />

            </div>
          </section>

          {/* 13. SPECIAL OFFERS PROMOTION CARDS SECTION */}
          <section id="offers" className="py-16 bg-[#F3F9FD]/60 border-y border-sky-100/20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-amber-100 text-amber-700 py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Suds Savings
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Special Laundromat Member Perks
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Save on your laundry bills with these exclusive limited packages and discounts.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Offer 1 */}
                <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-sunshine-yellow pulse-badge text-brand-navy font-display font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase">
                    Newcomer
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-800 mt-2">First Load 20% Off</h4>
                    <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                      Got a dirty sack ready? Sign up for your first scheduling pickup and receive an instant 20% flat discount on invoice total. Use code <span className="font-mono font-bold bg-[#E0F7FA] px-1 rounded text-brand-blue">FIRSTSUD20</span>
                    </p>
                  </div>
                  <a href="#booking" className="mt-6 font-space font-bold text-xs text-brand-blue hover:text-brand-dark-blue flex items-center gap-1">
                    Redeem Code &rarr;
                  </a>
                </div>

                {/* Offer 2 */}
                <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-brand-blue text-white font-display font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase">
                    Value Bag
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-800 mt-2">Family Care Bundles</h4>
                    <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                      More than 4 home members? Pre-order our 12-Bag Monthly allotment card to receive absolute same-day pickup priorities and save 15% aggregate charges.
                    </p>
                  </div>
                  <a href="https://wa.me/15550199" target="_blank" rel="noreferrer" className="mt-6 font-space font-bold text-xs text-brand-blue hover:text-brand-dark-blue flex items-center gap-1">
                    WhatsApp Inquiry &rarr;
                  </a>
                </div>

                {/* Offer 3 */}
                <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white font-display font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase">
                    Campus ID
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-800 mt-2">Student Discounts</h4>
                    <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                      Studying hard? Bring your active local high school or university ID badge and get 10% off dry-cleaning on bedding sheets, jeans, sweatshirts, and graduation uniforms.
                    </p>
                  </div>
                  <a href="#booking" className="mt-6 font-space font-bold text-xs text-brand-blue hover:text-brand-dark-blue flex items-center gap-1">
                    Book Pickup &rarr;
                  </a>
                </div>

                {/* Offer 4 */}
                <div className="bg-white p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-indigo-500 text-white font-display font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase">
                    VIP Auto
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-800 mt-2">Monthly Member Plans</h4>
                    <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                      Enjoy hassle-free automatic weekly laundry pickup cycles! Cancel anytime. Zero delivery fees, unlimited starch press additions, and hypoallergenic washing options.
                    </p>
                  </div>
                  <a href="https://wa.me/15550199" target="_blank" rel="noreferrer" className="mt-6 font-space font-bold text-xs text-brand-blue hover:text-brand-dark-blue flex items-center gap-1">
                    Get VIP Plan &rarr;
                  </a>
                </div>

              </div>
            </div>
          </section>

          {/* 14. ACCORDION FAQ SECTION */}
          <section id="faq" className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Got Questions?
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Everything You Need to Know
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  We like transparency. If you have additional inquiries, check out our chat lines!
                </p>
              </div>

              {/* Accordion Component */}
              <FAQAccordion />

            </div>
          </section>

          {/* 15. BOOKING FORM SECTION */}
          <section id="booking" className="py-16 bg-gradient-to-b from-white to-[#EEF7FC] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              
              <div className="text-center max-w-lg mx-auto mb-10">
                <span className="bg-sky-100 text-brand-blue py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                  Reservation Deck
                </span>
                <h2 className="text-3xl font-display font-black text-slate-800 leading-tight mt-3">
                  Let's Get Your Laundry Done
                </h2>
                <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                  Submit the form below. Once received, our route managers will assign a driver and send a confirmation text message.
                </p>
              </div>

              {/* Form structure */}
              <BookingForm 
                initialBags={selectedCalcSummary.bags} 
                initialTotal={selectedCalcSummary.total} 
              />

            </div>
          </section>

          {/* 16. LOCATION INFORMATION SECTION */}
          <section id="location" className="py-16 bg-white border-t border-sky-100/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left side Location information details */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                    Central Hub
                  </span>
                  <h2 className="text-3xl font-display font-black text-brand-navy leading-tight">
                    Visit Our Modern Laundromat Hub
                  </h2>
                  
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    Prefer self-service or carrying your bundle down to meet our specialists? Come say hello! We offer pristine, clean high-capacity coin washers, fully loaded flat screens on wall panels, free espresso, and high-speed fiber WiFi!
                  </p>

                  <div className="space-y-4 pt-2">
                    
                    {/* Addr */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Central Address</h4>
                        <p className="text-xs text-slate-500 font-sans mt-0.5">821 Lavender Bubbles Dr, Suite C, Seattle WA</p>
                      </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Opening Hours</h4>
                        <p className="text-xs text-slate-500 font-sans mt-0.5">Open Daily: 7:00 AM &ndash; 10:00 PM (Last wash at 9:00 PM)</p>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 text-brand-blue flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-xs text-slate-700">Customer Helpline</h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">+1 (555) 762-7783 / support@soapsandsuds.co</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right side beautifully hand-crafted delivery coverage map vector simulation */}
                <div className="lg:col-span-7">
                  <div className="bg-[#F0F9FF] rounded-3xl border border-sky-100/80 p-6 shadow-md relative min-h-[340px] flex flex-col justify-between overflow-hidden">
                    
                    {/* Floating map vector decorations */}
                    <div className="absolute inset-0 z-0 opacity-80 select-none pointer-events-none">
                      {/* Roads */}
                      <svg className="w-full h-full text-white/50" viewBox="0 0 400 300" stroke="currentColor" strokeWidth="6" fill="none">
                        <path d="M 20,40 L 380,40" />
                        <path d="M 20,150 L 380,150" strokeWidth="8" className="text-sky-200/50" />
                        <path d="M 20,260 L 380,260" />
                        <path d="M 120,20 L 120,280" />
                        <path d="M 280,20 L 280,280" />
                        
                        {/* Circular coverage radius ring */}
                        <circle cx="200" cy="150" r="110" stroke="#0288D1" strokeWidth="1.5" strokeDasharray="6,4" fill="none" className="opacity-40" />
                      </svg>
                    </div>

                    {/* Neighborhood Pinouts label */}
                    <div className="relative z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-sky-100/40 w-fit text-[11px] font-space font-bold tracking-wide text-brand-blue shadow-sm">
                      📍 SAME DAY DELIVERY COVERAGE HIGHWAY AREA
                    </div>

                    {/* Interactive center active pinout */}
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
                      <span className="text-3xl animate-bounce filter drop-shadow-md">🏠</span>
                      <div className="bg-slate-900 text-white rounded px-2.5 py-1 text-[9px] font-space tracking-wide uppercase font-bold mt-1 shadow-lg group-hover:scale-105 transition-transform">
                        Soaps & Suds Hub
                      </div>
                    </div>

                    {/* Mini bouncing service deliveries */}
                    <div className="absolute top-[35%] left-[25%] flex items-center gap-1 bg-white/90 border border-sky-100 py-1 px-2 rounded-full shadow-sm text-[10px] z-10 animate-bounce">
                      <span>🏡</span> <span className="font-semibold text-slate-600">Client Porch</span>
                    </div>

                    <div className="absolute bottom-[25%] right-[22%] flex items-center gap-1 bg-white/90 border border-sky-100 py-1 px-2 rounded-full shadow-sm text-[10px] z-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
                      <span>🏙️</span> <span className="font-semibold text-slate-600">Business Unit</span>
                    </div>

                    {/* Real-time slider delivery pointer */}
                    <div className="relative z-10 flex items-center justify-between w-full pt-44">
                      <div className="bg-emerald-500/90 text-white py-1 px-3 rounded-full text-[10px] font-space font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        Eco SUV Driver Live
                      </div>
                      <span className="text-xs text-slate-400 font-mono">15-Mile Coverage Radius Area</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 17. REASSURING FOOTER */}
          <footer className="bg-brand-navy text-white pt-16 pb-8 relative border-t border-white/5 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5">
                
                {/* Column 1 Logo and newsletter */}
                <div className="lg:col-span-5 space-y-5">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-lg">
                      🧼
                    </div>
                    <div>
                      <span className="font-display font-black text-xl text-white leading-none tracking-tight block">
                        Soaps <span className="text-fresh-aqua">&</span> Suds
                      </span>
                      <span className="text-[10px] text-sky-200 font-semibold tracking-wider block">
                        Making Laundry Day the Best Day.
                      </span>
                    </div>
                  </a>

                  <p className="text-xs text-sky-200/60 font-sans leading-relaxed max-w-sm">
                    Let us save you hours every single week. Book a prompt doorstep pickup or bring your hampers down to our modern Seattle washing lounge. Open 7 days a week.
                  </p>

                  {/* Newsletter Subscription signup */}
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-sm">
                    <label className="text-[10px] font-space font-black uppercase tracking-widest text-[#80DEEA] block">
                      Newsletter Suds Club
                    </label>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Join our washing updates (Email)"
                        className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-400 focus:outline-none px-2.5 py-1.5"
                      />
                      <button
                        type="submit"
                        className="bg-brand-blue hover:bg-brand-dark-blue px-4 py-2 text-xs font-display font-medium rounded-lg text-white transition-colors cursor-pointer"
                      >
                        Join
                      </button>
                    </div>

                    <AnimatePresence>
                      {newsletterSubscribed && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[11px] text-soft-mint font-sans"
                        >
                          ✔ Thanks! Check your inbox for a <strong>20% discount coupon</strong>! 💌
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>

                {/* Column 2: Quick Links */}
                <div className="lg:col-span-3 lg:col-start-7 space-y-4">
                  <h4 className="font-space font-bold text-xs uppercase tracking-wider text-[#80DEEA]">Quick Navigation</h4>
                  <ul className="space-y-2.5 text-xs text-sky-200/70 font-sans">
                    <li><a href="#services" className="hover:text-white transition-colors">Specialty Wash Details</a></li>
                    <li><a href="#timeline" className="hover:text-white transition-colors">4-Step Pickup Process</a></li>
                    <li><a href="#pricing" className="hover:text-white transition-colors">Interactive Cost Calculator</a></li>
                    <li><a href="#showcase" className="hover:text-white transition-colors">Stain Removal slider</a></li>
                    <li><a href="#reviews" className="hover:text-white transition-colors font-semibold text-sunshine-yellow">Customer Endorsements ⭐</a></li>
                  </ul>
                </div>

                {/* Column 3: Contacts */}
                <div className="lg:col-span-3 space-y-4">
                  <h4 className="font-space font-bold text-xs uppercase tracking-wider text-[#80DEEA]">Washing Lounge Details</h4>
                  <p className="text-xs text-sky-200/70 font-sans leading-relaxed">
                    <strong>Seattle Hub:</strong><br/>
                    821 Lavender Bubbles Dr, Suite C<br/>
                    Seattle WA 98101
                  </p>
                  <p className="text-xs text-sky-200/70 font-sans">
                    <strong>Telephone Desk:</strong><br/>
                    +1 (555) 762-7783
                  </p>
                </div>

              </div>

              {/* Lower legal line */}
              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-sky-200/40 font-mono">
                <p>&copy; {new Date().getFullYear()} Soaps & Suds Laundromat Lounge LLC. All rights reserved.</p>

                {/* Social icons */}
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Our Instagram Profile">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Our Facebook Page">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Our Twitter feed">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </footer>

          {/* 18. FLOATING WHATSAPP CALL OUT BUTTON IN MAIN VIEWPORT CORNER */}
          <a
            href="https://wa.me/15550199"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3.5 shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
            title="Chat with us on WhatsApp!"
          >
            {/* Soft pulsing green ring */}
            <span className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-emerald-400 animate-ping opacity-45 pointer-events-none" />
            <MessageCircle className="w-6 h-6 stroke-[2.2] relative z-10" />

            {/* Float text hint */}
            <span className="absolute right-14 bg-slate-900 text-white font-space text-[10px] font-bold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow uppercase tracking-wide">
              Quick Chat ➔
            </span>
          </a>

        </div>
      )}
    </>
  );
}
