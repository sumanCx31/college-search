import { 
  Building2, 
  BookOpen, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  GraduationCap, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

export default function AdminDashboardHome() {
  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Admin! 👋</h1>
          <p className="text-blue-100 text-sm mt-2 max-w-xl">
            Here's a quick overview of your platform statistics, registered institutions, and active student engagement metrics today.
          </p>
        </div>
      </div>

      {/* Stats Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Colleges" 
          value="24+" 
          change="+12% this month" 
          icon={<Building2 size={22} className="text-blue-400" />} 
          bg="bg-blue-500/10" 
          border="border-blue-500/20"
        />
        <StatCard 
          title="Active Courses" 
          value="48" 
          change="+4 new added" 
          icon={<BookOpen size={22} className="text-emerald-400" />} 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
        <StatCard 
          title="Faculty Members" 
          value="156" 
          change="Fully verified" 
          icon={<Users size={22} className="text-amber-400" />} 
          bg="bg-amber-500/10" 
          border="border-amber-500/20"
        />
        <StatCard 
          title="Platform Visits" 
          value="12.4K" 
          change="+18.5% growth" 
          icon={<TrendingUp size={22} className="text-purple-400" />} 
          bg="bg-purple-500/10" 
          border="border-purple-500/20"
        />
      </div>

      {/* Two Column Section (Recent Activities & Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities (Span 2) */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-blue-400" /> Recent Activities
            </h2>
            <span className="text-xs font-semibold text-slate-400">Live feed</span>
          </div>

          <div className="space-y-4">
            <ActivityItem 
              title="New college registered" 
              desc="Pulchowk Campus updated their yearly fee structure." 
              time="10 mins ago" 
              icon={<Building2 size={16} className="text-blue-400" />} 
            />
            <ActivityItem 
              title="Course syllabus updated" 
              desc="B.E. Computer Engineering modified core subject prerequisites." 
              time="1 hour ago" 
              icon={<BookOpen size={16} className="text-emerald-400" />} 
            />
            <ActivityItem 
              title="Faculty member verified" 
              desc="Dr. Ram Sharma approved for Department of Computer Science." 
              time="3 hours ago" 
              icon={<CheckCircle2 size={16} className="text-purple-400" />} 
            />
          </div>
        </div>

        {/* Quick System Summary Card */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">System Status</h2>
            <p className="text-xs text-slate-400 mb-6">All database queries and API endpoints are functioning smoothly.</p>
            
            <div className="space-y-4">
              <SystemStatusRow label="Database Connection" status="Optimal" color="bg-emerald-500" />
              <SystemStatusRow label="API Response Time" status="42ms" color="bg-blue-500" />
              <SystemStatusRow label="Storage Capacity" status="34% Used" color="bg-amber-500" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Security Version</span>
              <span className="text-white">v2.4.0-stable</span>
            </div>
          </div>
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

function SystemStatusRow({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-white font-bold text-xs">{status}</span>
      </div>
    </div>
  );
}