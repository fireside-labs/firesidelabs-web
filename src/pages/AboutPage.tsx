import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, FileText, Briefcase } from 'lucide-react';
import { MotionLink } from '../components/MotionLink';

const EASE = [0.16, 1, 0.3, 1] as const;

const TIMELINE = [
  {
    era: 'Then',
    title: 'Regression and K-means',
    body: 'A decade of ML and statistics inside large operations: claims floors, scheduling desks, working-capital planning. The kind of rooms where a model that stops paying gets shut off, and the analyst answers for it.',
  },
  {
    era: 'Now',
    title: 'LLMs and vision models',
    body: 'The same discipline applied to the current generation of tools: private language-model deployments, vision pipelines, forecasting systems, and published research on exactly where these models break.',
  },
  {
    era: 'Always',
    title: 'The discipline',
    body: 'Pick the right model for the actual problem. Deploy it where it pays back. Measure the business outcome. Every engagement, no exceptions.',
  },
];

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6 text-center"
        >
          About
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.02] mb-10 text-center"
        >
          A decade of models that{' '}
          <span className="text-gradient italic">moved money.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed flex flex-col gap-6"
        >
          <p>
            Most AI consultants learned prompt engineering last year. I&apos;m Jordan Nguyen,
            and I&apos;ve been applying machine learning and statistics to real P&amp;L outcomes
            for a decade, inside operations where a model that doesn&apos;t pay back gets shut
            down.
          </p>
          <p>
            I run Fireside Labs, an AI studio. We help mid-market operators apply AI to the
            operations that actually matter. Sometimes that&apos;s a private LLM deployment.
            Sometimes a forecasting model. Sometimes an OCR system running on a Mac mini in the
            closet. Whatever the right tool is for your actual problem.
          </p>
          <p className="text-text-primary font-medium">
            The name is the method. The best decisions about technology get made the way they
            always have: in a straight, unhurried conversation by the fire.
          </p>
        </motion.div>
      </div>

      {/* Then / Now / Always */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.era}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="glass rounded-2xl p-8"
            >
              <div className="font-mono text-[11px] tracking-[0.35em] text-indigo uppercase mb-4">
                {item.era}
              </div>
              <h2 className="text-xl font-bold mb-4">{item.title}</h2>
              <p className="text-text-secondary leading-relaxed text-[15px]">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Receipts */}
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="glass-elevated rounded-2xl p-8"
          >
            <FileText size={22} className="text-indigo mb-4" />
            <h3 className="text-lg font-bold mb-3">I publish the research</h3>
            <p className="text-text-secondary leading-relaxed text-[15px] mb-5">
              20+ papers on where AI works, where it breaks, and what it costs. Read them
              before you hire anyone, including us.
            </p>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:gap-3 transition-all"
            >
              Read the research <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="glass-elevated rounded-2xl p-8"
          >
            <Briefcase size={22} className="text-indigo mb-4" />
            <h3 className="text-lg font-bold mb-3">The record is public</h3>
            <p className="text-text-secondary leading-relaxed text-[15px] mb-5">
              The outcomes are on the work page, measured in dollars and percentage points
              rather than testimonials.
            </p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:gap-3 transition-all"
            >
              See the work <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-8 leading-relaxed">
            If you run operations at a mid-market business and you&apos;re trying to figure out
            where AI actually pays back instead of where it&apos;s hyped, let&apos;s talk.
          </p>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl
                       text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
          >
            <Flame size={18} />
            Have a Fireside
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </MotionLink>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
