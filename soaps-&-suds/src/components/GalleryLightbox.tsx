import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
  svgIcon: string; // Type of icon to render
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "laundry",
    title: "Fresh Folded Laundry",
    category: "Service Work",
    description: "Perfectly sorted, folded, and packaged ready-to-wear garments directly returned to you.",
    color: "from-sky-blue/20 to-sky-400/40",
    svgIcon: "folded"
  },
  {
    id: "washers",
    title: "Premium Clean Washers",
    category: "Our Facilities",
    description: "Our state-of-the-art Italian high-efficiency front-loading washing machines preserve fabrics better.",
    color: "from-fresh-aqua/20 to-teal-300/40",
    svgIcon: "washer"
  },
  {
    id: "customers",
    title: "Happy Confident Customers",
    category: "Suds Family",
    description: "Our favorite moments are when families open up pristine, aromatic bundles with smiles.",
    color: "from-sunshine-yellow/20 to-amber-300/40",
    svgIcon: "smile"
  },
  {
    id: "van",
    title: "Eco Express Delivery Van",
    category: "Pickup & Delivery",
    description: "Our friendly delivery vehicles navigate city streets to collect & drop off right at your porch.",
    color: "from-soft-mint/30 to-green-300/30",
    svgIcon: "van"
  },
  {
    id: "team",
    title: "Pristine Team Members",
    category: "Expert Crew",
    description: "Highly trained clothing care professionals who audit every stain and delicate fiber personally.",
    color: "from-purple-100 to-purple-300/35",
    svgIcon: "team"
  },
  {
    id: "iron",
    title: "Crisp Ironing Station",
    category: "Finishing Touches",
    description: "Steam-glide professional table irons that bring clothes back to crisp boutique showroom condition.",
    color: "from-pink-100 to-pink-300/35",
    svgIcon: "iron"
  }
];

export default function GalleryLightbox() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % GALLERY_ITEMS.length);
  };

  const navigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  // Render highly styled CSS vector illustrations for each item
  const renderItemIllustration = (iconType: string, isBig: boolean = false) => {
    const sizeClasses = isBig ? "w-48 h-48 md:w-64 md:h-64" : "w-32 h-32";
    
    switch (iconType) {
      case "folded":
        return (
          <div className={`${sizeClasses} flex flex-col justify-end relative pb-2`}>
            {/* Stacks of beautiful folded towels */}
            <div className="w-11/12 h-6 bg-sky-blue rounded-lg border-2 border-white/60 mx-auto transform -rotate-1 relative shadow">
              <div className="absolute top-1 left-2 text-[8px] text-white opacity-80 uppercase tracking-widest font-mono">SOAPS</div>
            </div>
            <div className="w-full h-8 bg-fresh-aqua rounded-lg border-2 border-white/60 mx-auto -mt-2 transform rotate-1 relative shadow">
              <div className="absolute top-1 right-2 text-[8px] text-white opacity-80 uppercase tracking-widest font-mono">SUDS</div>
            </div>
            <div className="w-[105%] h-9 bg-sunshine-yellow rounded-lg border-2 border-white/60 -mt-2 relative shadow flex items-center justify-center">
              <span className="text-xl">👕</span>
            </div>
            {/* Sparkles */}
            <span className="absolute top-4 right-1 text-xl animate-pulse">✨</span>
            <span className="absolute top-10 left-0 text-lg">✨</span>
          </div>
        );
      case "washer":
        return (
          <div className={`${sizeClasses} flex items-center justify-center relative`}>
            <div className="w-10/12 h-10/12 bg-white rounded-xl border-4 border-sky-200 relative flex flex-col justify-end pb-3 overflow-hidden shadow-md">
              {/* Controls */}
              <div className="absolute top-2 left-2 right-2 flex justify-between">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sunshine-yellow" />
                </div>
                <div className="w-4 h-2 bg-zinc-200 rounded" />
              </div>
              {/* Glass Drum */}
              <div className="w-20 h-20 rounded-full border-4 border-fresh-aqua/50 bg-sky-50 mx-auto flex items-center justify-center relative shadow-inner overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-blue/30 to-fresh-aqua/20 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="absolute text-lg">🌀</span>
              </div>
            </div>
            <span className="absolute -top-1 right-3 text-lg">🧼</span>
          </div>
        );
      case "smile":
        return (
          <div className={`${sizeClasses} flex items-center justify-center relative`}>
            <div className="w-28 h-28 rounded-full bg-sunshine-yellow flex items-center justify-center relative shadow">
              {/* Cute smiling bubble face */}
              <div className="flex flex-col items-center">
                <div className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />
                </div>
                <div className="w-8 h-4 border-b-4 border-brand-navy rounded-b-full mt-2" />
              </div>
              {/* Crown of little bubbles */}
              <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-white/80 border border-sky-100 flex items-center justify-center text-xs">🧼</div>
              <div className="absolute -bottom-1 -left-2 w-8 h-8 rounded-full bg-white/90 border border-sky-100 flex items-center justify-center text-sm">✨</div>
            </div>
          </div>
        );
      case "van":
        return (
          <div className={`${sizeClasses} flex flex-col justify-center items-center relative`}>
            {/* Cute retro van shape */}
            <div className="w-32 h-16 bg-soft-mint rounded-tl-3xl rounded-tr-xl rounded-br-lg rounded-bl-lg relative border-2 border-white shadow-md flex justify-end items-center pr-3">
              {/* Windows */}
              <div className="absolute top-1 left-2 w-8 h-6 bg-sky-100 rounded-tl-xl border-r border-white/40" />
              <div className="absolute top-1 left-11 w-8 h-6 bg-sky-100 border-r border-white/40" />
              {/* Logo text */}
              <div className="font-display font-black text-[9px] text-emerald-800 tracking-tight leading-none text-right">
                SOAPS<br/><span className="text-emerald-600">& SUDS</span>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-2 left-4 w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              </div>
              <div className="absolute -bottom-2 right-4 w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              </div>
            </div>
            {/* Drift trail */}
            <div className="flex gap-1 mt-4 ml-[-20%]">
              <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        );
      case "team":
        return (
          <div className={`${sizeClasses} flex flex-col items-center justify-center relative`}>
            <div className="w-24 h-24 rounded-full bg-purple-200 border-2 border-white overflow-hidden relative flex items-center justify-center shadow">
              {/* Cute avatar wearing "Soaps & Suds" custom uniform */}
              <div className="text-4xl z-10">👩‍🔬</div>
              <div className="absolute bottom-0 w-full h-8 bg-sky-blue border-t border-white/50 flex justify-center pt-1">
                <span className="text-[6px] font-black tracking-widest text-brand-dark-blue">S&S CREW</span>
              </div>
            </div>
            {/* Sparkles */}
            <div className="absolute top-2 right-6 text-xl">✨</div>
          </div>
        );
      case "iron":
        return (
          <div className={`${sizeClasses} flex flex-col items-center justify-center relative`}>
            <div className="w-28 h-20 bg-white rounded-lg border-2 border-pink-200 flex items-center justify-center relative shadow-sm">
              {/* Iron device SVG style */}
              <span className="text-4xl filter drop-shadow">🔌</span>
              <span className="text-4xl ml-2 filter drop-shadow">💨</span>
              {/* Press line */}
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-pink-100 rounded" />
            </div>
            {/* Mini hanger */}
            <span className="absolute -top-3 text-2xl animate-bounce">👔</span>
          </div>
        );
      default:
        return <div className={`${sizeClasses} bg-gray-100 rounded-lg`} />;
    }
  };

  return (
    <div className="w-full">
      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white rounded-3xl p-5 border border-sky-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center select-none"
            onClick={() => openLightbox(index)}
          >
            {/* Colored illustration box */}
            <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
              {renderItemIllustration(item.svgIcon)}
              
              {/* Hover Overlay Icon */}
              <div className="absolute inset-0 bg-brand-blue/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-brand-blue" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <span className="text-xs uppercase font-space font-bold tracking-widest text-brand-blue">
              {item.category}
            </span>
            <h5 className="font-display font-bold text-lg text-slate-800 mt-1">
              {item.title}
            </h5>
            <p className="text-xs text-slate-500 font-sans mt-2 px-2 line-clamp-2">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-navy/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={closeLightbox}
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl border border-white/25 flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Huge Illustration Visual */}
              <div className={`md:w-1/2 bg-gradient-to-br ${GALLERY_ITEMS[selectedItemIndex].color} p-8 flex items-center justify-center min-h-[300px] relative`}>
                {renderItemIllustration(GALLERY_ITEMS[selectedItemIndex].svgIcon, true)}

                {/* Left/Right Slides for Lightbox */}
                <button
                  onClick={navigatePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 text-brand-navy hover:bg-brand-blue hover:text-white p-2.5 rounded-full shadow-lg transition-all"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-5 h-5 pointer-events-none" />
                </button>
                <button
                  onClick={navigateNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 text-brand-navy hover:bg-brand-blue hover:text-white p-2.5 rounded-full shadow-lg transition-all"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* Right Column: Information Body */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between bg-white relative">
                {/* Close Button Top-right */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="pt-2">
                  <span className="bg-sky-100 text-brand-blue px-3 py-1 rounded-full text-xs font-space font-bold tracking-wider uppercase">
                    {GALLERY_ITEMS[selectedItemIndex].category}
                  </span>
                  <h4 className="font-display font-bold text-2xl lg:text-3xl text-slate-800 mt-4 leading-tight">
                    {GALLERY_ITEMS[selectedItemIndex].title}
                  </h4>
                  <p className="text-slate-600 font-sans mt-4 text-sm leading-relaxed">
                    {GALLERY_ITEMS[selectedItemIndex].description}
                  </p>

                  {/* Trust checkmarks */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2.5 text-xs text-slate-500">
                      <div className="bg-emerald-100 p-1 rounded-full text-emerald-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      100% hypoallergenic organic washing soaps
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-500">
                      <div className="bg-emerald-100 p-1 rounded-full text-emerald-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      Triple rinsed in temperature-regulated water
                    </div>
                  </div>
                </div>

                {/* Footer and Interactive Quote */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Slide {selectedItemIndex + 1} of {GALLERY_ITEMS.length}
                  </span>
                  <a
                    href="#booking"
                    onClick={closeLightbox}
                    className="bg-brand-blue hover:bg-brand-dark-blue text-white font-display text-xs font-bold py-2.5 px-4 rounded-xl shadow transition-colors flex items-center gap-1.5"
                  >
                    Select Service &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
