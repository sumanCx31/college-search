import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, GraduationCap, ArrowRight, Sparkles, Building2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/colleges');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 pt-32 pb-20 px-6 overflow-hidden">
      
      {/* Creative Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 to-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
        >
          <Sparkles size={14} className="text-emerald-500" /> Nepal's #1 Verified Education Hub
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Discover Your Ideal <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
            College & Course
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Explore verified campuses, exact program fees, and core syllabus structures to make confident academic choices.
        </motion.p>

        {/* Search & Filter Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto mb-12"
        >
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2.5 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 flex flex-col md:flex-row items-center gap-2"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 w-full md:flex-1 bg-slate-50/80 rounded-2xl border border-slate-100">
              <Search className="text-slate-400 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Search colleges" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium" 
              />
            </div>

            {/* Faculty Select Dropdown */}
            {/* <div className="flex items-center gap-3 px-4 py-3 w-full md:w-52 bg-slate-50/80 rounded-2xl border border-slate-100">
              <GraduationCap className="text-slate-400 shrink-0" size={20} />
              <select 
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-700 text-sm font-semibold cursor-pointer"
              >
                <option value="All">All Faculties</option>
                <option value="IT">Information Tech</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">+2 Science</option>
                <option value="Law">+2 Law</option>
              </select>
            </div> */}

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 shrink-0 text-sm"
            >
              Explore <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>

        {/* Quick Trust Badges / Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-slate-200/60"
        >
          <div className="flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
            <Building2 size={18} className="text-blue-600" />
            <span>100+ Verified Colleges</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
            <BookOpen size={18} className="text-emerald-500" />
            <span>Structured Programs</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
            <MapPin size={18} className="text-blue-600" />
            <span>Kathmandu & Beyond</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};