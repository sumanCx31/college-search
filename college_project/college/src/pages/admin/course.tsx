import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Edit3, 
  Layers
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses on load
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/v1/course");
      const data = res.data.data || res.data;
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      toast.error("Failed to load courses from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await axios.delete(`http://localhost:8005/api/v1/course/${id}`);
      toast.success("Course deleted successfully!");
      setCourses(courses.filter((course) => (course._id || course.id) !== id));
    } catch (err: any) {
      console.error("Error deleting course:", err);
      toast.error(err.response?.data?.message || "Failed to delete course.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manage Courses</h1>
            <p className="text-slate-400 text-xs mt-0.5">API Endpoint: <code>http://localhost:8005/api/v1/course</code></p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/admin/dashboard/courses/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus size={16} /> Add Course
        </button>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl">
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-8">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <BookOpen className="mx-auto text-slate-600" size={32} />
            <p className="text-slate-400 text-xs">No courses found. Click "Add Course" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Course Name</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Group</th>
                  <th className="py-3 px-4">Core Subjects</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
                {courses.map((course) => {
                  const courseId = course._id || course.id;
                  return (
                    <tr key={courseId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        {course.image?.secureUrl ? (
                          <img src={course.image.secureUrl} alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                            <Layers size={14} />
                          </div>
                        )}
                        <div>
                          <p>{course.name}</p>
                          <span className="text-[10px] text-slate-500 font-normal">ID: {courseId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{course.duration || "N/A"}</td>
                      <td className="py-4 px-4">{course.group || "General"}</td>
                      <td className="py-4 px-4">
                        <span className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-blue-400">
                          {Array.isArray(course.coreSubjects) ? `${course.coreSubjects.length} Subjects` : "0 Subjects"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleDelete(courseId)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors inline-flex items-center justify-center"
                          title="Delete Course"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}