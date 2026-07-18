import { motion } from "framer-motion";

// components/FeatureGrid.jsx
const cards: any[] = [/* Array of faculty/college data */];

export const FeatureGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
    {cards.map((card, index) => (
      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="text-4xl mb-4">{card.icon}</div>
        <h3 className="text-xl font-bold">{card.title}</h3>
        <p className="text-slate-500 mt-2">{card.desc}</p>
      </motion.div>
    ))}
  </div>
);