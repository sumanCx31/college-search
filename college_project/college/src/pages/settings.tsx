import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Image as ImageIcon, Save, KeyRound, Upload, Mail } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "../config/config"; // Import the API_URL constant

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"password" | "banner">("password");
  const [loading, setLoading] = useState(false);
  const [fetchingEmail, setFetchingEmail] = useState(true);

  // Admin Email State fetched from /auth/me
  const [adminEmail, setAdminEmail] = useState("");

  // Password State
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Banner State
  const [bannerUrl, setBannerUrl] = useState("");

  // Fetch Admin Profile / Email on mount
  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Extract email based on standard nested responses (res.data.data.email or res.data.email)
        const email = res.data?.data?.email || res.data?.email || "";
        setAdminEmail(email);
      } catch (err: any) {
        console.error("Error fetching admin profile:", err);
        toast.error("Failed to fetch admin email profile.");
      } finally {
        setFetchingEmail(false);
      }
    };

    fetchAdminEmail();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (!adminEmail) {
      toast.error("Admin email could not be retrieved. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/auth/change-password`,
        {
          email: adminEmail,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      console.error("Error changing password:", err);
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const handleBannerUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/banner`,
        { bannerUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Banner updated successfully!");
    } catch (err: any) {
      console.error("Error updating banner:", err);
      toast.error(err.response?.data?.message || "Failed to update banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Admin Settings</h1>
        <p className="text-slate-400 text-xs mt-1">
          Manage your account security and portal appearance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/80 pb-4">
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "password"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          }`}
        >
          <KeyRound size={15} /> Change Password
        </button>
        <button
          onClick={() => setActiveTab("banner")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "banner"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          }`}
        >
          <ImageIcon size={15} /> Update Banner
        </button>
      </div>

      {/* Tab Content: Password Change */}
      {activeTab === "password" && (
        <form
          onSubmit={handlePasswordChange}
          className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 backdrop-blur-xl space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-700/80 pb-4">
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-2xl">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Security Settings</h2>
              <p className="text-slate-400 text-xs">Update your password to keep your account secure.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Fetched Admin Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Account Email
              </label>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-400">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <input
                  type="email"
                  disabled
                  value={fetchingEmail ? "Fetching email..." : adminEmail}
                  className="w-full bg-transparent outline-none text-sm text-slate-300 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/80">
            <button
              type="submit"
              disabled={loading || fetchingEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={15} /> {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      )}

      {/* Tab Content: Banner Change */}
      {activeTab === "banner" && (
        <form
          onSubmit={handleBannerUpdate}
          className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 backdrop-blur-xl space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-700/80 pb-4">
            <div className="p-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-2xl">
              <ImageIcon size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Portal Banner Management</h2>
              <p className="text-slate-400 text-xs">Change the main homepage promotional banner image.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Banner Image URL
              </label>
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500">
                <Upload size={18} className="text-slate-500 shrink-0" />
                <input
                  type="url"
                  required
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://example.com/banner-image.jpg"
                  className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            {bannerUrl && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Banner Preview:</p>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img
                    src={bannerUrl}
                    alt="Banner Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/80">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={15} /> {loading ? "Saving..." : "Save Banner"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}