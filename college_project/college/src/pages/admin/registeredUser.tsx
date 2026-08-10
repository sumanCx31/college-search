import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Upload, Shield, User, Mail, MapPin, Phone, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import {API_URL} from "../../config/config"; // Import the API_URL constant

export default function RegisterUserPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [adminEmail, setAdminEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch logged-in admin email from /me route on load
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        // console.log("Fetching admin profile with token:", token);
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const userData = res.data.data || res.data;
        // console.log("Admin profile data:", userData);
        if (userData?.email) {
          setAdminEmail(userData.email);
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");

      // Using FormData to support file upload (image) along with text fields
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("role", role);
      if (adminEmail) {
        formData.append("adminEmail", adminEmail);
      }
      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        `${API_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setSuccessMessage("User registered successfully!");
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setRole("teacher");
      setImage(null);
      setImagePreview("");

      setTimeout(() => {
        navigate("/admin/dashboard/members");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to register user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-slate-400 hover:text-blue-400 font-semibold transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Back to Members
      </button>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Register New User</h1>
          <p className="text-slate-400 text-xs mt-1">Create a new system admin or teacher profile account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-2xl">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-2xl">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={28} className="text-slate-500" />
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Profile Image</label>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer border border-slate-700 transition-colors">
                <Upload size={14} />
                Upload Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-blue-400" /> Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail size={14} className="text-blue-400" /> Email Address
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-blue-400" /> Address
              </label>
              <input
                type="text"
                required
                placeholder="Kathmandu, Nepal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-blue-400" /> Phone Number
              </label>
              <input
                type="text"
                required
                placeholder="9800000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock size={14} className="text-blue-400" /> Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock size={14} className="text-blue-400" /> Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Shield size={14} className="text-blue-400" /> Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
              >
                <option value="teacher" className="bg-slate-900 text-white">Teacher</option>
                <option value="admin" className="bg-slate-900 text-white">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              <UserPlus size={18} />
              {submitting ? "Registering User..." : "Register User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}