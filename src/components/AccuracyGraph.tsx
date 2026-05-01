import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const AccuracyGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = 40;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = pad; x < w - pad; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, h - pad); ctx.stroke();
    }
    for (let y = pad; y < h - pad; y += 50) {
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke();
    }

    // Axis labels
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillText('TIME IN PRODUCTION →', w - pad - 120, h - pad + 25);
    ctx.save();
    ctx.translate(15, pad + 100);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('DOMAIN ACCURACY', 0, 0);
    ctx.restore();

    const plotW = w - pad * 2;
    const plotH = h - pad * 2;
    const calibrationX = pad + plotW * 0.4;

    // Uncalibrated model (orange) — accuracy decays over time
    ctx.beginPath();
    ctx.moveTo(pad, pad + 10);
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2;
    for (let i = 0; i <= plotW; i += 2) {
      const x = pad + i;
      const t = i / plotW;
      const decay = Math.pow(t, 1.8) * plotH * 0.85;
      const noise = Math.sin(i * 0.08) * 4 + Math.sin(i * 0.15) * 2;
      const y = pad + 10 + decay + noise;
      ctx.lineTo(x, Math.min(y, h - pad));
    }
    ctx.stroke();

    // Calibrated model (cyan — fixed color, always distinct from orange decay)
    ctx.beginPath();
    ctx.moveTo(pad, pad + 10);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 15;

    for (let i = 0; i <= plotW; i += 2) {
      const x = pad + i;
      const t = i / plotW;
      let y;
      if (x < calibrationX) {
        const decay = Math.pow(t, 1.8) * plotH * 0.85;
        const noise = Math.sin(i * 0.08) * 4 + Math.sin(i * 0.15) * 2;
        y = pad + 10 + decay + noise;
      } else if (x < calibrationX + 40) {
        const progress = (x - calibrationX) / 40;
        const decayAtPoint = Math.pow(0.4, 1.8) * plotH * 0.85;
        const startY = pad + 10 + decayAtPoint;
        const targetY = pad + 15;
        y = startY + (targetY - startY) * Math.pow(progress, 0.4);
      } else {
        y = pad + 15 + Math.sin(i * 0.05) * 1.5;
      }
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Calibration event line
    ctx.beginPath();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(calibrationX, pad);
    ctx.lineTo(calibrationX, h - pad);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('▼ CALIBRATION EVENT', calibrationX - 65, pad - 8);

  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16"
      >
        <div className="font-mono text-sm text-indigo tracking-widest uppercase mb-4">
          The Evidence
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
          Watch Accuracy Recover in Real Time
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          The orange line is an uncalibrated model drifting into domain failure. 
          The blue line is the same model after a single Fireside Labs calibration event.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="glass-elevated rounded-2xl overflow-hidden"
      >
        {/* Panel header — scrubbed of all internal details */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-6 font-mono text-xs tracking-wider">
            <span className="flex items-center gap-2 text-text-muted">
              <span className="w-2 h-2 rounded-full bg-warning" />
              UNCALIBRATED: <span className="text-warning font-semibold">ACCURACY FAILING</span>
            </span>
            <span className="flex items-center gap-2 text-text-muted">
              <span className="w-2 h-2 rounded-full bg-cyan" style={{ boxShadow: '0 0 8px rgba(56,189,248,0.4)' }} />
              POST-CALIBRATION: <span className="text-cyan font-semibold">RESTORED</span>
            </span>
          </div>
          <div className="font-mono text-[10px] text-text-muted tracking-widest">
            ENTERPRISE CLIENT /// DOMAIN: REDACTED
          </div>
        </div>

        {/* Canvas */}
        <div className="relative w-full h-[420px] bg-[#050508]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block"
          />
          
          {/* Floating HUD — shows outcomes, not internals */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-[44%] top-[20%] glass rounded-lg px-4 py-3 border-l-2 border-cyan"
          >
            <div className="font-mono text-[10px] text-cyan tracking-widest mb-1.5">CALIBRATION RESULT</div>
            <div className="font-mono text-[10px] text-text-muted">Accuracy Before: 62%</div>
            <div className="font-mono text-[10px] text-text-muted">Accuracy After: 99.9%</div>
            <div className="font-mono text-[10px] text-success mt-1">Status: VERIFIED</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Architecture brief link — for the CTO persona */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a href="#" className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text-secondary transition-colors">
          <span>Read the Architecture Brief</span>
          <span className="text-indigo">→</span>
        </a>
      </motion.div>
    </section>
  );
};
