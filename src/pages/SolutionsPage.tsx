import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { FlowDiagram } from '../components/FlowDiagram';
import { PerimeterDiagram } from '../components/PerimeterDiagram';
import type { FlowNode } from '../components/FlowDiagram';

interface Solution {
  title: string;
  emoji: string;
  problem: string;
  description: string;
  diagram: FlowNode[];
  feedbackLoop?: boolean;
  industries: { icon: string; name: string; useCase: string }[];
}

const solutions: Solution[] = [
  {
    title: 'Conversation Intelligence',
    emoji: '🎙️',
    problem: 'Your team handles hundreds of calls a day. You have no idea what\'s being said, which ones are going well, and which ones are costing you money.',
    description: 'We build systems that automatically analyze every conversation and surface what matters — coaching gaps, compliance risks, missed revenue.',
    diagram: [
      { label: 'Calls', icon: '📞' },
      { label: 'Transcription', icon: '📝' },
      { label: 'Fireside Engine', icon: '🔥', isEngine: true },
      { label: 'Insights', icon: '📊' },
    ],
    industries: [
      { icon: '🏥', name: 'Healthcare', useCase: 'Ensure every patient call follows compliance protocols' },
      { icon: '⚖️', name: 'Legal', useCase: 'Know which intake calls are losing potential clients — and why' },
      { icon: '💰', name: 'Financial Services', useCase: 'Monitor advisor conversations for regulatory exposure' },
      { icon: '📞', name: 'Sales Teams', useCase: 'Find the exact moment qualified leads disengage' },
    ],
  },
  {
    title: 'Content Automation',
    emoji: '🎬',
    problem: 'Your marketing team spends hours manually producing each piece of content. Editing, approvals, and rendering bottleneck everything.',
    description: 'We build platforms that let non-technical staff produce professional content in minutes — with AI-powered voice, intelligent media search, and automated rendering.',
    diagram: [
      { label: 'Brief', icon: '🎯' },
      { label: 'Voice + Media', icon: '🎤' },
      { label: 'Fireside Engine', icon: '🔥', isEngine: true },
      { label: 'Final Content', icon: '🎬' },
    ],
    industries: [
      { icon: '📢', name: 'Marketing Teams', useCase: 'Produce campaign videos without waiting on agencies' },
      { icon: '🏢', name: 'Corporate Comms', useCase: 'Create internal training materials in minutes, not weeks' },
      { icon: '🎓', name: 'Education', useCase: 'Generate lecture content with consistent quality and branding' },
    ],
  },
  {
    title: 'Visual Intelligence & Search',
    emoji: '🔍',
    problem: 'Your team manually digs through massive image or document libraries — millions of files. It takes hours. Results are inconsistent.',
    description: 'We make your entire visual archive searchable by description and add predictive simulation to show outcomes before they happen.',
    diagram: [
      { label: '3M+ Images', icon: '📸' },
      { label: '"Describe it..."', icon: '💬' },
      { label: 'Fireside Engine', icon: '🔥', isEngine: true },
      { label: 'Instant Results', icon: '⚡' },
    ],
    industries: [
      { icon: '🏗️', name: 'Construction', useCase: 'Search inspection photos by defect type or location' },
      { icon: '🏥', name: 'Healthcare', useCase: 'Find matching case images instantly by description' },
      { icon: '🛍️', name: 'Retail', useCase: 'Search product photography by color, style, or attribute' },
      { icon: '📋', name: 'Insurance', useCase: 'Pull relevant claim photos in seconds, not hours' },
    ],
  },
  {
    title: 'Self-Learning Knowledge Hub',
    emoji: '🧠',
    problem: 'Your team is drowning in repetitive questions. The same answers get typed out hundreds of times a week. New hires take months to ramp up.',
    description: 'We build AI assistants that learn from your own documents, draft responses automatically, and get smarter with every human correction.',
    diagram: [
      { label: 'Question', icon: '💬' },
      { label: 'AI Draft', icon: '🤖' },
      { label: 'Human Review', icon: '✅' },
      { label: 'Knowledge Base', icon: '🧠' },
    ],
    feedbackLoop: true,
    industries: [
      { icon: '🏥', name: 'Healthcare Ops', useCase: 'AI-drafted clinical responses that improve with nurse feedback' },
      { icon: '⚖️', name: 'Legal Operations', useCase: 'Instant answers on procedures, precedents, and filing requirements' },
      { icon: '🎧', name: 'Customer Support', useCase: 'Deflect repetitive tickets with answers trained on your docs' },
      { icon: '👥', name: 'HR / Onboarding', useCase: 'New hire questions answered instantly from the employee handbook' },
    ],
  },
  {
    title: 'Asset Indexing & Discovery',
    emoji: '📂',
    problem: 'You have years of unstructured files — documents, videos, records — scattered across systems. Finding anything specific takes hours of digging.',
    description: 'We index your entire library and make it instantly searchable by content, meaning, or metadata — turning chaos into a structured knowledge base.',
    diagram: [
      { label: 'Unstructured Files', icon: '📂' },
      { label: 'Indexing', icon: '🏷️' },
      { label: 'Fireside Engine', icon: '🔥', isEngine: true },
      { label: 'Instant Discovery', icon: '🔍' },
    ],
    industries: [
      { icon: '🎬', name: 'Media Libraries', useCase: 'Search hours of video footage by what\'s happening on screen' },
      { icon: '⚖️', name: 'Legal Discovery', useCase: 'Find relevant evidence across millions of documents in minutes' },
      { icon: '🏛️', name: 'Records Management', useCase: 'Digitize and structure decades of institutional knowledge' },
    ],
  },
  {
    title: 'Document Intelligence',
    emoji: '📄',
    problem: 'Your team manually reads through contracts, filings, or reports to extract the data they need. It\'s slow, error-prone, and doesn\'t scale.',
    description: 'We build systems that automatically read, understand, and extract structured data from your documents — turning pages into actionable insights.',
    diagram: [
      { label: 'Documents', icon: '📄' },
      { label: 'Extraction', icon: '🔬' },
      { label: 'Fireside Engine', icon: '🔥', isEngine: true },
      { label: 'Structured Data', icon: '📊' },
    ],
    industries: [
      { icon: '⚖️', name: 'Legal', useCase: 'Extract key terms, dates, and obligations from contracts automatically' },
      { icon: '📋', name: 'Insurance', useCase: 'Process claims documents and flag anomalies at scale' },
      { icon: '💰', name: 'Finance', useCase: 'Structure data from filings, audits, and compliance reports' },
    ],
  },
];

const SolutionsPage = () => {
  return (
    <div className="pt-28">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            What We Build
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            We don't sell software.{' '}
            <span className="text-gradient">We build AI for you.</span>
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mb-6 font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
            <span>2+ Years Original Research</span>
            <span aria-hidden className="text-text-muted/40">·</span>
            <span>50+ Models Benchmarked</span>
            <span aria-hidden className="text-text-muted/40">·</span>
            <span>Production-Grade Eval Harness</span>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Sometimes that's a domain-tuned model built from scratch. Sometimes it's calibrating
            the model you already have. Sometimes it's benchmarking your stack so you know what's
            actually working. Sometimes it's a full platform on your hardware. We start with your
            problem, your data, and your environment — and build what fits. Nothing off-the-shelf.
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed mt-6 font-mono tracking-wide">
            Below: patterns we've built before. Yours will be different.
          </p>
        </motion.div>

        {/* Perimeter Diagram — your data stays in, only queries/answers cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase text-center mb-6">
            How Fireside Sits In Your Stack
          </div>
          <PerimeterDiagram />
        </motion.div>
      </section>

      {/* Solution Cards */}
      <section className="max-w-6xl mx-auto px-6 space-y-16 pb-32">
        {solutions.map((solution, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="glass-elevated rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 md:px-12 pt-10 pb-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{solution.emoji}</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{solution.title}</h2>
              </div>

              {/* Problem + Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-warning uppercase mb-2">The Problem</div>
                  <p className="text-text-secondary text-sm leading-relaxed">{solution.problem}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-success uppercase mb-2">What We Build</div>
                  <p className="text-text-secondary text-sm leading-relaxed">{solution.description}</p>
                </div>
              </div>
            </div>

            {/* Flow Diagram */}
            <div className="px-8 md:px-12 py-6 bg-white/[0.01] border-y border-white/5">
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-4 text-center">
                How It Works
              </div>
              <FlowDiagram nodes={solution.diagram} feedbackLoop={solution.feedbackLoop} />
            </div>

            {/* Industries */}
            <div className="px-8 md:px-12 py-8">
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-4">
                Who Uses This
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {solution.industries.map((ind, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-lg flex-shrink-0">{ind.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{ind.name}</div>
                      <div className="text-xs text-text-muted">{ind.useCase}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(200, 117, 51, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-6 py-3 bg-indigo text-black font-semibold rounded-xl
                             text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
                >
                  <Flame size={16} />
                  Have a Fireside about {solution.title}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default SolutionsPage;
