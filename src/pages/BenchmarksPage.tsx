import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Zap, Shield, BarChart3, Clock, ExternalLink } from 'lucide-react';

// v2 leaderboard — 6-row teaser from the 23-model benchmark
// Ranked by Adjusted score (primary), Strict (tiebreak). Full dataset in the paper.
const teaser = [
  {
    rank: 1,
    model: 'Claude Opus 4.7',
    provider: 'Anthropic',
    strict: 87,
    adjusted: 98,
    latency: '3,150 ms',
    type: 'cloud',
  },
  {
    rank: 1,
    model: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    strict: 78,
    adjusted: 98,
    latency: '1,264 ms',
    type: 'cloud',
  },
  {
    rank: 3,
    model: 'Gemini 3.0 Pro',
    provider: 'Google',
    strict: 93,
    adjusted: 97,
    latency: '4,240 ms',
    type: 'cloud',
  },
  {
    rank: 6,
    model: 'Gemma 4 31B-it',
    provider: 'Local',
    strict: 95,
    adjusted: 96,
    latency: '2,940 ms',
    type: 'local',
    headline: true,
  },
  {
    rank: 6,
    model: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    strict: 89,
    adjusted: 96,
    latency: '2,413 ms',
    type: 'cloud',
  },
  {
    rank: 11,
    model: 'GPT-5.5',
    provider: 'OpenAI',
    strict: 88,
    adjusted: 94,
    latency: '2,341 ms',
    type: 'cloud',
  },
  {
    rank: 12,
    model: 'Gemini 3.1 Flash-Lite',
    provider: 'Google',
    strict: 92,
    adjusted: 93,
    latency: '790 ms',
    type: 'cloud',
  },
];

const providerColor = (type: string) => {
  if (type === 'local') return 'bg-[#C87533]/10 text-[#C87533] border-[#C87533]/30';
  return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
};

const BenchmarksPage = () => {
  return (
    <div className="pt-28">

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Benchmarks · v2
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Capability parity across{' '}
            <span className="text-gradient">local and cloud.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            23 models, 4 providers, 100 tasks each, all scored at 99% statistical confidence. A free local model now matches Google's flagship cloud tier on tool-calling accuracy. The Type&nbsp;A/B failure framework in the full paper reveals what the Strict leaderboard alone cannot.
          </p>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, label: 'Models Evaluated', value: '23' },
            { icon: Zap,       label: 'Tasks per Model',  value: '100' },
            { icon: Shield,    label: 'Confidence Level', value: '99%' },
            { icon: Clock,     label: 'Updated',          value: 'May 2026' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-5 text-center"
            >
              <stat.icon size={20} className="text-indigo mx-auto mb-2 opacity-60" />
              <div className="text-2xl font-bold font-mono text-gradient mb-1">{stat.value}</div>
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Methodology comparison ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Methodology
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4">
            Why standard benchmarks lie.
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-3xl">
            Most published AI benchmarks measure academic performance under ideal conditions. We measure production performance under real conditions. The difference is everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8 border-red-500/10"
          >
            <div className="font-mono text-[10px] tracking-widest text-red-400 uppercase mb-4">
              Standard Benchmarks
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">5-shot prompting</strong>: the model gets 5 worked examples before answering. In production, your users do not provide examples.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">Best-of-N scoring</strong>: run the same task 5 times, report the best result. Masks how often the model actually fails.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">Academic tasks</strong>: trivia, multiple choice, textbook problems. Not your domain. Not your edge cases.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">No latency</strong>: a model that takes 30 seconds per response does not show up as slow in MMLU scores.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">Public dataset contamination</strong>: questions and walkthroughs for popular benchmarks have been scraped into model training data. Scores often measure memorized format, not reasoning.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8"
            style={{ borderColor: 'rgba(200, 117, 51, 0.15)' }}
          >
            <div className="font-mono text-[10px] tracking-widest text-[#C87533] uppercase mb-4">
              Fireside Methodology
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">1-shot, zero-example</strong>: the model gets the task cold, exactly like production. No warm-up. No hints.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">First-attempt scoring</strong>: we measure what happens the first time. Retries are tracked separately because they cost you money.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">Production-grade tasks</strong>: tool calling, multi-step routing, ambiguous inputs. The exact scenarios where models break in the real world.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">Type A / Type B classification</strong>: not all "no tool call" responses are equal. The full paper distinguishes genuine misses from legitimate clarifying questions. The Adjusted score credits the latter.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">Held-out, private tasks</strong>: questions written internally and never published. Models cannot have seen them in training.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Teaser leaderboard ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            v2 · 23-Model Tool-Calling Benchmark
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-2">
            Leaderboard highlights
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-2xl">
            Seven representative rows from the full 23-model dataset: one local, three Anthropic, two Google, one OpenAI. <strong className="text-text-primary">Strict</strong> = exact-match accuracy; <strong className="text-text-primary">Adjusted</strong> = Strict plus clarifying-question rescues. See the paper for Wilson confidence intervals, Type&nbsp;A/B counts, and the full table.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-elevated rounded-2xl overflow-hidden"
          style={{ overflowX: 'auto' }}
        >
          <table className="w-full text-sm" style={{ minWidth: '520px' }}>
            <thead>
              <tr className="border-b border-white/10">
                {['Rank', 'Model', 'Provider', 'Strict', 'Adjusted', 'Latency'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-text-muted uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teaser.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                    row.headline ? 'bg-[#C87533]/[0.04]' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold text-text-muted whitespace-nowrap">
                    {row.rank}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-text-primary whitespace-nowrap">
                    {row.model}
                    {row.headline && (
                      <span className="ml-2 font-mono text-[9px] tracking-wider text-[#C87533] uppercase">
                        highest Strict
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${providerColor(row.type)}`}
                    >
                      {row.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-bold text-text-primary whitespace-nowrap">
                    {row.strict}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-bold whitespace-nowrap" style={{ color: '#C87533' }}>
                    {row.adjusted}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted whitespace-nowrap">
                    {row.latency}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="font-mono text-[10px] text-text-muted mt-3 px-1">
          Adjusted ranked; Strict used as tiebreak. Latency: cloud = P50 API round-trip; local = P50 GPU inference on RTX 5090. Full dataset: 23 models.
        </p>
      </section>

      {/* ── Paper CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-elevated rounded-3xl p-8 md:p-12 border border-indigo/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <div className="font-mono text-[10px] tracking-widest text-indigo uppercase mb-3">
                Full Paper · May 2026
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-3">
                See the full 23-model leaderboard.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                The complete paper includes Wilson 99% confidence intervals, Type&nbsp;A/B failure classification for every model, per-provider analysis, and the cost decision table. It answers whether cloud spend is justified for your workload, with the data to back it up.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="/papers/Local_vs_Cloud_Tool_Calling.html" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer whitespace-nowrap"
                >
                  <ExternalLink size={18} />
                  Read the Full Paper
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Benchmarking as a Service ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-elevated rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#C87533]/10 border border-[#C87533]/20 flex items-center justify-center">
              <BarChart3 size={24} className="text-[#C87533]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Benchmarking as a Service</h2>
              <p className="text-text-muted text-sm">Know exactly what your model can and cannot do, before it costs you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Custom Evaluation',
                description: 'We build evaluation harnesses tailored to your exact production task, not generic benchmarks that tell you nothing about your use case.',
              },
              {
                title: '10,000× Faster Testing',
                description: 'Our evaluation infrastructure runs thousands of test cases in minutes, not hours. Test more models, more configurations, faster than anyone.',
              },
              {
                title: 'Honest Reporting',
                description: 'Deterministic scoring with variance analysis. We measure the first-attempt reliability your users actually experience.',
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-base font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside about Benchmarking
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default BenchmarksPage;
