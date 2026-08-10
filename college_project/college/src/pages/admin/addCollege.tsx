import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import { 
  Building2, 
  MapPin, 
  BookOpen, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Upload, 
  Phone 
} from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "../../config/config"; // Import the API_URL constant

export default function AdminAddCollegePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coursesList, setCoursesList] = useState<any[]>([]);

  // Form state structured with collegeType matching your schema enum & default: []
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    university: "",
    description: "",
    establishedYear: "",
    rating: "5.0",
    collegeType: [] as ("+2" | "Bachelor" | "Master" | "MPhil" | "PhD")[],
    contact: {
      phone: "",
      email: "",
      website: "",
      address: "",
    },
    facilities: [] as string[],
    activities: [] as string[],
  });

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/course`);
        const data = res.data.data || res.data;
        setCoursesList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        toast.error("Failed to load courses from API.");
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleCollegeTypeToggle = (type: "+2" | "Bachelor" | "Master" | "MPhil" | "PhD") => {
    setFormData((prev) => {
      const exists = prev.collegeType.includes(type);
      return {
        ...prev,
        collegeType: exists 
          ? prev.collegeType.filter((t) => t !== type)
          : [...prev.collegeType, type]
      };
    });
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      // Append core fields properly mapping arrays and objects
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "collegeType") {
          // Append each selected type individually so backend/Multer catches them as array items
          (val as string[]).forEach((type) => {
            data.append("collegeType", type);
          });
        } else if (typeof val === "object" && val !== null) {
          data.append(key, JSON.stringify(val));
        } else {
          data.append(key, val as any);
        }
      });

      // Append structured courses array
      data.append("courses", JSON.stringify(selectedCourses));

      // Append image file if uploaded
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:8005/api/v1/college", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("College created successfully!");
      navigate("/admin/dashboard/colleges");
    } catch (err: any) {
      console.error("Error creating college:", err);
      toast.error(err.response?.data?.message || "Failed to create college via API.");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-extrabold text-white">Create College</h1>
          <p className="text-slate-400 text-xs mt-0.5">Submit to <code>http://localhost:8005/api/v1/college</code></p>
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
                placeholder="e.g. Kathmandu Model College" 
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Location *</label>
              <input 
                type="text" 
                name="location" 
                required
                placeholder="e.g. Bagbazar, Kathmandu" 
                value={formData.location} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Established Year</label>
              <input 
                type="number" 
                name="establishedYear" 
                placeholder="e.g. 2000" 
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
              placeholder="Enter comprehensive description about the college..." 
              value={formData.description} 
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* College Type Enum Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">College Type (Enum Options)</label>
            <div className="flex flex-wrap gap-2">
              {(["+2", "Bachelor", "Master", "MPhil", "PhD"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => handleCollegeTypeToggle(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    formData.collegeType.includes(type)
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-300">Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-slate-900 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2">
                <Upload size={15} /> Upload Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Phone size={16} /> Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Phone</label>
              <input type="text" placeholder="+977-..." value={formData.contact.phone} onChange={(e) => handleContactChange("phone", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Email</label>
              <input type="email" placeholder="info@college.edu.np" value={formData.contact.email} onChange={(e) => handleContactChange("email", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Website</label>
              <input type="text" placeholder="https://" value={formData.contact.website} onChange={(e) => handleContactChange("website", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Address</label>
              <input type="text" placeholder="Street, City" value={formData.contact.address} onChange={(e) => handleContactChange("address", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
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
                No courses added yet. Click "Add Course" to link academic programs.
              </p>
            ) : (
              selectedCourses.map((row, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-slate-900/50 p-3 rounded-2xl border border-slate-700">
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Course (from API)</label>
                    <select 
                      value={row.course}
                      onChange={(e) => handleCourseRowChange(index, "course", e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="">-- Select Course ID --</option>
                      {coursesList.map((c: any) => (
                        <option key={c._id || c.id} value={c._id || c.id}>
                          {c.name} {c._id ? `(${c._id})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Total Fee</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
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
                      placeholder="0.00"
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
                      placeholder="0.00"
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
                    <input type="text" placeholder="e.g. Science Lab" value={fac} onChange={(e) => handleArrayChange(idx, e.target.value, "facilities")} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
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
                    <input type="text" placeholder="e.g. Annual Sports" value={act} onChange={(e) => handleArrayChange(idx, e.target.value, "activities")} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
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
            {loading ? "Creating College..." : "Create College"}
          </button>
        </div>
      </form>
    </div>
  );
}