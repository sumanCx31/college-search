import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { 
  BookOpen, 
  ArrowLeft, 
  Upload, 
  CheckSquare,
  Plus,
  X
} from "lucide-react";
import { toast } from "sonner";
import {API_URL } from "../../config/config"; // Import the API_URL constant

export default function AdminAddCoursePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [facultyList, setFacultyList] = useState<any[]>([]);

  // Form state structured to match your course schema fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    faculty: "",
    duration: "",
    group: "",
    coreSubjects: [] as string[],
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch faculty list for dropdown selection
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(`${API_URL}/faculty`);
        const data = res.data.data || res.data;
        setFacultyList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching faculties:", err);
        toast.error("Failed to load faculty options from API.");
      }
    };
    fetchFaculties();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = (e: any) => {
    e.preventDefault();
    const trimmed = subjectInput.trim();
    if (!trimmed) return;

    if (formData.coreSubjects.includes(trimmed)) {
      toast.error("Subject already added.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      coreSubjects: [...prev.coreSubjects, trimmed]
    }));
    setSubjectInput("");
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      coreSubjects: prev.coreSubjects.filter((s) => s !== subjectToRemove)
    }));
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

      Object.entries(formData).forEach(([key, val]) => {
        if (key === "coreSubjects") {
          (val as string[]).forEach((subject) => {
            data.append("coreSubjects", subject);
          });
        } else {
          data.append(key, val as any);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:8005/api/v1/course", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Course created successfully!");
      navigate("/admin/dashboard/courses");
    } catch (err: any) {
      console.error("Error creating course:", err);
      toast.error(err.response?.data?.message || "Failed to create course via API.");
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
          <h1 className="text-2xl font-extrabold text-white">Create Course</h1>
          <p className="text-slate-400 text-xs mt-0.5">Submit to <code>http://localhost:8005/api/v1/course</code></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} /> Course Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Course Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="e.g. Bachelor of Science in CSIT" 
                value={formData.name} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Faculty *</label>
              <select 
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="">-- Select Faculty --</option>
                {facultyList.map((fac: any) => (
                  <option key={fac._id} value={fac._id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Duration *</label>
              <input 
                type="text" 
                name="duration" 
                required
                placeholder="e.g. 4 Years / 2 Years" 
                value={formData.duration} 
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Group</label>
              <input 
                type="text" 
                name="group" 
                placeholder="e.g. Physical / Biological / General" 
                value={formData.group} 
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
              placeholder="Enter comprehensive description about the course..." 
              value={formData.description} 
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-300">Course Image</label>
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

        {/* Core Subjects Manual Input */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare size={16} /> Core Subjects
          </h2>
          <p className="text-slate-400 text-xs">Type a subject name and click "Add" to include it in the course:</p>
          
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="e.g. Advanced Mathematics"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all"
            >
              <Plus size={16} /> Add Subject
            </button>
          </div>

          {/* Display Added Subjects Tags */}
          {formData.coreSubjects.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.coreSubjects.map((subject) => (
                <span
                  key={subject}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(subject)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}