import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const CASES = [
  {
    stat: '$1.1M',
    statLabel: 'Annual cost reduction',
    client: 'National health insurer',
    tag: 'Process redesign',
    challenge:
      'Claims-adjacent workflows were consuming thousands of analyst hours on work that followed predictable patterns nobody had mapped.',
    approach:
      'Modeled the process end to end, identified where the hours actually went, and redesigned the workflow around statistical models that handled the predictable majority automatically.',
    outcome:
      'A $1.1M annual cost reduction, verified against baseline in the following fiscal year.',
  },
  {
    stat: '$8M',
    statLabel: 'Working capital unlocked',
    client: 'Enterprise operator',
    tag: 'Predictive modeling',
    challenge:
      'Capital sat idle as a buffer because nobody could forecast demand precisely enough to run leaner.',
    approach:
      'Built predictive models that forecast demand at the granularity operations needed, replacing rule-of-thumb buffers with statistically grounded ones.',
    outcome: '$8M in working capital released from buffers back into the business.',
  },
  {
    stat: '13%',
    statLabel: 'Fewer no-shows',
    client: 'Multi-location healthcare operator',
    tag: 'Cancellation modeling',
    challenge:
      'Empty appointment slots from late cancellations and no-shows were bleeding revenue across every location, and overbooking blindly made the patient experience worse.',
    approach:
      'Built a cancellation-propensity model on historical scheduling data, then wired it into how the schedule was actually managed: targeted confirmations, smart waitlisting, selective overbooking.',
    outcome: 'A 13% reduction in no-shows across locations, straight to utilization and revenue.',
  },
];

const WorkPage = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6"
        >
          The work
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.02] mb-8"
        >
          Numbers that <span className="text-gradient italic">held up.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
        >
          A decade of applying models to operations, measured where it counts. Clients stay
          anonymous here. The full walkthroughs happen at a Fireside.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8 mb-24">
        {CASES.map((c, i) => (
          <motion.article
            key={c.stat}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-[240px_1fr] gap-8 md:gap-12"
          >
            <div>
              <div className="font-mono text-5xl md:text-6xl font-bold text-gradient mb-3">
                {c.stat}
              </div>
              <div className="text-text-primary font-semibold mb-2">{c.statLabel}</div>
              <div className="text-sm text-text-muted mb-4">{c.client}</div>
              <div className="inline-block px-3 py-1 rounded-full border border-indigo/30 font-mono text-[10px] tracking-widest text-indigo uppercase">
                {c.tag}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {(
                [
                  ['The problem', c.challenge],
                  ['The approach', c.approach],
                  ['The outcome', c.outcome],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <div className="font-mono text-[11px] tracking-[0.3em] text-indigo/80 uppercase mb-2">
                    {label}
                  </div>
                  <p className="text-text-secondary leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-8 leading-relaxed">
            Want the detail behind any of these, including what didn&apos;t work along the way?
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl
                         text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkPage;
