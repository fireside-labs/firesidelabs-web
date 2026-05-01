import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';

// Currently unused. When the Foundry Runtime binary is published, point this at
// the real download URL and re-import VerifyCallout from the relevant page.
const FOUNDRY_DOWNLOAD_URL = '/contact';

export const VerifyCallout = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-50px' }}
        className="border-t border-b border-white/5 py-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <Terminal size={18} className="text-copper/60 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase mb-1">
                For Engineers — Run It On Your Hardware
              </div>
              <div className="text-sm text-text-secondary">
                The Foundry Runtime is a free local-inference launcher. It is not a Fireside Labs service.
              </div>
            </div>
          </div>
          <a
            href={FOUNDRY_DOWNLOAD_URL}
            className="group inline-flex items-center gap-2 font-mono text-xs text-copper tracking-widest uppercase
                       hover:text-text-primary transition-colors whitespace-nowrap"
          >
            Download The Free Runtime
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
