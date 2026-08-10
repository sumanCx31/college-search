import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Building2,
  Sparkles,
  Layers
} from "lucide-react";
import { API_URL } from "../config/config";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const url = `${API_URL}/course/${courseId}`;
        console.log("Fetching:", url);

        const res = await axios.get(url);
        console.log("API Response:", res.data);

        setCourse(res.data.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-blue-600 bg-slate-50">
        Loading Course Details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-700 bg-slate-50">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const nextImg = () => {
    if (!course.images?.length) return;
    setCurrentImg((prev) => (prev + 1) % course.images.length);
  };

  const prevImg = () => {
    if (!course.images?.length) return;
    setCurrentImg(
      (prev) => (prev - 1 + course.images.length) % course.images.length
    );
  };

  const parsedSubjects: string[] = (course.coreSubjects || []).flatMap((subj: any) => {
    if (typeof subj === "string") {
      try {
        const parsed = JSON.parse(subj);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            if (typeof item === "string") return item;
            if (typeof item === "object" && item !== null) {
              return Object.values(item)[0] as string;
            }
            return "";
          }).filter(Boolean);
        }
      } catch {
        return [subj];
      }
    }
    return [];
  });

  // Check both course.images and course.image for media rendering
  const imagesList = course.images && course.images.length > 0 
    ? course.images 
    : course.image ? [course.image] : [];
  
  const hasImages = imagesList.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-blue-600 font-semibold hover:text-blue-700 transition group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-600 shadow-sm transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back to Courses
        </button>

        <div className={`grid ${hasImages ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'} gap-12 items-start`}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {course.group && (
                <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
                  Group: {course.group}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">
                {course.name}
              </h1>
            </motion.div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-2xl px-5 py-3 flex items-center gap-2 font-bold text-sm shadow-sm">
                <Clock size={18} className="text-blue-600" />
                {course.duration} Years Duration
              </div>

              {course.faculty?.name && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl px-5 py-3 font-bold text-sm shadow-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-600" />
                  {course.faculty.name}
                </div>
              )}
            </div>

            <p className="leading-relaxed text-slate-600 text-base md:text-lg whitespace-pre-line bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              {course.description}
            </p>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2.5 text-slate-900">
                <Layers size={22} className="text-blue-600" />
                Core Subjects
              </h2>

              {parsedSubjects.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {parsedSubjects.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 font-semibold text-slate-700 hover:border-blue-200 hover:shadow transition flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-slate-500 text-sm font-medium">
                  Core curriculum is structured dynamically across semesters.
                </div>
              )}
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2 text-base"
              >
                <Building2 size={20} /> View Colleges Offering This Course
              </button>
            </div>
          </div>

          {hasImages && (
            <div>
              <div className="mb-5">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <BookOpen className="text-blue-600" size={28} />
                  Course Preview / Syllabus
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Preview official resources or syllabus pages for this course.
                </p>
              </div>

              <div className="relative group">
                <div className="rounded-3xl h-[400px] md:h-[550px] lg:h-[700px] w-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-xl p-2">
                  <img
                    src={imagesList[currentImg].secureUrl}
                    alt={`${course.name} ${currentImg + 1}`}
                    className="w-full h-full object-contain transition-all duration-300 rounded-2xl"
                  />
                </div>

                {imagesList.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 shadow-xl rounded-full p-3.5 transition backdrop-blur-md"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={nextImg}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 shadow-xl rounded-full p-3.5 transition backdrop-blur-md"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
                      {currentImg + 1} / {imagesList.length}
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {imagesList.map((_: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImg(i)}
                          className={`transition-all duration-300 rounded-full ${
                            currentImg === i
                              ? "w-8 h-2.5 bg-blue-600"
                              : "w-2.5 h-2.5 bg-white/70 border border-slate-300"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}