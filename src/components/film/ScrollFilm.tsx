import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Flame, Hammer, SlidersHorizontal, Compass, FileText, ShieldCheck, MessagesSquare } from 'lucide-react';
import { MotionLink } from '../MotionLink';
import { SceneVideo } from './SceneVideo';
import { CountUp } from './CountUp';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Scene 1 — Open ───────────────────────────────────────────── */

const SceneOpen = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <SceneVideo base="/film/scene1_hearth" priority />
    {/* Legibility scrim + hand-off into the vanta page background */}
    <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta/60 via-vanta/45 to-vanta pointer-events-none" />

    <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24 pb-32">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="font-display text-6xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] mb-8"
      >
        AI that <span className="text-gradient italic">pays back.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Fireside Labs is an AI studio for mid-market operators.{' '}
        <span className="text-text-primary font-medium">
          We find the places AI actually returns money in your business. Then we build it,
          deploy it, and measure it.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <MotionLink
          to="/contact"
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl
                     text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
        >
          <Flame size={18} />
          Have a Fireside
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </MotionLink>
        <MotionLink
          to="/work"
          whileHover={{ scale: 1.02, borderColor: 'rgba(200, 117, 51, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-8 py-4 glass rounded-xl text-sm font-semibold
                     tracking-wide uppercase text-text-primary transition-all duration-300 cursor-pointer"
        >
          See the work
        </MotionLink>
      </motion.div>
    </div>

    {/* Scroll cue */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-px h-8 bg-gradient-to-b from-indigo/60 to-transparent"
      />
    </motion.div>
  </section>
);

/* ── Scene 2 — The problem (scroll-scrubbed) ──────────────────── */

const SceneProblem = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const lineAOpacity = useTransform(scrollYProgress, [0.02, 0.12, 0.32, 0.4], [0, 1, 1, 0]);
  const lineAY = useTransform(scrollYProgress, [0.02, 0.12], [30, 0]);
  const lineBOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const lineBY = useTransform(scrollYProgress, [0.42, 0.52], [30, 0]);
  const supportOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <SceneVideo base="/film/scene2_network" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta via-vanta/50 to-vanta pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Plain wrapper does the static centering; framer-motion owns the inner
              transform, so a class-based -translate-y-1/2 on the motion element
              would be overwritten. */}
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
            <motion.h2
              style={{ opacity: lineAOpacity, y: lineAY }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
            >
              Everyone is selling you AI.
            </motion.h2>
          </div>
          <motion.h2
            style={{ opacity: lineBOpacity, y: lineBY }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-8"
          >
            Nobody is telling you{' '}
            <span className="text-gradient italic">where it pays.</span>
          </motion.h2>
          <motion.p
            style={{ opacity: supportOpacity }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Demos are cheap. In operations, a model either moves a number or it&apos;s theater.
            <span className="block mt-3 font-mono text-sm tracking-widest text-indigo uppercase">
              Cost · Hours · No-shows · Working capital
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

/* ── Scene 3 — The discipline + pillars ───────────────────────── */

const PILLARS = [
  {
    icon: Compass,
    title: 'AI Strategy & Build',
    body: 'From "where do we even start" to a deployed system that pays for itself. Whatever the right tool is for the actual problem: a private LLM, a forecasting model, a vision pipeline.',
    tag: 'From problem to production',
  },
  {
    icon: SlidersHorizontal,
    title: 'Precision Calibration',
    body: 'Already have AI that underperforms? We diagnose exactly what is failing and fix it, without starting over and without disrupting your workflows.',
    tag: 'Fix without starting over',
  },
  {
    icon: Hammer,
    title: 'Embedded Architect',
    body: 'AI leadership on demand. We sit inside your organization, on your side of the table, and handle the technology so your people can run the business.',
    tag: 'Your AI team, on demand',
  },
];

const SceneDiscipline = () => (
  <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SceneVideo base="/film/scene3_forge" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta via-vanta/50 to-vanta pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6"
        >
          The discipline
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true, margin: '-20% 0px' }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-8"
        >
          The tools changed.{' '}
          <span className="text-gradient italic">The discipline didn&apos;t.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          viewport={{ once: true, margin: '-20% 0px' }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          A decade of applying models to P&amp;L. Regression and K-means then. LLMs and vision models now.
          <span className="text-text-primary font-medium">
            {' '}The right model for the actual problem, deployed where it pays back, measured in
            outcomes.
          </span>
        </motion.p>
      </div>
    </section>

    <section className="relative max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-3 gap-6">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="glass rounded-2xl p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-dim flex items-center justify-center mb-6">
              <pillar.icon size={22} className="text-indigo" />
            </div>
            <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
            <p className="text-text-secondary leading-relaxed mb-6 flex-1">{pillar.body}</p>
            <div className="pt-4 border-t border-white/5 font-mono text-[11px] tracking-widest text-indigo/80 uppercase">
              {pillar.tag}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </>
);

/* ── Scene 4 — Proof ──────────────────────────────────────────── */

const OUTCOMES = [
  {
    value: 1.1,
    format: (n: number) => `$${n.toFixed(1)}M`,
    label: 'Annual cost reduction',
    detail: 'Process redesign, national health insurer',
  },
  {
    value: 8,
    format: (n: number) => `$${Math.round(n)}M`,
    label: 'Working capital unlocked',
    detail: 'Predictive models, transportation & logistics',
  },
  {
    value: 13,
    format: (n: number) => `${Math.round(n)}%`,
    label: 'Fewer no-shows',
    detail: 'Cancellation modeling, multi-location healthcare operator',
  },
];

const SceneProof = () => (
  <section className="relative max-w-6xl mx-auto px-6 py-32">
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6"
      >
        The record
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true }}
        className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
      >
        Measured in <span className="text-gradient italic">P&amp;L.</span>
      </motion.h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-20">
      {OUTCOMES.map((outcome, i) => (
        <motion.div
          key={outcome.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="glass rounded-2xl p-8 text-center"
        >
          <CountUp
            value={outcome.value}
            format={outcome.format}
            className="block font-mono text-5xl md:text-6xl font-bold text-gradient mb-4"
          />
          <div className="text-text-primary font-semibold mb-2">{outcome.label}</div>
          <div className="text-sm text-text-muted">{outcome.detail}</div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true }}
      className="glass-elevated rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-dim flex items-center justify-center shrink-0">
        <FileText size={22} className="text-indigo" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1">We publish what we learn.</h3>
        <p className="text-text-secondary leading-relaxed">
          20+ papers of original research, including{' '}
          <span className="text-text-primary font-medium">
            &ldquo;Do You Actually Need a Cloud API?&rdquo;
          </span>
          , a 100-task benchmark showing local 14B models reach parity with Google&apos;s
          production cloud tier on tool-routing.
        </p>
      </div>
      <MotionLink
        to="/research"
        whileHover={{ scale: 1.02, borderColor: 'rgba(200, 117, 51, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        className="shrink-0 flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-semibold
                   tracking-wide uppercase text-text-primary transition-all duration-300 cursor-pointer"
      >
        Read the research
        <ArrowRight size={15} />
      </MotionLink>
    </motion.div>
  </section>
);

/* ── Scene 5 — Close ──────────────────────────────────────────── */

const SceneClose = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <SceneVideo base="/film/scene5_fireside" />
    <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta via-vanta/55 to-vanta/85 pointer-events-none" />

    <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        viewport={{ once: true, margin: '-20% 0px' }}
        className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-8"
      >
        Have a <span className="text-gradient italic">Fireside.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        viewport={{ once: true, margin: '-20% 0px' }}
        className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed"
      >
        15 minutes. No pitch. No deck. Tell us what&apos;s costing you time and money, and
        we&apos;ll tell you honestly if AI can fix it, and what it would pay back.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        viewport={{ once: true, margin: '-20% 0px' }}
      >
        <MotionLink
          to="/contact"
          whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(200, 117, 51, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-indigo text-black font-bold rounded-xl
                     text-base tracking-wide uppercase transition-all duration-300 glow-indigo-strong cursor-pointer"
        >
          <Flame size={20} />
          Have a Fireside
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </MotionLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        className="mt-14 flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center text-text-muted text-sm"
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
          <MessagesSquare size={16} className="text-indigo/60" />
          Straight answers
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── The film ─────────────────────────────────────────────────── */

export const ScrollFilm = () => (
  <>
    <SceneOpen />
    <SceneProblem />
    <SceneDiscipline />
    <SceneProof />
    <SceneClose />
  </>
);
