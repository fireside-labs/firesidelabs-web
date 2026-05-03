import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Code, Download, Terminal, Shield, Cpu, FileCode, Copy, Check, Package } from 'lucide-react';

// v0.1.0 — signed MSI live on GitHub Releases.
const DOWNLOAD_URL = 'https://github.com/fireside-labs/foundry-runtime/releases/download/v0.1.0/Foundry.Runtime_0.1.0_x64_en-US.msi';
const REPO_URL = 'https://github.com/fireside-labs/foundry-runtime';
const RELEASES_URL = 'https://github.com/fireside-labs/foundry-runtime/releases';

const QUICKSTART = `# 1. Download Foundry Runtime v0.1.0 (signed Windows installer)
#    https://github.com/fireside-labs/foundry-runtime/releases/latest

# 2. Double-click the .msi to install. Verified Publisher: Jordan Nguyen.

# 3. Pick a model from the catalog on first launch — Foundry downloads
#    a GGUF into ~/.foundry/models/ and starts the local inference server.

# 4. Point any OpenAI-compatible client at the local endpoint:
curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "local", "messages": [{"role":"user","content":"..."}]}'`;

const FoundryPage = () => {
  const [copied, setCopied] = useState(false);

  const copyQuickstart = async () => {
    try {
      await navigator.clipboard.writeText(QUICKSTART);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error('clipboard write failed', e);
    }
  };

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
            Foundry Runtime
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Run our models on{' '}
            <span className="text-gradient">your hardware.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            Foundry Runtime is our open-source taste-tester. Download it, run a local model
            on your laptop in five minutes, and feel what offline inference is like before
            you ask us to build something serious for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
              >
                <Download size={18} />
                Download for Windows
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-semibold tracking-wide uppercase text-text-primary hover:border-[#C87533]/30 transition-all duration-300 cursor-pointer">
              <Code size={16} />
              View on GitHub
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-6 font-mono text-[10px] tracking-widest text-text-muted uppercase">
            <span>v0.1.0 · Windows x64</span>
            <span aria-hidden className="text-text-muted/40">·</span>
            <span>20 MB · Signed</span>
            <span aria-hidden className="text-text-muted/40">·</span>
            <span>Built on llama.cpp</span>
          </div>
        </motion.div>
      </section>

      {/* Why this exists */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass-elevated rounded-3xl p-8 md:p-12"
        >
          <div className="font-mono text-sm text-[#C87533] tracking-widest uppercase mb-4">
            What this is
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-6 max-w-3xl">
            A sandbox to feel local inference. Not the model that closes your deals.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">01 / Try local inference</div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Run a stock open-weights model on your hardware. Get a feel for offline
                inference, the API surface, and what local-only AI looks like in practice.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">02 / Audit the floor</div>
              <p className="text-sm text-text-secondary leading-relaxed">
                The runtime is open source. Your security team can read it, fork it, and
                approve it like any other dependency before you ever talk to us.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">03 / What it isn't</div>
              <p className="text-sm text-text-secondary leading-relaxed">
                It isn't the model that beats your incumbent vendor on accuracy. That's a
                custom build — domain-tuned, calibrated, your data, your hardware. Talk to
                us when you're ready.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quickstart */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Quickstart
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-6">
            Inference, locally, in three commands.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="glass-elevated rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-text-muted uppercase">
              <Terminal size={12} />
              shell
            </div>
            <button
              onClick={copyQuickstart}
              className="flex items-center gap-2 px-3 py-1 rounded-md font-mono text-[10px] tracking-widest uppercase text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="px-6 py-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-text-primary"><code>{QUICKSTART}</code></pre>
        </motion.div>

        <p className="font-mono text-[11px] text-text-muted mt-3 text-center">
          Full docs in the{' '}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-[#C87533] hover:underline">
            GitHub repo
          </a>
          {' · '}
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="text-[#C87533] hover:underline">
            All releases
          </a>
        </p>
      </section>

      {/* Hardware support */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            Hardware
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-6">
            Runs where you already run.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Cpu, label: 'NVIDIA', body: 'H100, A100, L40S, RTX 4090. CUDA 12+, optional TensorRT acceleration.' },
            { icon: Cpu, label: 'Apple Silicon', body: 'M2 Pro, M3, M4. Metal-backed inference. Quantized models fit in unified memory.' },
            { icon: Cpu, label: 'AMD', body: 'MI300X / MI250 via ROCm. Datacenter-class instances supported.' },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <row.icon size={20} className="text-[#C87533] mb-3 opacity-80" />
              <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">{row.label}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{row.body}</p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
            What's in the box
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-6">
            A runtime, not a wrapper.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Package, label: 'Inference engine', body: 'Local-inference engine built on top of llama.cpp — the open-source local-inference stack — with optimizations for quantization, tensor-parallel scheduling, and KV-cache reuse.' },
            { icon: FileCode, label: 'OpenAI-compatible API', body: 'Drop-in /v1/completions and /v1/chat/completions endpoints. Your existing client code works.' },
            { icon: Shield, label: 'Audit log', body: 'Every prompt, every completion, hashed and signed. Tamper-evident, exportable to your SIEM.' },
            { icon: Terminal, label: 'Eval harness', body: 'The same evaluation tooling we use to benchmark models. Run it on your own held-out tasks.' },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 flex gap-4"
            >
              <div className="flex-shrink-0">
                <row.icon size={20} className="text-[#C87533] opacity-80" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-1">{row.label}</div>
                <p className="text-sm text-text-secondary leading-relaxed">{row.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust crosslink */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-2">
              The actual product
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Foundry Runtime gets you to "yes, local AI is real on my hardware." It doesn't
              get you to "yes, this AI is good at my job." That's a calibration engagement —
              domain-tuned, benchmarked against your real tasks, deployed on your environment.
            </p>
          </div>
          <Link to="/calibration" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-semibold tracking-wide uppercase text-text-primary hover:border-[#C87533]/30 transition-all duration-300 cursor-pointer"
            >
              <Flame size={16} />
              See Calibration
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4">
            Want help wiring it into your stack?
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            We do calibration engagements on top of Foundry Runtime — fixing
            domain-specific accuracy on the model you've already trained.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 117, 51, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase transition-all duration-300 glow-indigo cursor-pointer"
            >
              <Flame size={18} />
              Have a Fireside
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default FoundryPage;
