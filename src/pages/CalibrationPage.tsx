import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, TrendingUp, Zap, Lock, Shield } from 'lucide-react';
import { AccuracyGraph } from '../components/AccuracyGraph';

const CalibrationPage = () => {
  return (
    <div className="pt-28">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Precision Calibration
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Already have AI?{' '}
            <span className="text-gradient">Make it actually work.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-4">
            You already built and trained your AI. It's good—but not good enough for your domain.
            We find the exact failure modes and fix them without starting over.
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed font-mono tracking-wide">
            Different from <Link to="/solutions" className="text-[#C87533] hover:underline">Solutions</Link>: that's where you start from zero. This page is where the model already exists.
          </p>
        </motion.div>
      </section>

      {/* How Calibration Works */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Diagnose',
              description: 'We map exactly where your AI underperforms: which categories, which edge cases, which inputs cause failures.',
            },
            {
              icon: Zap,
              title: 'Fix With Precision',
              description: 'We correct only the broken capabilities without degrading everything else. No full retraining. No starting from scratch.',
            },
            {
              icon: Lock,
              title: 'Deploy Privately',
              description: 'The improved system runs on your hardware. No data leaves your building. You own it completely. Learn more about our security model.',
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <step.icon size={28} className="text-indigo mb-4 opacity-70" />
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              {i === 2 && (
                <Link to="/security" className="text-indigo font-semibold text-sm hover:text-indigo/80 transition-colors mt-3 inline-block">
                  Security & Trust →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Accuracy Graph */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            The Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-tight mb-4">
            Before and after calibration.
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Real performance improvement across domain-specific tasks, without retraining the entire system.
          </p>
        </motion.div>
        <AccuracyGraph />
      </section>

      {/* Comparison: Before vs After */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-elevated rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_1fr] border-b border-white/5">
            <div className="px-8 py-5 font-mono text-xs text-warning tracking-widest uppercase flex items-center gap-2">
              <Shield size={14} />
              Before Calibration
            </div>
            <div className="px-8 py-5 font-mono text-xs text-success tracking-widest uppercase border-l border-white/5 flex items-center gap-2 bg-indigo-dim">
              <div className="w-2 h-2 rounded-full bg-indigo glow-indigo" />
              After Calibration
            </div>
          </div>
          {[
            { before: 'AI outputs need constant human review', after: 'Results go directly into production workflows' },
            { before: 'Edge cases cause unpredictable failures', after: 'Edge cases are identified and handled correctly' },
            { before: 'Team doesn\'t trust the AI; workarounds everywhere', after: 'Team relies on the AI; saves hours per week' },
            { before: 'Vendor lock-in; you can\'t switch without starting over', after: 'You own the system; full control, full portability' },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-[1fr_1fr] border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="px-8 py-5 text-sm text-text-secondary">{row.before}</div>
              <div className="px-8 py-5 text-sm text-text-primary font-medium border-l border-white/5 bg-indigo-dim/50">{row.after}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] mb-4">
            Think your AI could be doing better?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            15 minutes. Tell us what's underperforming. We'll tell you honestly if calibration can fix it.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(200, 117, 51, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-indigo text-black font-bold rounded-xl text-base tracking-wide uppercase transition-all duration-300 glow-indigo-strong cursor-pointer"
            >
              <Flame size={20} />
              Have a Fireside
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default CalibrationPage;
