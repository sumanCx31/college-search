import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, BookOpen } from 'lucide-react';

interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  faculty: {
    name: string;
    image: { optimizedUrl: string };
  };
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFaculty, setActiveFaculty] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/v1/course');
        const result = await response.json();
        if (result.success) setCourses(result.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchCourses();
  }, []);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase());
      const matchesFaculty = activeFaculty === "All" || course.faculty.name === activeFaculty;
      return matchesSearch && matchesFaculty;
    });
  }, [search, activeFaculty, courses]);

  const faculties = ["All", ...Array.from(new Set(courses.map(c => c.faculty.name)))];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-extrabold text-slate-900">Available Courses</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
              {faculties.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFaculty(f)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeFaculty === f ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Animated Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={course._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <img src={course.faculty.image.optimizedUrl} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">
                    {course.faculty.name}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-3">{course.name}</h2>
                  <p className="text-slate-500 mt-2 text-sm line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-slate-400 text-xs">
                    <Clock size={14} /> {course.duration} Years Duration
                  </div>
                  <button className="w-full mt-6 bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}