import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

export default function CollegesByCourseId() {
  const { courseId } = useParams();

  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8005/api/v1/college/all-colleges/${courseId}`
        );

        console.log("API Response:", res.data);

        // Fixed: Extracting the array from res.data.data
        setColleges(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [courseId]);

  if (loading) {
    return (
      <div className="p-20 text-center text-lg font-semibold text-blue-600">
        Loading Colleges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-8 text-slate-600 hover:text-blue-600 font-semibold"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Colleges Offering This Course
          </h1>

          <p className="text-slate-500 mt-2 font-medium">
            Total Colleges: {colleges.length}
          </p>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-white rounded-2xl border border-slate-200">
            No colleges found for this course.
          </div>
        ) : (
          <div className="space-y-6">
            {colleges.map((college: any) => {
              const fee = college.courses?.find(
                (c: any) => c.course === courseId
              );

              return (
                <div
                  key={college._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="flex gap-5 items-start">
                    <img
                      src={college.image?.secureUrl || "https://placehold.co/150"}
                      alt={college.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-100"
                    />

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {college.name}
                      </h2>

                      <p className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
                        <MapPin size={16} className="text-blue-600" />
                        {college.location}
                      </p>

                      <p className="mt-2 text-slate-600 text-sm line-clamp-2">
                        {college.description}
                      </p>

                      <p className="mt-2 text-blue-600 font-semibold text-sm">
                        University: {college.university}
                      </p>
                    </div>
                  </div>

                  <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <div className="flex items-center md:justify-end gap-1.5 text-emerald-600 font-bold text-xl">
                      <span className="text-sm font-semibold">Rs.</span>
                      {fee ? fee.totalFee?.toLocaleString() : "Contact"}
                    </div>

                    {fee && (
                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        <p>Yearly: Rs. {fee.yearly?.toLocaleString()}</p>
                        <p>Admission: Rs. {fee.admissionFee?.toLocaleString()}</p>
                      </div>
                    )}

                    <div className="mt-3 flex items-center md:justify-end gap-1.5 text-slate-600 text-xs font-bold">
                      <GraduationCap size={16} className="text-blue-600" />
                      {college.courses?.length || 0} Courses
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}