import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { motion } from 'framer-motion';
import axios from "axios";
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  Users, 
  MessageSquare,
  Settings, 
  LogOut, 
  ChevronRight,
  User
} from "lucide-react";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:8005/api/v1/auth/me", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const userData = res.data.data || res.data;
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  // Determine active tab based on current URL path
  const getActiveTab = () => {
    if (location.pathname.includes("/admin/colleges")) return "colleges";
    if (location.pathname.includes("/admin/courses")) return "courses";
    if (location.pathname.includes("/admin/faculty")) return "faculty";
    if (location.pathname.includes("/admin/banner")) return "banner";
    if (location.pathname.includes("/admin/members")) return "members";
    if (location.pathname.includes("/admin/messages")) return "messages";
    if (location.pathname.includes("/admin/settings")) return "settings";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Get initials for profile avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Sidebar Stays Fixed */}
      <aside className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/80 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-slate-700/80">
            <a href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-1.5 group">
            <motion.span 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="bg-blue-600 text-white px-2.5 py-1 rounded-xl shadow-md shadow-blue-500/20"
            >
              A
            </motion.span>
            <span>cademiaNP</span>
          </a>
            <p className="text-xs text-slate-400 mt-1">College Portal Management</p>
          </div>

          <nav className="p-4 space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={activeTab === "dashboard"} 
              onClick={() => navigate("/admin/dashboard")} 
            />
            <SidebarItem 
              icon={<Building2 size={18} />} 
              label="Colleges" 
              active={activeTab === "colleges"} 
              onClick={() => navigate("/admin/dashboard/colleges")} 
            />
            <SidebarItem 
              icon={<BookOpen size={18} />} 
              label="Courses" 
              active={activeTab === "courses"} 
              onClick={() => navigate("/admin/dashboard/courses")} 
            />
            <SidebarItem 
              icon={<Users size={18} />} 
              label="Faculty" 
              active={activeTab === "faculty"} 
              onClick={() => navigate("/admin/dashboard/faculty")} 
            />
            <SidebarItem 
              icon={<User size={18} />} 
              label="Members" 
              active={activeTab === "members"} 
              onClick={() => navigate("/admin/dashboard/members")} 
            />
            <SidebarItem 
              icon={<MessageSquare size={18} />} 
              label="Messages" 
              active={activeTab === "messages"} 
              onClick={() => navigate("/admin/dashboard/messages")} 
            />
            <SidebarItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={activeTab === "settings"} 
              onClick={() => navigate("/admin/dashboard/settings")} 
            />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700/80">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-semibold text-sm transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-slate-800/40 backdrop-blur-md border-b border-slate-700/80 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-white font-semibold capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white">{user?.name || "System Admin"}</p>
              <p className="text-[10px] text-slate-400">{user?.email || "admin@collegeportal.com"}</p>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content Changes Here */}
        <div className="p-8 max-w-7xl mx-auto w-full flex-grow">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
          : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}