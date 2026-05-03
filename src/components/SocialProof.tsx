import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, FlaskConical, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SocialProof = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16"
      >
        <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
          Why Fireside Labs
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          We don't just advise.<br />We build and deliver.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Every solution we deliver is purpose-built for your business:
          not a template, not a wrapper around someone else's product, not a slide deck.
        </p>
      </motion.div>

      {/* Stats / credential blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: FlaskConical,
            stat: '2+ Years',
            label: 'Deep R&D',
            detail: 'Original research and engineering. Not reselling someone else\'s tools',
          },
          {
            icon: Scale,
            stat: 'Patent Pending',
            label: 'Original Methods',
            detail: 'Built from original research. Not a wrapper, not a retrain',
          },
          {
            icon: BookOpen,
            stat: 'High-Stakes',
            label: 'Deployments',
            detail: 'Built for operations where an AI mistake has a real cost; accuracy is the baseline, not a feature',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <item.icon size={28} className="text-indigo mx-auto mb-4 opacity-60" />
            <div className="text-2xl font-bold font-mono text-gradient mb-1">{item.stat}</div>
            <div className="text-sm font-semibold text-text-primary mb-2">{item.label}</div>
            <div className="text-sm text-text-muted">{item.detail}</div>
          </motion.div>
        ))}
      </div>

      {/* Gated asset CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div>
          <h3 className="text-xl font-bold mb-2">See How We Work</h3>
          <p className="text-text-secondary text-sm max-w-lg">
            A concise overview of our approach, security posture, and deployment process,
            available for qualified enterprise prospects.
          </p>
        </div>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-indigo text-black font-semibold rounded-xl
                       text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer whitespace-nowrap"
          >
            Request Overview
            <ArrowRight size={16} />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};
