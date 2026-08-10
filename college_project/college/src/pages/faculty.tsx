import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail,  FileText } from 'lucide-react';

const faculties = [
  { id: 1, name: "Dr. Anish Shrestha", title: "Dean of Engineering", dept: "Engineering", img: "/avatar1.jpg" },
  { id: 2, name: "Prof. Sunita Karki", title: "Head of IT", dept: "IT", img: "/avatar2.jpg" },
  { id: 3, name: "Mr. Rajesh Hamal", title: "Senior Consultant", dept: "Management", img: "/avatar3.jpg" },
  { id: 4, name: "Dr. Elena Rai", title: "Research Lead", dept: "Medical", img: "/avatar4.jpg" },
];

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState("All");

  const filtered = selectedDept === "All" ? faculties : faculties.filter(f => f.dept === selectedDept);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Distinguished Faculty</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Meet the visionary leaders and industry experts shaping the next generation of professionals at the top colleges in Nepal.</p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input type="text" placeholder="Search by name or title..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {["All", "Engineering", "IT", "Management", "Medical"].map(dept => (
              <button 
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-2 rounded-full font-medium transition ${selectedDept === dept ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filtered.map((member) => (
              <motion.div 
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-48 w-48 mx-auto rounded-full bg-slate-200 mb-6 overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-linear-to-tr from-blue-100 to-emerald-100" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center">{member.name}</h3>
                <p className="text-blue-600 text-sm font-semibold text-center mb-1">{member.title}</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest text-center mb-6">{member.dept}</p>
                
                <div className="flex justify-center gap-4 border-t pt-4">
                  <button className="text-slate-400 hover:text-blue-600"><Mail size={18} /></button>
                  <button className="text-slate-400 hover:text-blue-600"></button>
                  <button className="text-slate-400 hover:text-emerald-500"><FileText size={18} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}