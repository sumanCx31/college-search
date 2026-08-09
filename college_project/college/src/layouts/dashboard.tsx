import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ChevronRight
} from "lucide-react";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current URL path
  const getActiveTab = () => {
    if (location.pathname.includes("/admin/colleges")) return "colleges";
    if (location.pathname.includes("/admin/courses")) return "courses";
    if (location.pathname.includes("/admin/faculty")) return "faculty";
    if (location.pathname.includes("/admin/banner")) return "banner";
    if (location.pathname.includes("/admin/settings")) return "settings";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Sidebar Stays Fixed */}
      <aside className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/80 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-slate-700/80">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <LayoutDashboard className="text-blue-500" size={22} />
              Admin Panel
            </h2>
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
              icon={<ImageIcon size={18} />} 
              label="Banner" 
              active={activeTab === "banner"} 
              onClick={() => navigate("/admin/dashboard/banner")} 
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
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white">System Admin</p>
              <p className="text-[10px] text-slate-400">admin@collegeportal.com</p>
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