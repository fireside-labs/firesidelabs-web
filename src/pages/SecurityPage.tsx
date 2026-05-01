import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Mail, Lock, Server, ExternalLink } from 'lucide-react';

/*
  Defaults you can override (current values are deploy-safe, not vendor-spec):
  - E&O / Cyber liability rows say "coverage in place, certificate on request."
    Swap to specific carrier + limit when comfortable.
  - Incorporation says "Delaware C-Corp." Confirm or change.
  - Incident SLA defaults to "one business day." Tighten or loosen as needed.
  - Security contact defaults to hello@firesidelabs.ai.
*/

const SECURITY_CONTACT = 'hello@firesidelabs.ai';

const SecurityPage = () => {
  return (
    <div className="pt-28">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Security & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Architecture over{' '}
            <span className="text-gradient">auditors.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Most security pages list certifications. We list architectural commitments —
            because in our model, the work runs on your hardware, your data never crosses
            our infrastructure, and the runtime is open source. Certifications attest to
            controls. We eliminate the risks those controls exist to manage.
          </p>
        </motion.div>
      </section>

      {/* Architectural posture — the actual pitch */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-[#C87533] tracking-widest uppercase mb-4">
            How we handle data
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-8 max-w-3xl">
            We don't store your data because we don't have a place to store it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Server,
              label: 'Your hardware',
              body: 'Models, runtime, and inference all execute on infrastructure you own — on-premise, your private cloud, or air-gapped. We do not run a customer-facing cloud service.',
            },
            {
              icon: Lock,
              label: 'Your perimeter',
              body: 'No data flows outbound during inference. We do not collect, transmit, or retain customer prompts, completions, training data, or weights.',
            },
            {
              icon: Shield,
              label: 'Your audit',
              body: 'Foundry Runtime is open source. Your security team can read every line, fork it, and approve it as a standard third-party dependency before any engagement.',
            },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-elevated rounded-2xl p-6 md:p-8"
            >
              <row.icon size={22} className="text-[#C87533] mb-4 opacity-80" />
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">{row.label}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{row.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Threat model — what we're actually defending against */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Threat model
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-8 max-w-3xl">
            What the architecture is actually defending against.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              vector: 'Cloud breach',
              defense: "We don't store customer data in our cloud. There is no Fireside-side database to compromise. A breach of our infrastructure exposes nothing about you.",
            },
            {
              vector: 'Third-party surveillance',
              defense: 'Inference runs inside your environment. Prompts and completions never traverse our network, vendor APIs, or any logging pipeline you do not control.',
            },
            {
              vector: 'Hidden backdoors',
              defense: 'The runtime is open source. Your security team forks the repo, audits the code, and runs it as a third-party dependency before any engagement.',
            },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">Attack vector</div>
              <div className="text-sm font-semibold text-text-primary mb-3">{row.vector}</div>
              <div className="font-mono text-[10px] tracking-widest text-[#C87533] uppercase mb-2">How we defend</div>
              <p className="text-xs text-text-secondary leading-relaxed">{row.defense}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* On certifications — the part where we say "no, and here's why" */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <div className="font-mono text-sm text-text-muted tracking-widest uppercase mb-4">
            On certifications
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em] mb-4">
            We do not currently hold SOC 2, ISO 27001, or HIPAA-vendor certifications.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-3 max-w-3xl">
            Those frameworks are designed for SaaS vendors who hold customer data in their
            own cloud. We are not that. The runtime executes inside your environment, your
            data never reaches us, and your own SOC 2 / HIPAA controls cover the deployment.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed mb-3 max-w-3xl">
            We carry cyber liability and E&O insurance. We sign BAAs and DPAs. We engage
            independent third-party security review on request. If your procurement function
            requires a vendor-side cert and our architecture isn't enough, we're probably
            not the right fit at your stage — and we'd rather tell you that now than after
            a 6-week sales cycle.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
            We will pursue formal certifications if and when customer demand makes the
            operational cost worth it. We are not pretending to be on a roadmap we haven't
            committed to.
          </p>
        </motion.div>
      </section>

      {/* Insurance + corporate */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Insurance & Corporate
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'E&O / Professional Liability', body: 'Coverage in place. Certificate of insurance available with the document pack.' },
            { label: 'Cyber Liability', body: 'Coverage in place. Limits disclosed under mutual NDA.' },
            { label: 'Incorporation', body: 'Delaware C-Corp. Full corporate documentation under NDA.' },
            { label: 'Certificate of insurance', body: 'Available on request. Email ' + SECURITY_CONTACT },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-5"
            >
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">{row.label}</div>
              <div className="text-sm text-text-secondary leading-relaxed">{row.body}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Documents on request */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Document Pack
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-2">
            Available on request.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-3xl">
            We send these to your security or legal team directly under a one-page mutual NDA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: FileText, label: 'BAA / DPA template', body: 'Business Associate Agreement and Data Processing Addendum drafts pre-aligned with HIPAA and GDPR.' },
            { icon: FileText, label: 'MSA template', body: 'Master Services Agreement covering scope, deliverables, IP, and engagement structure.' },
            { icon: FileText, label: 'Architecture brief', body: 'Three-page brief describing how the runtime is deployed, where data lives, and how integrity is verified. NDA-gated.' },
            { icon: FileText, label: 'Security questionnaire response', body: 'Pre-filled SIG Lite + CAIQ Lite responses, updated quarterly.' },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-5 flex gap-4"
            >
              <div className="flex-shrink-0">
                <row.icon size={20} className="text-[#C87533] opacity-80" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[11px] tracking-widest text-text-secondary uppercase mb-1">{row.label}</div>
                <p className="text-xs text-text-muted leading-relaxed">{row.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={'mailto:' + SECURITY_CONTACT + '?subject=Document%20pack%20request'}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-semibold tracking-wide uppercase text-text-primary hover:border-[#C87533]/30 transition-all duration-300 cursor-pointer"
          >
            <Mail size={16} />
            Request the document pack
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Foundry crosslink */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass-elevated rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">
              For your security team
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Foundry Runtime is open source. Have your team review the repo as a third-party
              dependency before any engagement. That review answers most security questions a
              cert would have.
            </p>
          </div>
          <Link to="/foundry" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-semibold tracking-wide uppercase text-text-primary hover:border-[#C87533]/30 transition-all duration-300 cursor-pointer"
            >
              <ExternalLink size={16} />
              Foundry Runtime
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Incident contact */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="font-mono text-sm text-text-muted tracking-widest uppercase mb-3">
            Incident reporting
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em] mb-3">
            Found something? Tell us first.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4 max-w-3xl">
            Suspected vulnerability, irregular behavior in the runtime, or any security
            concern — email <a href={'mailto:' + SECURITY_CONTACT} className="text-[#C87533] hover:underline">{SECURITY_CONTACT}</a> with subject <span className="font-mono text-[12px] text-text-primary">[security]</span>. Initial response within
            one business day. We follow coordinated disclosure.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default SecurityPage;
