import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, IndianRupee, ArrowRight } from 'lucide-react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8005/api/v1/college')
      .then(res => { 
        setColleges(res.data.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Colleges</h1>
        
        {loading ? (
          <p>Loading colleges...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <div 
                key={college._id}
                onClick={() => window.location.href = `/colleges/${college._id}`}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg transition"
              >
                <img src={college.image?.secureUrl} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg">{college.name}</h3>
                <div className="flex items-center text-slate-500 text-sm mt-2">
                  <MapPin size={14} className="mr-1" /> {college.location}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-blue-600 font-bold">
                  View Details <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}