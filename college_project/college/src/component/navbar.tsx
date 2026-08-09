import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const navItems = ['Home', 'Colleges', 'Course', 'About', 'Contact'];
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for shadow and blur enhancement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100 py-3.5" 
            : "bg-white/70 backdrop-blur-md border-b border-slate-200/60 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-1.5 group">
            <motion.span 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="bg-blue-600 text-white px-2.5 py-1 rounded-xl shadow-md shadow-blue-500/20"
            >
              A
            </motion.span>
            <span>cademiaNP</span>
          </a>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navItems.map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = window.location.pathname === path;
              
              return (
                <a 
                  key={item} 
                  href={path}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? "text-blue-600 bg-white shadow-sm border border-slate-200/50 font-bold" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Side spacer or indicator */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">Verified Hub</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-white/95 backdrop-blur-2xl border-b border-slate-200 p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                const isActive = window.location.pathname === path;

                return (
                  <a
                    key={item}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={`px-5 py-3.5 rounded-2xl font-bold text-base transition-all flex items-center justify-between ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};