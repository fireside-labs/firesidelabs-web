import { motion } from 'framer-motion';
import { ArrowRight, Building2, ShieldCheck, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalCTA = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative glass-elevated rounded-3xl p-12 md:p-20 text-center overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6"
          >
            Ready to solve it<br />
            <span className="text-gradient">the right way?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed"
          >
             15 minutes. No pitch. No deck. Just tell us what's costing you time and money
             and we'll tell you honestly if AI can fix it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(200, 117, 51, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-10 py-5 bg-indigo text-black font-bold rounded-xl 
                           text-base tracking-wide uppercase transition-all duration-300 glow-indigo-strong cursor-pointer"
              >
                <Flame size={20} />
                Have a Fireside
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center text-text-muted text-sm"
          >
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-indigo/60" />
              15 minutes, no strings attached
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo/60" />
              Zero data access required
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-indigo/60" />
              Built for enterprise operations
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
