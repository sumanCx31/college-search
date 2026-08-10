import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Building2, 
  BookOpen, 
  Users, 
  Mail, 
  ArrowUpRight, 
  Clock, 
  MessageSquare
} from "lucide-react";
import { API_URL } from "../../config/config"; // Import the API_URL constant

export default function AdminDashboardHome() {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalCourses: 0,
    totalFaculties: 0,
    totalMessages: 0,
  });
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Admin profile to get username/name from /auth/me response structure
        try {
          const profileRes = await axios.get(`${API_URL}/auth/me`, { headers });
          const profileData = profileRes.data?.data || profileRes.data;
          const name = profileData?.name || profileData?.username || profileData?.email?.split('@')[0] || "Admin";
          setAdminName(name);
        } catch (err) {
          console.error("Error fetching admin profile:", err);
        }

        // Fetch Stats
        const statsRes = await axios.get(`${API_URL}/dashboard/stats`, { headers });
        const statsData = statsRes.data?.data || statsRes.data;
        setStats({
          totalColleges: statsData.totalColleges || 0,
          totalCourses: statsData.totalCourses || 0,
          totalFaculties: statsData.totalFaculties || 0,
          totalMessages: statsData.totalMessages || 0,
        });

        // Fetch Messages
        const messagesRes = await axios.get(`${API_URL}/message`, { headers });
        const allMessages = messagesRes.data?.data || messagesRes.data || [];
        // Take the 3 recent messages
        setMessages(allMessages.slice(0, 3));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {adminName}! 👋</h1>
          <p className="text-blue-100 text-sm mt-2 max-w-xl">
            Here's a quick overview of your platform statistics, registered institutions, and recent messages today.
          </p>
        </div>
      </div>

      {/* Stats Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Colleges" 
          value={loading ? "..." : stats.totalColleges.toString()} 
          change="Verified" 
          icon={<Building2 size={22} className="text-blue-400" />} 
          bg="bg-blue-500/10" 
          border="border-blue-500/20"
        />
        <StatCard 
          title="Active Courses" 
          value={loading ? "..." : stats.totalCourses.toString()} 
          change="Available" 
          icon={<BookOpen size={22} className="text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Faculty" 
          value={loading ? "..." : stats.totalFaculties.toString()} 
          change="Registered" 
          icon={<Users size={22} className="text-amber-400" />} 
          bg="bg-amber-500/10" 
          border="border-amber-500/20"
        />
        <StatCard 
          title="Total Messages" 
          value={loading ? "..." : stats.totalMessages.toString()} 
          change="Inquiries" 
          icon={<MessageSquare size={22} className="text-purple-400" />} 
          bg="bg-purple-500/10" 
          border="border-purple-500/20"
        />
      </div>

      {/* Recent Messages Section */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock size={18} className="text-blue-400" /> Recent Messages
          </h2>
          <span className="text-xs font-semibold text-slate-400">Latest inquiries</span>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-xs text-slate-400 py-4 text-center">Loading recent messages...</p>
          ) : messages.length > 0 ? (
            messages.map((msg: any) => (
              <ActivityItem 
                key={msg._id || msg.id}
                title={msg.name || msg.subject || "User Inquiries"} 
                desc={msg.message || msg.content || "No message content provided."} 
                time={msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "Recent"} 
                icon={<Mail size={16} className="text-blue-400" />} 
              />
            ))
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">No recent messages found.</p>
          )}
        </div>
      </div>

    </div>
  );
}

// Subcomponents for cleaner modular code
function StatCard({ title, value, change, icon, bg, border }: { title: string, value: string, change: string, icon: any, bg: string, border: string }) {
  return (
    <div className={`bg-slate-800/60 border ${border} rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shadow-inner`}>
          {icon}
        </div>
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <ArrowUpRight size={12} /> {change}
        </span>
      </div>
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <h3 className="text-3xl font-extrabold text-white mt-1">{value}</h3>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, icon }: { title: string, desc: string, time: string, icon: any }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-white truncate">{title}</h4>
          <span className="text-[11px] text-slate-500 shrink-0">{time}</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{desc}</p>
      </div>
    </div>
  );
}