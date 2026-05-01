import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="ambient-glow top-[-200px] left-[-100px]" style={{ background: '#C87533' }} />
      <div className="ambient-glow top-[30%] right-[-200px]" style={{ background: '#A85A20' }} />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta/30 via-vanta/55 to-vanta pointer-events-none" />

      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Asymmetric editorial gutter — copper rule + rotated specs label on left edge */}
      <div className="hidden md:flex absolute left-6 lg:left-10 top-0 bottom-0 z-[3] flex-col items-center justify-center pointer-events-none">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#C87533]/30 to-transparent" />
        <div
          className="font-mono text-[9px] tracking-[0.4em] text-[#C87533]/50 uppercase whitespace-nowrap py-4"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Fireside Labs · Spec V0.1 · Copper &amp; Obsidian
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#C87533]/30 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full glass border border-indigo/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo"></span>
          </span>
          <span className="font-mono text-xs tracking-widest text-indigo uppercase">
            Now accepting enterprise engagements
          </span>
        </motion.div>

        {/* Headline — Fraunces display, broad positioning for all AI adoption stages */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] mb-8"
        >
          AI That Works.{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient italic">
            On Your Terms.
          </span>
        </motion.h1>

        {/* Sub — flexibility-as-feature; deployment fits the data, not the other way around */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We turn your biggest operational bottlenecks into AI-powered solutions —{' '}
          <span className="text-text-primary font-medium">
            local, hybrid, or private cloud. We architect the AI to fit the data, not the other way around.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl 
                         text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          <Link to="/solutions">
            <motion.button
              whileHover={{ scale: 1.02, borderColor: 'rgba(200, 117, 51, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 glass rounded-xl text-sm font-semibold 
                         tracking-wide uppercase text-text-primary transition-all duration-300 cursor-pointer"
            >
              Our Solutions
            </motion.button>
          </Link>
        </motion.div>

        {/* Metrics — reframed for broader positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/5 flex justify-center gap-12 md:gap-20"
        >
          {[
            { value: 'Your', label: 'Domain' },
            { value: 'Your', label: 'Boundary' },
            { value: 'Your', label: 'AI' },
          ].map((m, i) => (
            <div key={i} className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-gradient font-mono">{m.value}</div>
              <div className="text-xs text-text-muted uppercase tracking-widest mt-1 font-mono">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
