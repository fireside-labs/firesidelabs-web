import { motion } from 'framer-motion';
import { CloudOff, FileWarning, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

const rows = [
  {
    icon: TrendingUp,
    label: 'Results You Can Trust',
    cloud: 'Outputs need constant human review — your team becomes the QA department',
    cloudColor: 'text-warning',
    foundry: 'Purpose-built for your domain — results go straight to production',
    foundryColor: 'text-success',
  },
  {
    icon: DollarSign,
    label: 'Time & Cost',
    cloud: 'Hours lost to manual verification, re-work, and babysitting vendor tools',
    cloudColor: 'text-danger',
    foundry: 'Automated workflows that replace manual processes entirely',
    foundryColor: 'text-success',
  },
  {
    icon: CloudOff,
    label: 'Data Privacy',
    cloud: 'Your sensitive data gets sent to third-party cloud servers',
    cloudColor: 'text-danger',
    foundry: 'Everything runs on YOUR systems — nothing ever leaves your building',
    foundryColor: 'text-success',
  },
  {
    icon: FileWarning,
    label: 'Control & Stability',
    cloud: 'Vendor changes their product overnight — your workflows break',
    cloudColor: 'text-warning',
    foundry: 'You own the system completely — it only changes when YOU decide',
    foundryColor: 'text-indigo',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export const ComparisonTable = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
          The Cost of Going It Alone
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          Generic tools create <br className="hidden md:block" />
          expensive problems.
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
          Off-the-shelf AI sounds good in a demo. In production, your team spends more time 
          checking its work than doing their own — and your sensitive data ends up on someone else's servers.
        </p>
      </motion.div>

      <motion.div 
        className="glass-elevated rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-white/5">
          <div className="px-8 py-5 font-mono text-xs text-text-muted tracking-widest uppercase">
            Metric
          </div>
          <div className="px-8 py-5 font-mono text-xs text-text-muted tracking-widest uppercase border-l border-white/5 flex items-center gap-2">
            <AlertTriangle size={14} className="text-warning" />
            Generic AI
          </div>
          <div className="px-8 py-5 font-mono text-xs text-indigo tracking-widest uppercase border-l border-white/5 bg-indigo-dim flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo glow-indigo" />
            Fireside Labs
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={rowVariants}
              className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-white/5 last:border-b-0 
                         hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <div className="px-8 py-6 flex items-center gap-4 font-medium text-text-primary">
                <row.icon size={18} className="text-indigo/60 group-hover:text-indigo transition-colors" />
                {row.label}
              </div>
              <div className={`px-8 py-6 font-mono text-sm border-l border-white/5 flex items-center ${row.cloudColor}`}>
                {row.cloud}
              </div>
              <div className={`px-8 py-6 font-mono text-sm border-l border-white/5 bg-indigo-dim/50 flex items-center font-medium ${row.foundryColor}`}>
                {row.foundry}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
