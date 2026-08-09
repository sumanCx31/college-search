import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { MapPin, GraduationCap, Plus, Search } from "lucide-react";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("http://localhost:8005/api/v1/college");
        // Adjust based on your API structure (e.g., res.data.data or res.data)
        const collegeData = res.data.data || res.data;
        setColleges(Array.isArray(collegeData) ? collegeData : []);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Filter colleges based on search input
  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.university?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-blue-600 font-semibold text-lg">
        Loading Colleges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Colleges
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Discover institutions, check course structures, tuition fees, and campuses.
            </p>
          </div>

          {/* Add College Button (Links to Admin or Add form if accessible) */}
          <Link
            to="/admin/dashboard/colleges/add"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all shrink-0"
          >
            <Plus size={18} />
            Add College
          </Link>
        </div>

        {/* Search Bar Filter */}
        <div className="mb-10 relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by college name, location, university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 shadow-sm transition-colors"
          />
        </div>

        {/* Colleges Grid */}
        {filteredColleges.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium">
            No colleges found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college: any) => (
              <div
                key={college._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* College Image Banner */}
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={college.image?.secureUrl || "https://placehold.co/600x400"}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                      {college.university || "University"}
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {college.name}
                    </h2>

                    <p className="flex items-center gap-1.5 text-slate-500 text-xs mt-2 font-medium">
                      <MapPin size={14} className="text-blue-600 shrink-0" />
                      <span className="line-clamp-1">{college.location}</span>
                    </p>

                    <p className="mt-3 text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {college.description || "No description provided for this campus yet."}
                    </p>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold">
                    <GraduationCap size={16} className="text-blue-600" />
                    <span>{college.courses?.length || 0} Courses Offered</span>
                  </div>

                  <Link
                    to={`/college/${college._id}`}
                    className="text-xs font-bold bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 px-4 py-2.5 rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}