import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, CheckCircle2, RefreshCw, Sparkles, Send } from 'lucide-react';

interface BookingFormProps {
  initialBags?: number;
  initialTotal?: number;
}

export default function BookingForm({ initialBags = 3, initialTotal = 44.97 }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Wash & Fold',
    address: '',
    date: '',
    timeSlot: 'Morning (8:00 AM - 12:00 PM)',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.date) {
      alert("Please check that all requested details are filled in so we can collect your laundry!");
      return;
    }

    setIsLoading(true);

    // Simulate scheduling processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Generate a sweet order bookmark reference
      setBookingRef(`SUD-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceType: 'Wash & Fold',
      address: '',
      date: '',
      timeSlot: 'Morning (8:00 AM - 12:00 PM)',
      notes: ''
    });
    setIsSuccess(false);
  };

  // WhatsApp text preparation
  const getWhatsAppLink = () => {
    const baseUrl = "https://wa.me/15550199";
    const text = encodeURIComponent(
      `Hello Soaps & Suds! 🧼 I'd like to ask about booking a pickup:\n\n` +
      `- Name: ${formData.name || 'Visitor'}\n` +
      `- Service: ${formData.serviceType}\n` +
      `- Date: ${formData.date || 'TBD'}\n` +
      `- Address: ${formData.address || 'TBD'}\n\n` +
      `Can you confirm availability? Thanks! ✨`
    );
    return `${baseUrl}?text=${text}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-sky-50 rounded-3xl p-6 md:p-8 shadow-2xl border border-sky-100 relative overflow-hidden select-none">
      
      {/* Decorative wash element */}
      <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-44 h-44 bg-gradient-to-tr from-fresh-aqua/20 to-sky-blue/30 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Form Intro header */}
            <div className="mb-6 relative">
              <h4 className="text-2xl font-display font-extrabold text-slate-800 leading-tight">
                Schedule Your Contactless Pickup
              </h4>
              <p className="text-xs text-slate-500 font-sans mt-1">
                Tell us where and when, and our driver will collect your laundry right from your porch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sarah Jenkins"
                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm placeholder:text-slate-300 font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm placeholder:text-slate-300 font-sans outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email and Service Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@example.com"
                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm placeholder:text-slate-300 font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm font-sans outline-none transition-all cursor-pointer"
                  >
                    <option value="Wash & Fold">Wash & Fold (Standard Bundle)</option>
                    <option value="Dry Cleaning">Dry Cleaning (Delicate Care)</option>
                    <option value="Ironing Only">Steam Ironing Only</option>
                    <option value="All-Inclusive Package">All-Inclusive (Wash, Fold & Dry Clean)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                  Pickup Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street No, Apartment, Zip Code"
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm placeholder:text-slate-300 font-sans outline-none transition-all"
                />
              </div>

              {/* Row 4: Preferred Date and Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm font-sans outline-none transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                    Preferred Window
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm font-sans outline-none transition-all cursor-pointer"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM &ndash; 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM &ndash; 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM &ndash; 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-[11px] font-space font-bold uppercase tracking-wider text-slate-500 block mb-1.5 ms-1">
                  Special Care Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="E.g., Please hang all white shirts, use unscented detergent if possible..."
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-sky-100 text-sm placeholder:text-slate-300 font-sans outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Book Pickup Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-brand-blue hover:bg-brand-dark-blue text-white py-3.5 px-4 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Scheduling...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Schedule Pickup
                    </>
                  )}
                </button>

                {/* WhatsApp Quick Link */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3.5 px-4 rounded-xl font-display font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" /> Ask on WhatsApp
                </a>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center py-12 flex flex-col items-center justify-center relative"
          >
            {/* Visual celebration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute text-5xl opacity-15 pointer-events-none select-none"
            >
              🫧 ✨ 🫧 ✨ 🫧
            </motion.div>

            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner relative">
              <CheckCircle2 className="w-12 h-12 stroke-[2]" />
              <span className="absolute top-0 right-0 text-lg animate-bounce">✨</span>
            </div>

            <h4 className="text-3xl font-display font-extrabold text-slate-800 leading-tight">
              Yippee! You're Booked.
            </h4>
            
            <p className="text-xs text-brand-blue font-space uppercase font-bold tracking-widest mt-2">
              Reference ID: {bookingRef}
            </p>

            <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100/40 max-w-md my-6 text-left space-y-2">
              <p className="text-xs font-sans text-slate-600">
                <strong className="text-slate-800">Hi {formData.name},</strong> we have successfully arranged our contactless driver to collect your package on:
              </p>
              <div className="flex gap-4 items-center bg-white p-3 rounded-xl border border-sky-100/50">
                <Calendar className="w-10 h-10 text-brand-blue" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{formData.date}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{formData.timeSlot}</p>
                </div>
              </div>
              <p className="text-[11px] font-sans text-slate-500 italic mt-2">
                &ldquo;Please leave your laundry bags on your front porch or doormat labeled 'S&S'. We will text you upon arrival.&rdquo;
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-display text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
            >
              Book Another Load
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
