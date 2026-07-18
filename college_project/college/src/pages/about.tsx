import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Target, Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

// Explicitly type the variants to satisfy TypeScript
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } // "as const" fixes the TS ease error
  }
};

export default function AboutPage() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="min-h-screen bg-white pt-24 pb-24 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-24">
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tight"
        >
          Redefining <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">Education</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="text-xl text-slate-500 mt-8 max-w-2xl mx-auto"
        >
          CollegeFinder Nepal bridges the gap between ambition and opportunity, providing the clarity students deserve.
        </motion.p>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {[
          { icon: Target, title: "Mission", text: "Democratizing education data." },
          { icon: ShieldCheck, title: "Integrity", text: "100% verified information." },
          { icon: Users, title: "Community", text: "10k+ empowered students." },
          { icon: BookOpen, title: "Expertise", text: "Expert-led guidance." }
        ].map((feat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants} 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group transition-colors hover:bg-blue-600"
          >
            <feat.icon className="text-blue-600 group-hover:text-white mb-6 transition-colors" size={32} />
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-2">{feat.title}</h3>
            <p className="text-slate-500 group-hover:text-blue-100 transition-colors">{feat.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Story Block */}
      <motion.section 
        variants={itemVariants} 
        className="max-w-6xl mx-auto px-6"
      >
        <div className="relative rounded-[3rem] bg-slate-900 p-16 overflow-hidden">
          {/* Decorative Blur Effect */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-md">
              Building the future of Nepal's academic landscape.
            </h2>
            <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-400 hover:text-white transition-all">
              Read Our Story <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}