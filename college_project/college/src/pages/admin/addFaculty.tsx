import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { 
  Briefcase, 
  ArrowLeft, 
  Upload 
} from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "../../config/config"; // Import the API_URL constant

export default function AdminAddFacultyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      data.append("name", formData.name);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post(`${API_URL}/faculty`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Faculty created successfully!");
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error("Error creating faculty:", err);
      toast.error(err.response?.data?.message || "Failed to create faculty via API.");
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
          <h1 className="text-2xl font-extrabold text-white">Create Faculty</h1>
          <p className="text-slate-400 text-xs mt-0.5">Submit to <code>http://localhost:8005/api/v1/faculty</code></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Briefcase size={16} /> Faculty Information
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Faculty Name *</label>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="e.g. Management, Engineering, Science" 
              value={formData.name} 
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Description *</label>
            <textarea 
              name="description" 
              rows={3} 
              required
              placeholder="Enter comprehensive description about the faculty..." 
              value={formData.description} 
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-300">Faculty Image (Optional)</label>
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
            {loading ? "Creating Faculty..." : "Create Faculty"}
          </button>
        </div>
      </form>
    </div>
  );
}