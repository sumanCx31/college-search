import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Search, BookOpen, Layers, Building, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  group?: string;
  coreSubjects?: string[];
  faculty: {
    _id: string;
    name: string;
    description?: string;
    image?: { optimizedUrl?: string; secureUrl?: string };
  };
  images?: { optimizedUrl?: string; secureUrl?: string }[];
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFaculty, setActiveFaculty] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/course`);
        const result = await response.json();
        if (result.success) setCourses(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());
      const matchesFaculty =
        activeFaculty === "All" || course.faculty?.name === activeFaculty;
      return matchesSearch && matchesFaculty;
    });
  }, [search, activeFaculty, courses]);

  const faculties = [
    "All",
    ...Array.from(new Set(courses.map((c) => c.faculty?.name).filter(Boolean))),
  ];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold bg-slate-50">
        Loading Courses...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 border border-blue-100"
          >
            <Sparkles size={14} /> Career Paths & Programs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Explore Academic Programs
          </motion.h1>
          <p className="mt-4 text-slate-600 text-lg">
            Discover career-focused courses, explore core curriculum, and see which colleges offer them.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search programs by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Faculty Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {faculties.map((faculty) => (
            <button
              key={faculty}
              onClick={() => setActiveFaculty(faculty)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
                activeFaculty === faculty
                  ? "bg-blue-600 text-white shadow-blue-200 shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {faculty}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCourses.map((course) => {
              // Parse coreSubjects safely if stored as JSON strings
              const parsedSubjects: string[] = (course.coreSubjects || []).flatMap((subj: any) => {
                if (typeof subj === "string") {
                  try {
                    const parsed = JSON.parse(subj);
                    if (Array.isArray(parsed)) {
                      return parsed.map((item) => (typeof item === "string" ? item : Object.values(item)[0] as string));
                    }
                  } catch {
                    return [subj];
                  }
                }
                return [];
              });

              const courseImage = course.images?.[0]?.optimizedUrl || course.images?.[0]?.secureUrl || course.faculty?.image?.optimizedUrl || course.faculty?.image?.secureUrl;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={course._id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Image Banner */}
                  {courseImage ? (
                    <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                      <img
                        src={courseImage}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                        {course.faculty?.name}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 pb-0 flex justify-between items-center">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {course.faculty?.name}
                      </span>
                      {course.group && (
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                          {course.group}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </h3>
                        {course.group && courseImage && (
                          <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase">
                            {course.group}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                        {course.description}
                      </p>

                      {/* Core Subjects Tags if available */}
                      {parsedSubjects.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Layers size={14} /> Core Subjects
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {parsedSubjects.slice(0, 4).map((subj, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-50 text-slate-700 border border-slate-100 px-2.5 py-1 rounded-lg text-xs font-medium"
                              >
                                {subj}
                              </span>
                            ))}
                            {parsedSubjects.length > 4 && (
                              <span className="bg-slate-50 text-slate-400 px-2 py-1 rounded-lg text-xs font-medium">
                                +{parsedSubjects.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Duration & Detail Button row */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-sm mb-3">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock size={16} className="text-blue-600" />
                          <span>{course.duration} Years Duration</span>
                        </div>
                        <button
                          onClick={() => navigate(`/course/get-detail/${course._id}`)}
                          className="text-slate-600 font-semibold hover:text-blue-600 transition-colors flex items-center gap-1 text-xs"
                        >
                          View Details &rarr;
                        </button>
                      </div>

                      {/* Primary Call to Action: View Colleges Offering Course */}
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                      >
                        <Building size={16} /> Colleges Offering This Course <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-6">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700">No courses found</h3>
            <p className="text-slate-500 text-sm mt-1">Try tweaking your search term or faculty filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}