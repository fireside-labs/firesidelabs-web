import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Zap, Shield, BarChart3, Clock } from 'lucide-react';

const leaderboard = [
  { rank: '🥇 1st', model: 'Gemini 3.1 Flash-Lite', score: 93, routing: '39/40', reasoning: '23/25', noTool: '18/20', ambiguous: '13/15', latency: '1,241ms', tier: 'cloud', tierLabel: '☁ Cloud' },
  { rank: '🥈 2nd', model: 'Gemini 3.0 Flash', score: 89, routing: '35/40', reasoning: '21/25', noTool: '20/20', ambiguous: '13/15', latency: '2,414ms', tier: 'cloud', tierLabel: '☁ Cloud' },
  { rank: '🥉 3rd', model: 'Fireside Specialist ✦', score: 88, routing: '40/40 🏆', reasoning: '20/25', noTool: '15/20', ambiguous: '13/15', latency: '2,893ms', tier: 'specialist', tierLabel: '✦ Mid · Local', isSpecialist: true },
  { rank: '🥉 3rd', model: 'Qwen3 (mid-class)', score: 88, routing: '38/40', reasoning: '23/25 🏆', noTool: '12/20', ambiguous: '15/15 🏆', latency: '2,741ms', tier: 'mid', tierLabel: '🏠 Mid · Local' },
  { rank: '🥉 3rd', model: 'Stock mid-class (v2)', score: 88, routing: '39/40', reasoning: '21/25', noTool: '13/20', ambiguous: '15/15 🏆', latency: '2,825ms', tier: 'mid', tierLabel: '🏠 Mid · Local' },
  { rank: '🥉 3rd', model: 'Mistral (small-class)', score: 88, routing: '38/40', reasoning: '18/25', noTool: '20/20 🏆', ambiguous: '12/15', latency: '3,108ms', tier: 'small', tierLabel: '🏠 Small · Local' },
  { rank: '7th', model: 'Gemini 2.5 Flash-Lite', score: 78, routing: '35/40', reasoning: '19/25', noTool: '12/20', ambiguous: '12/15', latency: '840ms', tier: 'cloud', tierLabel: '☁ Cloud' },
  { rank: '8th', model: 'Gemini 2.5 Flash', score: 77, routing: '34/40', reasoning: '15/25', noTool: '20/20', ambiguous: '8/15', latency: '1,430ms', tier: 'cloud', tierLabel: '☁ Cloud' },
  { rank: '9th', model: 'Qwen3 (small-class)', score: 75, routing: '33/40', reasoning: '14/25', noTool: '19/20', ambiguous: '9/15', latency: '3,951ms', tier: 'small', tierLabel: '🏠 Small · Local' },
];

const BenchmarksPage = () => {
  return (
    <div className="pt-28">
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Benchmarks
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            We test what{' '}
            <span className="text-gradient">nobody else tests.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Independent model evaluation across production-relevant tasks: routing, reasoning, tool use, and ambiguity handling. Updated regularly. No vendor sponsorships.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, label: 'Models Evaluated', value: '50+' },
            { icon: Zap, label: 'Eval Speed', value: '10,000×' },
            { icon: Shield, label: 'Deterministic Scoring', value: '100%' },
            { icon: Clock, label: 'Updated', value: 'Regularly' },
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
              ❌ Standard Benchmarks
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
                <span><strong className="text-text-primary">No latency or cost</strong>: a model that takes 30 seconds per response does not show up as slow in MMLU scores.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400/60 flex-shrink-0">✗</span>
                <span><strong className="text-text-primary">Public dataset contamination</strong>: the questions, answers, and walkthroughs for popular benchmarks have been scraped into model training data. Scores often measure recall of a familiar format, not reasoning.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8 border-[#C87533]/20"
            style={{ borderColor: 'rgba(200, 117, 51, 0.15)' }}
          >
            <div className="font-mono text-[10px] tracking-widest text-[#C87533] uppercase mb-4">
              ✦ Fireside Methodology
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
                <span><strong className="text-text-primary">Latency + cost included</strong>: every result includes inference time and deployment tier. A fast bad model beats a slow good model at scale.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C87533] flex-shrink-0">✦</span>
                <span><strong className="text-text-primary">Held-out, private tasks</strong>: questions written internally and never published. Models cannot have seen them in training, so the score reflects real capability rather than memorized format.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Production Routing Evaluation
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-2">
            Leaderboard
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-2xl">
            100 tasks per evaluation cycle. Four categories: routing accuracy, multi-step reasoning, knowledge recall without tools, and ambiguous query handling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-elevated rounded-2xl overflow-hidden overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Rank', 'Model', 'Score', 'Routing', 'Reasoning', 'No-Tool', 'Ambiguous', 'Latency', 'Tier'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-text-muted uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${row.isSpecialist ? 'bg-[#C87533]/[0.06]' : ''}`}
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold text-text-muted whitespace-nowrap">{row.rank}</td>
                  <td className={`px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap ${row.isSpecialist ? 'text-[#C87533]' : 'text-text-primary'}`}>
                    {row.model}
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm font-bold ${row.score >= 88 ? 'text-text-primary' : 'text-text-muted'}`}>
                    {row.score}
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs whitespace-nowrap ${row.routing.includes('🏆') ? 'text-[#C87533] font-bold' : ''}`}>{row.routing}</td>
                  <td className={`px-4 py-3 font-mono text-xs whitespace-nowrap ${row.reasoning.includes('🏆') ? 'text-[#C87533] font-bold' : ''}`}>{row.reasoning}</td>
                  <td className={`px-4 py-3 font-mono text-xs whitespace-nowrap ${row.noTool.includes('🏆') ? 'text-[#C87533] font-bold' : ''}`}>{row.noTool}</td>
                  <td className={`px-4 py-3 font-mono text-xs whitespace-nowrap ${row.ambiguous.includes('🏆') ? 'text-[#C87533] font-bold' : ''}`}>{row.ambiguous}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted whitespace-nowrap">{row.latency}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-block font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${
                      row.tier === 'cloud' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      row.tier === 'specialist' ? 'bg-[#C87533]/20 text-[#C87533] border-[#C87533]/40 font-extrabold' :
                      row.tier === 'mid' ? 'bg-[#C87533]/10 text-[#C87533]/80 border-[#C87533]/20' :
                      'bg-white/5 text-text-muted border-white/10'
                    }`}>
                      {row.tierLabel}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Routing', winner: 'Fireside Specialist', detail: '40/40, only perfect score' },
            { label: 'Reasoning', winner: 'Qwen3 (mid-class)', detail: '23/25, ties cloud leader' },
            { label: 'No-Tool', winner: 'Mistral (small-class)', detail: '20/20, only perfect score' },
            { label: 'Ambiguous', winner: 'Qwen3 + Stock mid', detail: '15/15, beat all cloud tiers' },
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-5"
            >
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">{cat.label}</div>
              <div className="font-mono text-sm font-bold text-[#C87533] mb-1">{cat.winner}</div>
              <div className="text-xs text-text-muted">{cat.detail}</div>
            </motion.div>
          ))}
        </div>
      </section>

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
              <p className="text-text-muted text-sm">Know exactly what your model can and cannot do—before it costs you.</p>
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
                description: 'Deterministic scoring with variance analysis. We measure first-attempt reliability, not just cherry-picked best-of-N results.',
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
