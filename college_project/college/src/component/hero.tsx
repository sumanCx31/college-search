import { motion } from "framer-motion";

// components/Hero.jsx
export const Hero = () => (
  <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 text-center">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-extrabold text-slate-900 mb-6"
    >
      Discover the Perfect College <br /> for Your <span className="text-emerald-500">Future</span>
    </motion.h1>
    <div className="bg-white p-3 rounded-2xl shadow-2xl flex gap-2 w-full max-w-2xl border border-slate-100">
      <input type="text" placeholder="Search colleges..." className="flex-grow p-4 outline-none" />
      <select className="bg-slate-50 px-4 rounded-lg">
        <option>All Faculties</option>
        <option>Engineering</option>
      </select>
      <button className="bg-blue-600 text-white px-8 rounded-xl font-bold">Explore</button>
    </div>
  </section>
);