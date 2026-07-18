import { motion } from 'framer-motion';

export const Navbar = () => {
  const navItems = ['Home', 'Colleges', 'Course', 'About', 'Contact'];
  
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">CollegeFinder Nepal</div>
        
        <div className="hidden md:flex gap-8 font-medium text-slate-700">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              className="hover:text-emerald-500 transition"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition">Login</button>
          <button className="bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-600 transition">Register</button>
        </div>
      </div>
    </motion.nav>
  );
};