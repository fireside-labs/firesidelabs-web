import { motion } from 'framer-motion';
import { ArrowRight, ScanSearch, Compass, Wrench } from 'lucide-react';

const tiles = [
  {
    icon: ScanSearch,
    audience: 'For Evaluation Teams',
    title: 'Evaluate',
    body: 'Side-by-side accuracy benchmarks on your own domain. Procurement-grade reports, signed and reproducible.',
    cta: 'Get A Benchmark Report',
    href: 'mailto:hello@firesidelabs.ai?subject=Benchmark%20Report%20Request',
  },
  {
    icon: Compass,
    audience: 'For CTOs Who Have To Be Right',
    title: 'Diagnose',
    body: "A 60-second Confidence Audit that maps exactly where your AI fails on your domain, without accessing your data or your model weights.",
    cta: "Find What's Failing",
    href: 'mailto:hello@firesidelabs.ai?subject=Confidence%20Audit%20Request',
  },
  {
    icon: Wrench,
    audience: 'For Teams With Data That Cannot Leave',
    title: 'Remediate',
    body: 'Domain Calibration tunes your model to your domain. Custom local-model deployment when you need privacy on hardware you control.',
    cta: 'Start Domain Calibration',
    href: 'mailto:hello@firesidelabs.ai?subject=Domain%20Calibration%20Engagement',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const HowWeEngage = () => {
  return (
    <section id="approach" className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16"
      >
        <div className="font-mono text-sm text-copper tracking-widest uppercase mb-4">
          How We Engage
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          Three ways in.<br />One outcome.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Each entry point is independent. Each ends with AI you'd put your name on.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiles.map((tile, i) => (
          <motion.a
            key={tile.title}
            href={tile.href}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group relative glass rounded-2xl p-8 flex flex-col gap-5 overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="font-mono text-[10px] text-text-muted tracking-[0.25em] uppercase">
              {tile.audience}
            </div>

            <div className="w-12 h-12 rounded-xl bg-copper-dim border border-copper/20 flex items-center justify-center
                            group-hover:bg-copper group-hover:border-copper transition-all duration-300">
              <tile.icon size={22} className="text-copper group-hover:text-black transition-colors duration-300" />
            </div>

            <h3 className="text-2xl font-semibold leading-tight">{tile.title}</h3>

            <p className="text-text-secondary text-sm leading-relaxed flex-grow">
              {tile.body}
            </p>

            <div className="pt-5 border-t border-white/5 flex items-center justify-between gap-2 font-mono text-xs text-copper tracking-wider">
              <span>{tile.cta}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
