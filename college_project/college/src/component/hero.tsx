import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
  Building2,
  BookOpen,
  GraduationCap,
  X,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface College {
  id?: string | number;
  _id?: string;
  slug?: string;
  name: string;
  location?: string;
  address?: string;
  affiliation?: string;
  courses?: string[];
}

const COLLEGE_API_URL = import.meta.env.VITE_APP_API_URL;

const extractCollegeArray = (payload: any): College[] => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidates = [
    payload.data,
    payload.colleges,
    payload.results,
    payload.data?.colleges,
    payload.data?.results,
    payload.data?.data,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchColleges = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!COLLEGE_API_URL) {
          throw new Error('VITE_APP_API_URL is not configured');
        }

        const response = await fetch(COLLEGE_API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch colleges (Status: ${response.status})`);
        }

        const result = await response.json();
        setColleges(extractCollegeArray(result));
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching colleges:', err);
          setError('Could not load colleges from server.');
          setColleges([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchColleges();

    return () => controller.abort();
  }, []);

  const safeColleges = Array.isArray(colleges) ? colleges : [];

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query || safeColleges.length === 0) return [];

    return safeColleges
      .filter((college) => {
        if (!college || typeof college !== 'object') return false;

        const matchName = college.name?.toLowerCase().includes(query);
        const matchLocation = (college.location || college.address)
          ?.toLowerCase()
          .includes(query);
        const matchAffiliation = college.affiliation?.toLowerCase().includes(query);
        const matchCourses = Array.isArray(college.courses)
          ? college.courses.some((course) =>
              typeof course === 'string'
                ? course.toLowerCase().includes(query)
                : (course as any)?.name?.toLowerCase().includes(query)
            )
          : false;

        return Boolean(matchName || matchLocation || matchAffiliation || matchCourses);
      })
      .slice(0, 6);
  }, [searchQuery, safeColleges]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      handleSelectCollege(suggestions[activeIndex]);
      return;
    }

    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/colleges');
    }
  };

  const handleSelectCollege = (college: College) => {
    const identifier = college.slug || college._id || college.id;
    setSearchQuery(college.name);
    setIsDropdownOpen(false);
    navigate(`/college/${identifier}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 to-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
        >
          <Sparkles size={14} className="text-emerald-500" /> Nepal's Education Hub
        </motion.div>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Explore verified campuses, exact program fees, and core syllabus structures to make confident academic choices.
        </motion.p>

        <motion.div
          ref={searchContainerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto mb-12 relative z-30"
        >
          <form
            onSubmit={handleSearch}
            className="bg-white p-2.5 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 flex flex-col md:flex-row items-center gap-2 relative"
          >
            <div className="flex items-center gap-3 px-4 py-3 w-full md:flex-1 bg-slate-50/80 rounded-2xl border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-colors">
              <Search className="text-slate-400 shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search colleges"
                value={searchQuery}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 shrink-0 text-sm cursor-pointer"
            >
              Explore <ArrowRight size={16} />
            </button>
          </form>

          <AnimatePresence>
            {isDropdownOpen && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-slate-300/60 border border-slate-200/80 overflow-hidden text-left z-50"
              >
                {isLoading ? (
                  <div className="p-6 flex items-center justify-center gap-2.5 text-sm text-slate-500">
                    <Loader2 size={18} className="text-blue-600 animate-spin" />
                    <span>Loading colleges...</span>
                  </div>
                ) : error ? (
                  <div className="p-6 text-center text-sm text-red-500 font-medium">
                    {error}
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Matching Colleges ({suggestions.length})
                    </div>
                    <ul role="listbox">
                      {suggestions.map((college, index) => {
                        const isHighlighted = index === activeIndex;
                        const itemKey = college._id || college.id || index;
                        const collegeLocation = college.location || college.address;

                        return (
                          <li key={itemKey} role="option" aria-selected={isHighlighted}>
                            <button
                              type="button"
                              onClick={() => handleSelectCollege(college)}
                              onMouseEnter={() => setActiveIndex(index)}
                              className={`w-full px-4 py-3 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                                isHighlighted ? 'bg-blue-50/90' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div
                                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                                    isHighlighted
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  <GraduationCap size={18} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-slate-900 truncate">
                                    {college.name}
                                  </p>
                                  {(collegeLocation || college.affiliation) && (
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-500">
                                      {collegeLocation && (
                                        <span className="inline-flex items-center gap-1">
                                          <MapPin size={12} className="text-blue-500" />
                                          {collegeLocation}
                                        </span>
                                      )}
                                      {college.affiliation && (
                                        <span className="text-slate-400">
                                          • {college.affiliation}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <ArrowRight
                                size={16}
                                className={`shrink-0 transition-transform ${
                                  isHighlighted
                                    ? 'text-blue-600 translate-x-0.5'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full py-2.5 px-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        See all results for "{searchQuery}" <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      No colleges found matching "{searchQuery}"
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try checking the spelling or searching with a shorter keyword
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-slate-200/60"
        >
          <div className="flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
            <Building2 size={18} className="text-blue-600" />
            <span>
              {safeColleges.length > 0
                ? `${safeColleges.length}+ Verified Colleges`
                : '100+ Verified Colleges'}
            </span>
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