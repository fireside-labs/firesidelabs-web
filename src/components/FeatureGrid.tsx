import { motion } from 'framer-motion';
import { ScanSearch, Zap, Lock, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: ScanSearch,
    title: 'AI Strategy & Build',
    description: 'We identify the processes costing you the most time and money, then build custom AI solutions that eliminate them: from automated call analysis to intelligent document processing.',
    metric: 'FROM PROBLEM TO PRODUCTION',
    dotColor: 'bg-success',
  },
  {
    icon: Zap,
    title: 'Precision Calibration',
    description: 'Already invested in AI but not seeing results? We diagnose exactly what\'s underperforming and recalibrate with precision, without starting over or disrupting your workflows.',
    metric: 'FIX WITHOUT STARTING OVER',
    dotColor: 'bg-indigo',
  },
  {
    icon: Lock,
    title: 'Embedded Architect',
    description: 'Need ongoing AI leadership without building a full team? We embed directly with your organization, handling the technology so your people can focus on the business.',
    metric: 'YOUR AI TEAM, ON DEMAND',
    dotColor: 'bg-warning',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export const FeatureGrid = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16"
      >
        <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
          Our Services
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          Build. Fix. Run.<br />Wherever you are, we meet you there.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Whether you're deploying AI for the first time or optimizing what you already have,
          we handle the hard part so your team can focus on the business.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.3 } 
            }}
            className="group relative glass rounded-2xl p-8 flex flex-col gap-6 overflow-hidden cursor-default"
          >
            {/* Top gradient bar on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-indigo-dim border border-indigo/20 flex items-center justify-center
                            group-hover:bg-indigo group-hover:border-indigo transition-all duration-300">
              <feature.icon size={22} className="text-indigo group-hover:text-black transition-colors duration-300" />
            </div>

            {/* Title + Arrow */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold leading-tight">{feature.title}</h3>
              <ArrowUpRight size={18} className="text-text-muted opacity-0 group-hover:opacity-100 
                                                  group-hover:text-indigo transition-all duration-300 flex-shrink-0 mt-1" />
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed flex-grow">
              {feature.description}
            </p>

            {/* Metric */}
            <div className="pt-5 border-t border-white/5 flex items-center gap-2 font-mono text-xs text-text-muted tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${feature.dotColor}`} />
              {feature.metric}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
