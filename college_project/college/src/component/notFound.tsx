import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Decorative 404 */}
        <div className="text-9xl font-extrabold text-blue-100 mb-6">404</div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-10 text-lg">
          The page you are looking for might have been moved, deleted, or never existed. 
          Let’s get you back on the right academic path.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
          <a 
            href="/"
            className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition"
          >
            <Home size={20} /> Return Home
          </a>
        </div>

        {/* Helpful Search Prompt */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-400 mb-4">Alternatively, try searching for a college:</p>
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};