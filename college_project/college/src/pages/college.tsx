import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Search, Star, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8005/api/v1/college')
      .then(res => { 
        setColleges(res.data.data); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setLoading(false);
      });
  }, []);

  // Extract unique locations for filtering
  const locations = useMemo(() => {
    return ['All', ...Array.from(new Set(colleges.map(c => c.location).filter(Boolean)))];
  }, [colleges]);

  // Filter colleges based on search query and location
  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(search.toLowerCase()) ||
                            college.location?.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = selectedLocation === 'All' || college.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [colleges, search, selectedLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold bg-slate-50">
        Loading Colleges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto pt-6">
        
        {/* Header & Controls */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Explore Verified Colleges
          </motion.h1>
          <p className="mt-4 text-slate-600 text-lg">
            Browse through premier institutions, examine campus facilities, and find your ideal academic destination.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search colleges by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Location Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
                selectedLocation === loc
                  ? "bg-blue-600 text-white shadow-blue-200 shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Colleges Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredColleges.map((college) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={college._id}
                onClick={() => navigate(`/college/${college._id}`)}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group"
              >
                {/* Image Banner */}
                <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                  <img 
                    src={college.image?.secureUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={college.name}
                  />
                  {college.rating && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                      <Star size={14} fill="currentColor" /> {college.rating}
                    </div>
                  )}
                  {college.establishedYear && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                      Est. {college.establishedYear}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {college.name}
                    </h3>
                    
                    <div className="flex items-center text-slate-500 text-sm mt-3">
                      <MapPin size={16} className="mr-1.5 text-blue-500 shrink-0" /> 
                      <span className="truncate">{college.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-blue-600 font-bold group-hover:text-blue-700">
                    <span className="text-sm">View Profile</span> 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-6">
            <Building2 className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700">No colleges found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria or location filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}