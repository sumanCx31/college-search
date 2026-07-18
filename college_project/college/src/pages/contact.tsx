import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Have questions about colleges, admissions, or partnerships? Our team is here to help you navigate your path.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><MapPin size={24} /></div>
                  <span>Kathmandu, Bagmati Province, Nepal</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Mail size={24} /></div>
                  <span>info@collegefindernepal.np</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Phone size={24} /></div>
                  <span>+977 1-4000000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" required />
                  <input type="email" placeholder="Email" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <input type="text" placeholder="Subject" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" required />
                <textarea placeholder="Your message..." rows={5} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}