import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Flame, ExternalLink, Lock, X, Mail } from 'lucide-react';

interface Paper {
  title: string;
  description: string;
  tag: string;
  file: string;
  gated: boolean;
  date: string;
  readTime: string;
  pullQuote: string;
}

const AUTHOR = 'Jordan Nguyen';

const papers: Paper[] = [
  {
    title: 'Your Data Is Leaving the Building',
    description: 'A practical guide to AI privacy for regulated industries: how cloud AI leaks happen, why they are fatal in HIPAA/legal/finance, and how to plug the hole.',
    tag: 'PRIVACY & COMPLIANCE',
    file: '/papers/Your_Data_Is_Leaving_The_Building.html',
    gated: false,
    date: 'Apr 2025',
    readTime: '11 min',
    pullQuote: 'In boardrooms spanning Wall Street, major healthcare networks, and global law firms, the same quiet panic is setting in. Every CFO and Chief Risk Officer is asking the exact same question: when my employees type our proprietary data into ChatGPT, where is it actually going?',
  },
  {
    title: 'Build vs. Buy: An Honest Guide to Enterprise AI',
    description: 'When off-the-shelf tools work, when they don’t, and a practical decision framework for CTOs navigating the build-or-buy question.',
    tag: 'STRATEGY',
    file: '/papers/Build_vs_Buy_Enterprise_AI.html',
    gated: false,
    date: 'Apr 2025',
    readTime: '9 min',
    pullQuote: 'Buying an API is like taking an Uber. If you only need to go to the airport once a month, owning a car makes no financial sense. Until it does.',
  },
  {
    title: 'When a Smaller Model Wins',
    description: 'Under the right conditions, a purpose-built specialist outperforms a model 3x its size. Evidence for why domain specialization beats raw scale.',
    tag: 'APPLIED RESEARCH',
    file: '/papers/Specialization_vs_Generalization.html',
    gated: true,
    date: 'Apr 2025',
    readTime: '14 min',
    pullQuote: 'The prevailing heuristic in enterprise AI deployment is that larger models perform better. For general-purpose tasks this is largely true. For domain-constrained production workloads, it is frequently wrong.',
  },
  {
    title: 'The Self-Learning Enterprise',
    description: 'How AI systems that improve from every human interaction are replacing static tools, and the three conditions that determine if your business is ready.',
    tag: 'ARCHITECTURE',
    file: '/papers/The_Self_Learning_Enterprise.html',
    gated: true,
    date: 'Apr 2025',
    readTime: '8 min',
    pullQuote: 'Traditional AI works exactly like the software you curse at: it is frozen in the moment it was deployed. Your business is not. The world’s most forward-thinking companies are building living AI infrastructure that gets measurably smarter every time their employees do their jobs.',
  },
  {
    title: 'The New Intelligence',
    description: 'A plain-English guide to how AI actually works, why most companies are using the wrong tool for the job, and how to think clearly about where it is all going.',
    tag: 'EXECUTIVE BRIEF',
    file: '/papers/The_New_Intelligence.html',
    gated: false,
    date: 'Apr 2025',
    readTime: '14 min',
    pullQuote: 'The problem isn’t that AI is impossibly complicated. The problem is that almost everyone explaining it has a reason to make it sound complicated, it sells a product, or it justifies a budget.',
  },
  {
    title: 'HTTP Timeouts as Silent Sabotage',
    description: 'How a single fixed timeout in an inference benchmark can suppress large-model scores by 5–15 percentage points—and why this single configuration choice quietly distorts most public leaderboards.',
    tag: 'BENCHMARKING METHODS',
    file: '/papers/HTTP_Timeouts_Silent_Sabotage.html',
    gated: false,
    date: 'Apr 2026',
    readTime: '8 min',
    pullQuote: 'A 240-second timeout is wrong for every model. Smaller models finish in two seconds. Larger models, if you let them think, will spend forty-five—and arrive at the right answer. Cut them off and you have not measured a model; you have measured your patience.',
  },
  {
    title: 'Pruning Is Free at 5%',
    description: 'A surprising empirical result: removing 5% of parameters from a 31B-parameter model produced no measurable accuracy loss across HumanEval, MMLU, and general knowledge benchmarks—while running faster and using less VRAM.',
    tag: 'APPLIED RESEARCH',
    file: '/papers/Pruning_Free_at_5_Percent.html',
    gated: false,
    date: 'Apr 2026',
    readTime: '7 min',
    pullQuote: '5% smaller. 4% faster. Same accuracy. Conventional wisdom says every parameter you cut costs you something. We found the exception, and it is large enough to matter for production deployment.',
  },
  {
    title: 'Letter-Shuffle: A Contamination Probe',
    description: 'A cheap, repeatable test for detecting whether a model is reasoning through a benchmark or pattern-matching memorized answers. Of 25 models tested, 7 showed clear contamination signatures.',
    tag: 'EVAL METHODOLOGY',
    file: '/papers/Letter_Shuffle_Contamination_Probe.html',
    gated: true,
    date: 'Apr 2026',
    readTime: '10 min',
    pullQuote: 'If a model scores 88% on a benchmark and 80% on the same benchmark with letters scrambled, the gap is your contamination signal. Real reasoning is robust to surface form. Memorization is not.',
  },
  {
    title: 'Reproducible Local LLM Benchmarking',
    description: 'A four-level hierarchy and a working harness for getting reproducible inference numbers across hardware, drivers, and binary versions, validated on a 3-node cluster running 25 models.',
    tag: 'METHODOLOGY',
    file: '/papers/Reproducible_Local_LLM_Benchmarking.html',
    gated: true,
    date: 'Apr 2026',
    readTime: '13 min',
    pullQuote: 'Most published benchmark numbers are not reproducible because nobody locks the four things that actually matter: the model file, the binary, the host, and the timeout. Lock all four and the noise floor drops below half a point.',
  },
];

const ResearchPage = () => {
  const [gateModal, setGateModal] = useState<Paper | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // Modal a11y: Escape closes, focus moves to email input on open, restored on close.
  useEffect(() => {
    if (!gateModal) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setTimeout(() => emailInputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGateModal(null);
        setSubmitted(false);
        setEmail('');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lastFocusRef.current?.focus();
    };
  }, [gateModal]);

  const handleGatedDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateModal) return;

    const FORMSPREE_ID = 'xlgalpdy';
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          paper: gateModal.title,
          source: 'research_page_gate',
          _subject: `New lead: ${gateModal.title}`,
        }),
      });
    } catch (err) {
      console.error('Lead capture failed:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      window.open(gateModal.file, '_blank');
      setGateModal(null);
      setSubmitted(false);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="pt-28">
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Research
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Insights from{' '}
            <span className="text-gradient">the field.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6">
            Practical research on enterprise AI, what works, what doesn’t, and what we have learned from real deployments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-40px' }}
          className="glass rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-12"
        >
          <div className="font-mono text-[10px] tracking-widest text-[#C87533] uppercase mb-3">
            The thesis
          </div>
          <p className="text-sm md:text-[15px] text-text-secondary leading-relaxed">
            Two-plus years studying production enterprise AI surfaced three failure modes
            most vendors won’t name: models hallucinate on domain-specific work, confidence
            scores don’t predict accuracy, and standard benchmarks measure recall of a familiar
            format more than reasoning. The papers below are the foundation of how we build
            and calibrate models that hold up in regulated environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto mb-20">
          {papers.map((paper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6 group hover:border-[#C87533]/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                <FileText size={22} className="text-indigo opacity-60" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{paper.title}</h3>
                  <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded bg-[#C87533]/10 text-[#C87533] border border-[#C87533]/20">
                    {paper.tag}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-[10px] tracking-widest text-text-muted uppercase">
                  <span>{AUTHOR}</span>
                  <span aria-hidden className="text-text-muted/40">·</span>
                  <span>{paper.date}</span>
                  <span aria-hidden className="text-text-muted/40">·</span>
                  <span>{paper.readTime} read</span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-3">{paper.description}</p>

                <blockquote className="border-l-2 border-[#C87533]/40 pl-4 py-1 mb-4 text-[13px] italic text-text-secondary/90 leading-relaxed">
                  "{paper.pullQuote}"
                </blockquote>

                <div className="flex flex-wrap gap-3">
                  {paper.gated ? (
                    <button
                      onClick={() => setGateModal(paper)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo text-black rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(200,117,51,0.3)]"
                    >
                      <Lock size={12} />
                      Download · Free with Email
                    </button>
                  ) : (
                    <a
                      href={paper.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-xs font-semibold uppercase tracking-wide text-text-primary hover:border-[#C87533]/30 transition-all duration-300 cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      Read Online
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-text-secondary mb-6">
            Want to discuss how these ideas apply to your business?
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <AnimatePresence>
        {gateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="paper-modal-title"
            onClick={() => { setGateModal(null); setSubmitted(false); setEmail(''); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-elevated rounded-2xl p-8 md:p-10 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setGateModal(null); setSubmitted(false); setEmail(''); }}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close paper request dialog"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <>
                  <div className="text-3xl mb-4">📄</div>
                  <h3 id="paper-modal-title" className="text-xl font-bold mb-2">{gateModal.title}</h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Enter your work email and we will open the paper immediately. No spam, just research.
                  </p>
                  <form onSubmit={handleGatedDownload} className="space-y-4">
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        ref={emailInputRef}
                        type="email"
                        required
                        value={email}
                        aria-label="Work email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-text-primary focus:border-[#C87533]/40 focus:outline-none focus:ring-1 focus:ring-[#C87533]/20 transition-all duration-300 text-sm"
                        placeholder="you@company.com"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      Read Paper
                    </motion.button>
                  </form>
                  <p className="text-[11px] text-text-muted mt-4 text-center">
                    We will never share your email. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-4xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Opening your paper...</h3>
                  <p className="text-sm text-text-secondary">Check your new tab.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchPage;
