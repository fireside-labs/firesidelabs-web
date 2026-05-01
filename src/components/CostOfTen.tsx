import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const rows = [
  {
    industry: 'Legal',
    scenario: 'Filing-error settlements',
    range: '$1M – $15M',
    note: 'per incident, public-record range',
  },
  {
    industry: 'Healthcare',
    scenario: 'Denied-claim downstream cost',
    range: '$25 – $118',
    note: 'per encounter (HFMA, 2024)',
  },
  {
    industry: 'Finance',
    scenario: 'Reconciliation overruns',
    range: '$2M – $5M',
    note: 'per remediation cycle (industry avg.)',
  },
];

export const CostOfTen = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12"
      >
        <div className="font-mono text-sm text-copper tracking-widest uppercase mb-4">
          What 10% Costs You
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          The math your CFO<br className="hidden md:block" /> will run anyway.
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
          Three examples. Yours might look different. The 10% your AI gets wrong is
          measured in incidents, not impressions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-50px' }}
        className="glass-elevated rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-[0.8fr_1.4fr_1fr] border-b border-white/5">
          <div className="px-6 py-5 font-mono text-xs text-text-muted tracking-widest uppercase">
            Industry
          </div>
          <div className="px-6 py-5 font-mono text-xs text-text-muted tracking-widest uppercase border-l border-white/5">
            Cost Category
          </div>
          <div className="px-6 py-5 font-mono text-xs text-copper tracking-widest uppercase border-l border-white/5 bg-copper-dim">
            Annualized Range
          </div>
        </div>

        {rows.map((row) => (
          <div
            key={row.industry}
            className="grid grid-cols-[0.8fr_1.4fr_1fr] border-b border-white/5 last:border-b-0
                       hover:bg-white/[0.02] transition-colors duration-300"
          >
            <div className="px-6 py-6 font-medium text-text-primary flex items-center">
              {row.industry}
            </div>
            <div className="px-6 py-6 border-l border-white/5 flex flex-col justify-center">
              <div className="text-text-primary text-sm">{row.scenario}</div>
              <div className="font-mono text-[11px] text-text-muted tracking-wider mt-1">
                {row.note}
              </div>
            </div>
            <div className="px-6 py-6 font-mono text-base border-l border-white/5 bg-copper-dim/50 flex items-center font-medium text-copper">
              {row.range}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-8 flex justify-end"
      >
        <a
          href="#find-whats-failing"
          className="group inline-flex items-center gap-2 font-mono text-xs text-copper tracking-widest uppercase hover:text-text-primary transition-colors"
        >
          See What This Looks Like For You
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};
