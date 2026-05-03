import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Code } from 'lucide-react';

const REPO_URL = 'https://github.com/fireside-labs/foundry-runtime';

export const FoundryBand = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="glass-elevated rounded-2xl px-8 md:px-12 py-12 md:py-14"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-copper uppercase mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-copper" />
              </span>
              For Engineers · Free & Open Source
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] leading-tight mb-4">
              Want to feel local AI before talking to us?
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
              Foundry Runtime is a signed Windows installer that runs LLMs entirely on your hardware.
              Download it, pick a model, and verify our pitch yourself. No call required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/foundry">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(200, 117, 51, 0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-6 py-3 bg-indigo text-black font-semibold rounded-xl
                             text-xs tracking-wide uppercase transition-all duration-300 cursor-pointer"
                >
                  <Cpu size={14} />
                  Test Foundry Runtime · Free
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-xs font-semibold tracking-wide uppercase text-text-primary cursor-pointer transition-all duration-300"
                >
                  <Code size={14} />
                  View Source
                </motion.button>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-mono text-[11px] tracking-widest uppercase text-text-muted md:min-w-[260px]">
            <div className="flex items-center gap-2.5">
              <Shield size={12} className="text-copper/60 flex-shrink-0" />
              <span>Signed · Microsoft Trusted</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Cpu size={12} className="text-copper/60 flex-shrink-0" />
              <span>CPU + GPU · Windows x64</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-px bg-copper/40 flex-shrink-0" />
              <span>20 MB · MIT + Apache-2.0</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-px bg-copper/40 flex-shrink-0" />
              <span>No telemetry · Audit-friendly</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
