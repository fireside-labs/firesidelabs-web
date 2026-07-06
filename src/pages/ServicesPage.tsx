import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Compass,
  SlidersHorizontal,
  Hammer,
  PhoneCall,
  ScanText,
  TrendingUp,
  CalendarX,
  Bot,
  ShieldCheck,
} from 'lucide-react';
import { PerimeterDiagram } from '../components/PerimeterDiagram';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: Compass,
    kicker: 'Starting from zero',
    title: 'AI Strategy & Build',
    lead: 'You know AI should be doing something for your business. You want a straight answer about what, where, and what it returns.',
    body: 'We start with your operations, your data, and your constraints. Then we identify the highest-payback opportunity and build the system that captures it. Sometimes a private LLM. Sometimes a forecasting model. Sometimes OCR running on a Mac mini in the closet. The right tool for the actual problem.',
    proof: 'From problem to production',
  },
  {
    icon: SlidersHorizontal,
    kicker: 'Fixing what you have',
    title: 'Precision Calibration',
    lead: 'You already invested in AI and the results are underwhelming. Vendors want you to start over. You should not have to.',
    body: 'We diagnose exactly where your existing system fails: which inputs, which cases, which conditions. Then we fix those failures with precision, without ripping out what works and without disrupting the workflows your team already knows.',
    proof: 'Fix without starting over',
  },
  {
    icon: Hammer,
    kicker: 'Ongoing leadership',
    title: 'Embedded Architect',
    lead: 'You need AI leadership without hiring a full team. Someone technical, on your side of the table, accountable to your outcomes.',
    body: 'We embed with your organization on a retained basis: evaluating vendors, designing systems, steering builds, and translating between what the business needs and what the technology can actually do.',
    proof: 'Your AI team, on demand',
  },
];

const PATTERNS = [
  { icon: PhoneCall, label: 'Call analysis', detail: 'Every customer call scored, tagged, and searchable' },
  { icon: ScanText, label: 'Document intelligence', detail: 'OCR and extraction pipelines for paperwork-heavy operations' },
  { icon: TrendingUp, label: 'Forecasting', detail: 'Demand, cash, and capacity models that plan ahead of the curve' },
  { icon: CalendarX, label: 'No-show prediction', detail: 'Cancellation modeling that protects utilization' },
  { icon: Bot, label: 'Private LLM deployment', detail: 'Language models running on your hardware, on your data' },
  { icon: ShieldCheck, label: 'Model evaluation', detail: 'Benchmarking your stack so you know what actually works' },
];

const ServicesPage = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6"
        >
          Services
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.02] mb-8"
        >
          Three ways <span className="text-gradient italic">in.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
        >
          Starting from zero, fixing what you have, or bringing AI leadership into the room.
          Every engagement starts with the same question: where does AI actually pay back in
          your business?
        </motion.p>
      </div>

      {/* Service sections */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8 mb-28">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-dim flex items-center justify-center shrink-0">
              <service.icon size={26} className="text-indigo" />
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.3em] text-indigo/80 uppercase mb-3">
                {service.kicker}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-text-primary font-medium leading-relaxed mb-4">{service.lead}</p>
              <p className="text-text-secondary leading-relaxed mb-6">{service.body}</p>
              <div className="pt-4 border-t border-white/5 font-mono text-[11px] tracking-widest text-indigo/80 uppercase">
                {service.proof}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Patterns we've built */}
      <div className="max-w-6xl mx-auto px-6 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Patterns we&apos;ve built before
          </h2>
          <p className="text-text-secondary font-mono text-sm">
            Yours will be different. These are starting points, and evidence.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATTERNS.map((pattern, i) => (
            <motion.div
              key={pattern.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              viewport={{ once: true, margin: '-5% 0px' }}
              className="glass rounded-xl p-6 flex items-start gap-4"
            >
              <pattern.icon size={20} className="text-indigo shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">{pattern.label}</div>
                <div className="text-sm text-text-muted leading-relaxed">{pattern.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust / data boundary */}
      <div id="trust" className="max-w-6xl mx-auto px-6 mb-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6">
            Your data stays yours
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-6">
            Built inside your perimeter.
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Most of what we build runs on your hardware or in your private cloud. Patient
            records, financials, customer calls: the sensitive data that makes these systems
            valuable never has to leave your control.
          </p>
          <p className="text-text-secondary leading-relaxed">
            That includes the Fireside itself. The first conversation requires zero access to
            your systems or your data.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <PerimeterDiagram />
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="glass-elevated rounded-3xl p-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Not sure which door is yours?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
            That&apos;s what the first conversation is for. Tell us what&apos;s costing you time
            and money, and we&apos;ll point you at the highest-payback move, even if it
            isn&apos;t us.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl
                         text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
