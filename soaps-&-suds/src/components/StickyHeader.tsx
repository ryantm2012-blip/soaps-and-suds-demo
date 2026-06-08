import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md py-3 shadow-md border-b border-sky-100/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-fresh-aqua flex items-center justify-center shadow-md relative overflow-hidden group-hover:rotate-12 transition-transform duration-350">
              <span className="text-xl">🧼</span>
              <span className="absolute top-1 right-1 text-[8px] animate-bounce">✨</span>
            </div>
            <div>
              <span className="font-display font-black text-lg md:text-xl text-brand-navy leading-none tracking-tight block">
                Soaps <span className="text-brand-blue">&</span> Suds
              </span>
              <span className="text-[9px] font-space font-bold uppercase tracking-widest text-[#00ACC1] block -mt-1">
                Laundromat Co.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 bg-sky-50/40 p-1.5 rounded-full border border-sky-100/20">
            {['Services', 'About', 'Pricing', 'Showcase', 'Reviews', 'FAQ', 'Location'].map((item) => {
              const targetId = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${targetId}`}
                  onClick={(e) => handleLinkClick(e, targetId)}
                  className="text-xs font-space font-bold text-slate-600 hover:text-brand-blue px-3 py-1.5 rounded-full hover:bg-white transition-all cursor-pointer"
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Contact */}
            <a
              href="https://wa.me/15550199"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-space font-medium text-xs flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Speak with Us
            </a>

            {/* Book pickup */}
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, 'booking')}
              className="bg-brand-blue hover:bg-brand-dark-blue text-white font-display text-xs font-bold py-2.5 px-5 rounded-full shadow hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              Book Pickup <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, 'booking')}
              className="bg-brand-blue text-white font-display text-[11px] font-bold py-2 px-3.5 rounded-full shadow-md"
            >
              Book Now
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-sky-50 text-slate-700 hover:bg-sky-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-brand-navy/95 backdrop-blur-md pt-24 px-6 flex flex-col justify-between pb-8 animate-fade-in md:hidden">
          <nav className="flex flex-col gap-5">
            {['Services', 'About', 'Pricing', 'Showcase', 'Reviews', 'FAQ', 'Location'].map((item, idx) => {
              const targetId = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${targetId}`}
                  onClick={(e) => handleLinkClick(e, targetId)}
                  className="text-2xl font-display font-bold text-white hover:text-fresh-aqua transition-colors py-2 border-b border-white/5"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* Interactive footer links in mobile drawer */}
          <div className="space-y-4">
            <a
              href="https://wa.me/15550199"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3.5 px-4 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> WhatsApp Quick Chat
            </a>

            <div className="text-center font-mono text-[9px] text-sky-200/50">
              OPEN DIRECTDAILY: 7:00 AM &ndash; 10:00 PM
            </div>
          </div>
        </div>
      )}
    </>
  );
}
