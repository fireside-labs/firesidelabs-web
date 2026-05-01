import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Spline runtime is ~200KB — defer until the Hero is actually rendered.
const FiresideEngine3D = lazy(() =>
  import('./FiresideEngine3D').then(m => ({ default: m.FiresideEngine3D }))
);

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="ambient-glow top-[-200px] left-[-100px]" style={{ background: '#C87533' }} />
      <div className="ambient-glow top-[30%] right-[-200px]" style={{ background: '#A85A20' }} />

      {/* 3D motion centerpiece — Fireside Engine architecture */}
      <Suspense fallback={null}><FiresideEngine3D /></Suspense>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-vanta/30 via-vanta/55 to-vanta pointer-events-none" />
      
      <div 
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

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

        {/* Headline — Broad positioning for all AI adoption stages */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] leading-[0.95] mb-8"
        >
          AI That Works.{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">
            On Your Terms.
          </span>
        </motion.h1>

        {/* Sub — business outcomes, not technical jargon */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We turn your biggest operational bottlenecks into AI-powered solutions —{' '}
          <span className="text-text-primary font-medium">
            built privately on your systems, so your data never leaves your control.
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
            { value: '100%', label: 'On-Premise' },
            { value: 'Zero', label: 'Cloud Exposure' },
            { value: 'Full', label: 'Ownership' },
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
