import { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, Search, Shield, Mail, Calendar, User as UserIcon, MapPin, Phone, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { API_URL } from "../../config/config"; // Import the API_URL constant

export default function MembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/dashboard/users`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = res.data.data || res.data;
      const memberList = Array.isArray(data) ? data : [];
      
      // Filter to only show status === "active" users
      const activeMembers = memberList.filter(
        (member: any) => member.status === "active"
      );

      setMembers(activeMembers);
    } catch (err) {
      console.error("Error fetching members:", err);
      toast.error("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDeleteMember = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/dashboard/users/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      toast.success("Member deleted successfully!");
      setMembers((prev) => prev.filter((m) => (m._id || m.id) !== id));
    } catch (err: any) {
      console.error("Error deleting member:", err);
      toast.error(err.response?.data?.message || "Failed to delete member.");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-blue-400 font-semibold text-lg">
        Loading Members...
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Registered Members
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            Manage system administrators, staff accounts, and registered users.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard/members/register")}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all shrink-0"
        >
          <UserPlus size={18} />
          Register New Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800/60 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 shadow-sm transition-colors"
        />
      </div>

      {/* Members Grid / List */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 border border-slate-700/80 rounded-3xl text-slate-400 font-medium backdrop-blur-xl">
          No members found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member: any) => {
            const memberId = member._id || member.id;
            const imageUrl = member.image?.secureUrl || member.image?.url || (typeof member.image === 'string' ? member.image : null);

            return (
              <div
                key={memberId}
                className="bg-slate-800/50 border border-slate-700/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between backdrop-blur-xl hover:border-slate-600 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 overflow-hidden flex items-center justify-center font-bold text-blue-400 text-lg shrink-0">
                      {imageUrl ? (
                        <img src={imageUrl} alt={member.name} className="w-full h-full object-cover" />
                      ) : member.name ? (
                        member.name.charAt(0).toUpperCase()
                      ) : (
                        <UserIcon size={20} />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                        <Shield size={12} />
                        {member.role || "Member"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteMember(memberId, e)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                    {member.name}
                  </h3>

                  <div className="space-y-1.5 mt-2">
                    <p className="flex items-center gap-2 text-slate-400 text-xs">
                      <Mail size={14} className="text-blue-400 shrink-0" />
                      <span className="line-clamp-1">{member.email}</span>
                    </p>
                    {member.phone && (
                      <p className="flex items-center gap-2 text-slate-400 text-xs">
                        <Phone size={14} className="text-blue-400 shrink-0" />
                        <span className="line-clamp-1">{member.phone}</span>
                      </p>
                    )}
                    {member.address && (
                      <p className="flex items-center gap-2 text-slate-400 text-xs">
                        <MapPin size={14} className="text-blue-400 shrink-0" />
                        <span className="line-clamp-1">{member.address}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-slate-400 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-500" />
                    Joined {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}