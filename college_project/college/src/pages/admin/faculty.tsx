import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Layers 
} from "lucide-react";
import { toast } from "sonner";

export default function AdminFacultiesPage() {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all faculties on load
  const fetchFaculties = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/v1/faculty");
      const data = res.data.data || res.data;
      setFaculties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching faculties:", err);
      toast.error("Failed to load faculties from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    
    try {
      await axios.delete(`http://localhost:8005/api/v1/faculty/${id}`);
      toast.success("Faculty deleted successfully!");
      setFaculties(faculties.filter((faculty) => (faculty._id || faculty.id) !== id));
    } catch (err: any) {
      console.error("Error deleting faculty:", err);
      toast.error(err.response?.data?.message || "Failed to delete faculty.");
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
            <h1 className="text-2xl font-extrabold text-white">Manage Faculties</h1>
            <p className="text-slate-400 text-xs mt-0.5">API Endpoint: <code>http://localhost:8005/api/v1/faculty</code></p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/admin/dashboard/faculties/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus size={16} /> Add Faculty
        </button>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl">
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-8">Loading faculties...</p>
        ) : faculties.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Briefcase className="mx-auto text-slate-600" size={32} />
            <p className="text-slate-400 text-xs">No faculties found. Click "Add Faculty" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Faculty Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Created At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
                {faculties.map((faculty) => {
                  const facultyId = faculty._id || faculty.id;
                  return (
                    <tr key={facultyId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        {faculty.image?.secureUrl ? (
                          <img src={faculty.image.secureUrl} alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                            <Layers size={14} />
                          </div>
                        )}
                        <div>
                          <p>{faculty.name}</p>
                          <span className="text-[10px] text-slate-500 font-normal">ID: {facultyId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate text-slate-400">
                        {faculty.description || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        {faculty.createdAt ? new Date(faculty.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleDelete(facultyId)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors inline-flex items-center justify-center"
                          title="Delete Faculty"
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