import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { API_URL } from "../../config/config"; // Import the API_URL constant

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Extract tokens from the nested data response
      if (res.data?.data?.accessToken) {
        localStorage.setItem("adminToken", res.data.data.accessToken);
        if (res.data.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
        }
        
        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Login successful, but no token received.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 relative overflow-hidden font-sans">
      
      {/* Background Glow Design Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to manage colleges, courses, and data
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs font-semibold text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 rounded-2xl border border-slate-700 focus-within:border-blue-500 transition-colors">
              <Mail size={18} className="text-slate-500 shrink-0" />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-slate-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 rounded-2xl border border-slate-700 focus-within:border-blue-500 transition-colors">
              <Lock size={18} className="text-slate-500 shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-white text-sm placeholder:text-slate-600 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Support text */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 text-center">
          <p className="text-xs text-slate-500">
            Protected system. Unauthorized access is strictly monitored.
          </p>
        </div>
      </motion.div>
    </div>
  );
}