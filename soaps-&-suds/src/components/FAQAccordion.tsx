import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQEntry {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQEntry[] = [
  {
    question: "How long does laundry take?",
    answer: "Our standard turnaround time is just 24 hours! We collect your garments, wash, fold or dry-clean them, and return them securely to your home exactly one day later. Quick, reliable, and hassle-free."
  },
  {
    question: "Do you offer same-day service?",
    answer: "Yes, we do! For express urgent needs, schedule your collection or drop-off before 9:00 AM, and we will deliver your laundry back—perfectly fresh and warm—on the very same evening before 8:00 PM for a small express fee."
  },
  {
    question: "What areas do you serve?",
    answer: "We proudly pick up and deliver laundry within a 15-mile radius of our main central hub, covering all major surrounding residential neighborhoods and business blocks. Use our location postal checker in the footer or checkout to see if your street is covered!"
  },
  {
    question: "How does pickup work?",
    answer: "It is as simple as clicking 'Book Pickup'! Select your preferred time, leave your dirty laundry on your porch or outside your door in any bag, and our friendly driver will swipe it. We'll send you text updates when we collect it and when we are delivering it back!"
  },
  {
    question: "Can you clean delicate items?",
    answer: "Absolutely. We treat premium silks, wool suits, active wear, and lace dresses with maximum consideration. Simply select our organic Dry Cleaning option, or leave specific care notes in your schedule form. We wash at gentle temperatures with mild baby-safe detergents."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-brand-blue shadow-lg shadow-sky-500/5'
                : 'border-slate-100 hover:border-sky-200'
            }`}
          >
            {/* Header Trigger */}
            <button
              onClick={() => toggleAccordion(idx)}
              className="w-full pointer-events-auto cursor-pointer p-4 md:p-5 flex items-center justify-between text-left gap-4 select-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-brand-blue' : 'text-slate-400'}`} />
                <span className="font-display font-bold text-sm md:text-base text-slate-800 leading-snug">
                  {item.question}
                </span>
              </div>

              {/* Collapsible status icon */}
              <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-sky-50 text-brand-blue' : 'text-slate-400 bg-slate-50'}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Answer body with Framer Motion transitions */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-50">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
