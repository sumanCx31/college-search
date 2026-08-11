import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Star, Phone, Globe, Mail, BookOpen, Trophy, Info, ChevronRight, GraduationCap } from 'lucide-react';
import { API_URL } from '../config/config';

export default function CollegeDetailsPage() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/college/${collegeId}`);
        const data = res.data.data;
        setCollege(data);
        if (data?.courses?.length > 0) {
          const promises = data.courses.map((c: any) => axios.get(`${API_URL}/course/${c.course}`));
          const results = await Promise.all(promises);
          setCourses(results.map(r => r.data.data));
        }
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [collegeId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-blue-600 bg-slate-50">Loading Profile...</div>;

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-700 bg-slate-50">
        <h2 className="text-2xl font-bold mb-4">College not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 py-12 px-6 mt-10">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-600 shadow-sm transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back
        </button>

        {/* Hero Section */}
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 mb-8 items-center md:items-start">
          <img src={college.image?.secureUrl} className="w-full md:w-64 h-64 object-cover rounded-2xl shadow-md" alt={college.name} />
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full text-slate-700 font-medium text-sm"><MapPin size={16} className="text-slate-500" /> {college.location}</span>
              {college.university && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-sm font-bold">
                  <GraduationCap size={16} /> {college.university}
                </span>
              )}
              {college.establishedYear && (
                <span className="bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-sm font-bold">Est. {college.establishedYear}</span>
              )}
              {college.rating && (
                <span className="flex items-center text-amber-500 font-bold bg-amber-50 px-3.5 py-1.5 rounded-full text-sm"><Star size={16} fill="currentColor" className="mr-1" /> {college.rating}.0 / 5.0</span>
              )}
            </div>
            <p className="mt-6 text-slate-600 text-base md:text-lg leading-relaxed">{college.description}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Courses Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2.5 text-slate-900"><BookOpen className="text-blue-600" size={24} /> Programs & Fees</h2>
              <div className="grid gap-4">
                {courses.filter(c => c).map((course) => {
                  const fee = college.courses.find((c: any) => (c.course?._id || c.course) === course._id);
                  return (
                    <motion.div whileHover={{ scale: 1.01 }} key={course._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl text-slate-900">{course.name}</h3>
                      <div className="grid grid-cols-3 gap-2 mt-4 border-t border-slate-100 pt-4 text-center sm:text-left">
                        {[
                          { label: 'Admission Fee', val: fee?.admissionFee },
                          { label: 'Yearly Fee', val: fee?.yearly },
                          { label: 'Total Fee', val: fee?.totalFee }
                        ].map((item, i) => (
                          <div key={i}>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
                            <p className="font-bold text-slate-800 text-sm md:text-base mt-0.5">
                              {item.val !== undefined ? `Rs. ${item.val.toLocaleString()}` : 'N/A'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Professional Facilities Grid */}
            {college.facilities && college.facilities.length > 0 && (
              <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-slate-900">Campus Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {college.facilities.map((f: string) => (
                    <div key={f} className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium text-slate-700 flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" /> 
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold mb-6">Contact Details</h2>
              <div className="space-y-4">
                {college.phone && (
                  <a href={`tel:${college.phone}`} className="flex items-center gap-3 opacity-90 hover:opacity-100 transition"><Phone size={18} className="text-blue-400 shrink-0" /> {college.phone}</a>
                )}
                {college.email && (
                  <a href={`mailto:${college.email}`} className="flex items-center gap-3 opacity-90 hover:opacity-100 transition truncate"><Mail size={18} className="text-blue-400 shrink-0" /> <span className="truncate">{college.email}</span></a>
                )}
                {college.website && (
                  <a href={`https://${college.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-400 font-bold hover:underline"><Globe size={18} className="shrink-0" /> Visit Official Site <ChevronRight size={16} /></a>
                )}
              </div>
            </div>

            {college.activities && college.activities.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900"><Trophy className="text-amber-500" size={22} /> Activities</h2>
                <ul className="space-y-3">
                  {college.activities.map((a: string) => (
                    <li key={a} className="text-slate-600 font-medium flex items-center gap-2.5"><Info size={14} className="text-blue-500 shrink-0"/> {a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}