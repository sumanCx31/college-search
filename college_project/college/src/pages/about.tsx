import { motion, type Variants } from 'framer-motion';
import { Target, Users, BookOpen, ShieldCheck, ArrowRight, Award, Compass, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  }
};

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="min-h-screen bg-slate-50 pt-24 pb-24 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-24">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-100">
          <Compass size={16} /> Empowering Students Across Nepal
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight"
        >
          Redefining <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">Education Discovery</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          CollegeFinder Nepal bridges the gap between ambition and opportunity, providing the clarity, verified data, and insights students deserve.
        </motion.p>
      </section>

      {/* Stats Section Banner */}
      <motion.section variants={itemVariants} className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600">100+</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Verified Colleges</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">50+</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Academic Programs</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600">10k+</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Active Students</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">100%</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Accurate Fee Data</p>
          </div>
        </div>
      </motion.section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {[
          { icon: Target, title: "Our Mission", text: "Democratizing education data to make college selection completely transparent." },
          { icon: ShieldCheck, title: "Total Integrity", text: "100% verified campus details, program fees, and official contact channels." },
          { icon: Users, title: "Vibrant Community", text: "Connecting thousands of aspiring students with premier institutions daily." },
          { icon: BookOpen, title: "Deep Expertise", text: "Comprehensive course metrics, core subjects, and duration breakdowns." }
        ].map((feat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants} 
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-6 shadow-sm">
              <feat.icon size={26} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feat.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Expanded Story & Vision Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-white p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Our Story</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 mb-4">Born out of the need for clarity in academic choices.</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Finding the right college shouldn't require endless phone calls, unverified rumors, or outdated brochures. We built CollegeFinder Nepal to place all the tools, exact course lists, admission guidelines, and structural fee breakdowns directly into the hands of students and parents.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-6 border-t border-slate-100 text-slate-700 font-medium">
            <Award className="text-blue-600" size={24} /> Trusted by students nationwide
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">Our Vision</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 mb-4">Shaping the future of educational access.</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our vision goes beyond simple listings. We are creating a unified ecosystem where students can seamlessly filter through faculties like IT, Engineering, Management, and Science, comparing institutions side-by-side to make the most confident decision for their career.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-6 border-t border-slate-100 text-slate-700 font-medium">
            <HeartHandshake className="text-emerald-600" size={24} /> Built by students, for students
          </div>
        </motion.div>
      </section>

      {/* Call to Action Story Block */}
      <motion.section 
        variants={itemVariants} 
        className="max-w-6xl mx-auto px-6"
      >
        <div className="relative rounded-[3rem] bg-slate-900 p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Decorative Blur Effect */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-25" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full blur-[120px] opacity-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-xl">
                Ready to take the next step in your academic journey?
              </h2>
              <p className="text-slate-400 mt-3 text-base md:text-lg">
                Explore our directory of verified colleges and structured programs today.
              </p>
            </div>
            <button 
              onClick={() => navigate('/colleges')}
              className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg shrink-0"
            >
              Explore Colleges <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}