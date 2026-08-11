import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import axios from "axios";
import { 
  Building2, 
  BookOpen, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Phone 
} from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "../../config/config";

export default function AdminEditCollegePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [coursesList, setCoursesList] = useState<any[]>([]);

  // Form state structured to match the JSON body payload directly
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    university: "",
    description: "",
    collegeType: "",
    establishedYear: "",
    rating: "5.0",
    phone: "",
    email: "",
    website: "",
    facilities: [] as string[],
    activities: [] as string[],
  });

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const [coursesRes, collegeRes] = await Promise.all([
          axios.get(`${API_URL}/course`),
          axios.get(`${API_URL}/college/${id}`)
        ]);

        const coursesData = coursesRes.data.data || coursesRes.data;
        setCoursesList(Array.isArray(coursesData) ? coursesData : []);

        const collegeData = collegeRes.data.data || collegeRes.data;
        if (collegeData) {
          setFormData({
            name: collegeData.name || "",
            location: collegeData.location || "",
            university: collegeData.university || "",
            description: collegeData.description || "",
            collegeType: collegeData.collegeType || "",
            establishedYear: collegeData.establishedYear?.toString() || "",
            rating: collegeData.rating?.toString() || "5.0",
            phone: collegeData.phone || "",
            email: collegeData.email || "",
            website: collegeData.website || "",
            facilities: Array.isArray(collegeData.facilities) ? collegeData.facilities : [],
            activities: Array.isArray(collegeData.activities) ? collegeData.activities : [],
          });

          if (Array.isArray(collegeData.courses)) {
            const mappedCourses = collegeData.courses.map((c: any) => ({
              course: c.course?._id || c.course || "",
              totalFee: c.totalFee || "",
              yearly: c.yearly || "",
              admissionFee: c.admissionFee || ""
            }));
            setSelectedCourses(mappedCourses);
          }
        }
      } catch (err) {
        console.error("Error fetching edit data:", err);
        toast.error("Failed to load college details.");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, field: "facilities" | "activities") => {
    const list = [...formData[field]];
    list[index] = value;
    setFormData((prev) => ({ ...prev, [field]: list }));
  };

  const addArrayItem = (field: "facilities" | "activities") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: "facilities" | "activities") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleCourseRowChange = (index: number, field: string, value: any) => {
    const list = [...selectedCourses];
    list[index][field] = value;
    setSelectedCourses(list);
  };

  const addCourseRow = () => {
    setSelectedCourses([...selectedCourses, { course: "", totalFee: "", yearly: "", admissionFee: "" }]);
  };

  const removeCourseRow = (index: number) => {
    setSelectedCourses(selectedCourses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Build pure JSON payload matching the requested structure
      const payload = {
        name: formData.name,
        location: formData.location,
        university: formData.university,
        description: formData.description,
        collegeType: formData.collegeType,
        establishedYear: formData.establishedYear ? Number(formData.establishedYear) : undefined,
        rating: Number(formData.rating),
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        facilities: formData.facilities.filter(f => f.trim() !== ""),
        activities: formData.activities.filter(a => a.trim() !== ""),
        courses: selectedCourses.map(c => ({
          course: c.course,
          totalFee: Number(c.totalFee) || 0,
          yearly: Number(c.yearly) || 0,
          admissionFee: Number(c.admissionFee) || 0
        }))
      };

      await axios.put(`${API_URL}/college/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("College updated successfully via JSON!");
      navigate("/admin/dashboard/colleges");
    } catch (err: any) {
      console.error("Error updating college:", err);
      toast.error(err.response?.data?.message || "Failed to update college via JSON API.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400 text-sm animate-pulse">Loading college details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Edit College (JSON)</h1>
          <p className="text-slate-400 text-xs mt-0.5">PUT endpoint: <code>{API_URL}/college/{id}</code></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Fields */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Building2 size={16} /> Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="e.g. ABC College" 
                value={formData.name} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">University *</label>
              <input 
                type="text" 
                name="university" 
                required
                placeholder="e.g. Tribhuvan University" 
                value={formData.university} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Location *</label>
              <input 
                type="text" 
                name="location" 
                required
                placeholder="e.g. Kathmandu, Nepal" 
                value={formData.location} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">College Type</label>
              <input 
                type="text" 
                name="collegeType" 
                placeholder="e.g. Bachelor" 
                value={formData.collegeType} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Established Year</label>
              <input 
                type="number" 
                name="establishedYear" 
                placeholder="e.g. 1995" 
                value={formData.establishedYear} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Rating</label>
              <input 
                type="number" 
                name="rating" 
                step="0.1" 
                value={formData.rating} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Description</label>
            <textarea 
              name="description" 
              rows={3} 
              placeholder="Enter comprehensive description..." 
              value={formData.description} 
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Phone size={16} /> Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Phone</label>
              <input type="text" name="phone" placeholder="01-1234567" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Email</label>
              <input type="email" name="email" placeholder="info@abccollege.com" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Website</label>
              <input type="text" name="website" placeholder="https://" value={formData.website} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
          </div>
        </div>

        {/* Courses & Fees */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} /> Courses & Fees
            </h2>
            <button 
              type="button" 
              onClick={addCourseRow}
              className="text-xs font-bold bg-blue-600/20 text-blue-400 px-3 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-600/30"
            >
              <Plus size={14} /> Add Course
            </button>
          </div>

          <div className="space-y-3">
            {selectedCourses.length === 0 ? (
              <p className="text-slate-500 text-xs italic py-4 text-center">
                No courses linked yet. Click "Add Course" to add options.
              </p>
            ) : (
              selectedCourses.map((row, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-slate-900/50 p-3 rounded-2xl border border-slate-700">
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Course ID / Select</label>
                    <select 
                      value={row.course}
                      onChange={(e) => handleCourseRowChange(index, "course", e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="">-- Select Course --</option>
                      {coursesList.map((c: any) => (
                        <option key={c._id || c.id} value={c._id || c.id}>
                          {c.name} ({c._id || c.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Total Fee</label>
                    <input 
                      type="number" 
                      placeholder="850000"
                      value={row.totalFee}
                      onChange={(e) => handleCourseRowChange(index, "totalFee", e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Yearly</label>
                    <input 
                      type="number" 
                      placeholder="106250"
                      value={row.yearly}
                      onChange={(e) => handleCourseRowChange(index, "yearly", e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Admission Fee</label>
                    <input 
                      type="number" 
                      placeholder="15000"
                      value={row.admissionFee}
                      onChange={(e) => handleCourseRowChange(index, "admissionFee", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => removeCourseRow(index)}
                      className="p-2.5 bg-red-500/10 text-red-400 rounded-xl w-full flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Facilities & Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Facilities</h2>
              <button type="button" onClick={() => addArrayItem("facilities")} className="text-xs text-blue-400 font-bold">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.facilities.length === 0 ? (
                <p className="text-slate-500 text-xs italic py-2">No facilities added yet.</p>
              ) : (
                formData.facilities.map((fac, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={fac} onChange={(e) => handleArrayChange(idx, e.target.value, "facilities")} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                    <button type="button" onClick={() => removeArrayItem(idx, "facilities")} className="p-2 bg-red-500/10 text-red-400 rounded-xl"><Trash2 size={13} /></button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Activities</h2>
              <button type="button" onClick={() => addArrayItem("activities")} className="text-xs text-blue-400 font-bold">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.activities.length === 0 ? (
                <p className="text-slate-500 text-xs italic py-2">No activities added yet.</p>
              ) : (
                formData.activities.map((act, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={act} onChange={(e) => handleArrayChange(idx, e.target.value, "activities")} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                    <button type="button" onClick={() => removeArrayItem(idx, "activities")} className="p-2 bg-red-500/10 text-red-400 rounded-xl"><Trash2 size={13} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-600/30">
            {loading ? "Updating JSON..." : "Update College (JSON)"}
          </button>
        </div>
      </form>
    </div>
  );
}