import { motion } from 'framer-motion';

/**
 * LogoStrip — vendor-compatibility band.
 *
 * Original version used single-letter placeholders that read as wrapper-startup amateur.
 * We avoid imitated vendor wordmarks (trademark risk + no press-kit usage rights). Instead
 * we use a typographic compatibility band: vendor names set in monospaced small caps,
 * separated by hairline dividers. Reads as a confident statement of fact rather than
 * borrowed brand equity.
 */

const VENDORS = ['NVIDIA', 'AWS', 'AZURE', 'DATABRICKS', 'SNOWFLAKE'];

export const LogoStrip = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="text-center mb-8">
        <p className="font-mono text-[11px] text-text-muted tracking-[0.28em] uppercase">
          Runs on the infrastructure you already trust
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-y-3">
        {VENDORS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <span className="font-mono text-[13px] md:text-sm tracking-[0.18em] text-text-secondary px-5 md:px-7 select-none cursor-default transition-colors duration-300 hover:text-text-primary">
              {name}
            </span>
            {i < VENDORS.length - 1 && (
              <span className="hidden md:inline-block w-px h-3 bg-white/10" aria-hidden />
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="font-mono text-[10px] text-text-muted/70 tracking-[0.2em] uppercase">
          On-premise · Private cloud · Air-gapped
        </p>
      </div>
    </motion.section>
  );
};
