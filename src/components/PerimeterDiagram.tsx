import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const COPPER = '#C87533';
const COPPER_DIM = 'rgba(200, 117, 51, 0.20)';

interface Particle {
  kind: 'inflow' | 'outflow' | 'ambient';
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const INNER_GLYPHS = [
  { cx: 0.36, cy: 0.42, w: 0.10, h: 0.06 },
  { cx: 0.50, cy: 0.36, w: 0.08, h: 0.05 },
  { cx: 0.64, cy: 0.44, w: 0.10, h: 0.06 },
  { cx: 0.42, cy: 0.58, w: 0.08, h: 0.05 },
  { cx: 0.58, cy: 0.60, w: 0.09, h: 0.05 },
];

const BOUNDARY = { x: 0.28, y: 0.22, w: 0.44, h: 0.56, r: 0.04 };

export const PerimeterDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect prefers-reduced-motion: skip the canvas RAF loop. SVG boundary still renders statically.
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    const spawnInflow = (): Particle => {
      const targetY = BOUNDARY.y + Math.random() * BOUNDARY.h;
      const startY = targetY + (Math.random() - 0.5) * 0.06;
      return {
        kind: 'inflow',
        x: -0.05 * w(),
        y: startY * h(),
        vx: 0.6 + Math.random() * 0.3,
        vy: ((targetY - startY) / 60) * h() * 0.001 + (Math.random() - 0.5) * 0.05,
        life: 0,
        maxLife: 240,
        size: 1.2 + Math.random() * 1.2,
      };
    };

    const spawnOutflow = (): Particle => {
      const startY = BOUNDARY.y + Math.random() * BOUNDARY.h;
      return {
        kind: 'outflow',
        x: (BOUNDARY.x + BOUNDARY.w) * w(),
        y: startY * h(),
        vx: 0.7 + Math.random() * 0.3,
        vy: (Math.random() - 0.5) * 0.1,
        life: 0,
        maxLife: 240,
        size: 1.4 + Math.random() * 1.4,
      };
    };

    const spawnAmbient = (): Particle => {
      let x = 0, y = 0;
      for (let i = 0; i < 8; i++) {
        x = Math.random();
        y = Math.random();
        const inside = x > BOUNDARY.x && x < BOUNDARY.x + BOUNDARY.w && y > BOUNDARY.y && y < BOUNDARY.y + BOUNDARY.h;
        if (!inside) break;
      }
      return {
        kind: 'ambient',
        x: x * w(),
        y: y * h(),
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        life: 0,
        maxLife: 360 + Math.random() * 240,
        size: 0.8 + Math.random() * 0.9,
      };
    };

    for (let i = 0; i < 24; i++) {
      const p = spawnAmbient();
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }
    for (let i = 0; i < 4; i++) particlesRef.current.push(spawnInflow());
    for (let i = 0; i < 4; i++) particlesRef.current.push(spawnOutflow());

    const insideBoundary = (x: number, y: number) => {
      const ww = w();
      const hh = h();
      return x > BOUNDARY.x * ww && x < (BOUNDARY.x + BOUNDARY.w) * ww && y > BOUNDARY.y * hh && y < (BOUNDARY.y + BOUNDARY.h) * hh;
    };

    const draw = () => {
      const ww = w();
      const hh = h();
      ctx.clearRect(0, 0, ww, hh);

      const counts = { inflow: 0, outflow: 0, ambient: 0 };
      for (const p of particlesRef.current) counts[p.kind]++;
      while (counts.inflow < 5) {
        particlesRef.current.push(spawnInflow());
        counts.inflow++;
      }
      while (counts.outflow < 5) {
        particlesRef.current.push(spawnOutflow());
        counts.outflow++;
      }
      while (counts.ambient < 28) {
        particlesRef.current.push(spawnAmbient());
        counts.ambient++;
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.kind === 'ambient') {
          p.x += Math.sin(p.life * 0.015) * 0.15;
          p.y += Math.cos(p.life * 0.013) * 0.15;
        }

        const lifeRatio = p.life / p.maxLife;
        let opacity = 1;
        if (lifeRatio < 0.12) opacity = lifeRatio / 0.12;
        else if (lifeRatio > 0.75) opacity = (1 - lifeRatio) / 0.25;

        if (p.kind === 'inflow' && insideBoundary(p.x, p.y)) {
          const insideDepth = (p.x - BOUNDARY.x * ww) / (BOUNDARY.w * ww);
          opacity *= Math.max(0, 1 - insideDepth * 4);
        }

        if (p.kind === 'outflow' && !insideBoundary(p.x, p.y)) {
          const distOut = (p.x - (BOUNDARY.x + BOUNDARY.w) * ww) / (ww * 0.25);
          opacity *= Math.max(0, 1 - distOut);
        }

        if (p.life >= p.maxLife) return false;
        if (p.x < -30 || p.x > ww + 30 || p.y < -30 || p.y > hh + 30) return false;
        if (opacity <= 0.02) return false;

        let glowColor: string;
        if (p.kind === 'ambient') {
          glowColor = 'rgba(180,180,200,0.05)';
        } else {
          glowColor = COPPER_DIM;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowColor.replace(/[\d.]+\)$/, String(opacity * 0.18) + ')');
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.kind === 'ambient') {
          ctx.fillStyle = 'rgba(180,180,200,' + String(opacity * 0.5) + ')';
        } else {
          ctx.fillStyle = 'rgba(200,117,51,' + String(opacity * 0.85) + ')';
        }
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56.25" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="perim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COPPER} stopOpacity="0.45" />
              <stop offset="50%" stopColor={COPPER} stopOpacity="0.85" />
              <stop offset="100%" stopColor={COPPER} stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id="glyph-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={COPPER} stopOpacity="0.45" />
              <stop offset="100%" stopColor={COPPER} stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <motion.rect x={BOUNDARY.x * 100} y={BOUNDARY.y * 56.25} width={BOUNDARY.w * 100} height={BOUNDARY.h * 56.25} rx={BOUNDARY.r * 100} ry={BOUNDARY.r * 100} fill="rgba(200,117,51,0.025)" stroke="url(#perim-grad)" strokeWidth={0.18} initial={{ opacity: 0.5 }} animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
          {INNER_GLYPHS.map((g, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
              <rect x={(g.cx - g.w / 2) * 100} y={(g.cy - g.h / 2) * 56.25} width={g.w * 100} height={g.h * 56.25} rx={0.6} ry={0.6} fill="url(#glyph-grad)" stroke={COPPER} strokeOpacity={0.5} strokeWidth={0.12} />
            </motion.g>
          ))}
          <motion.line x1={BOUNDARY.x * 100} y1={(BOUNDARY.y + BOUNDARY.h / 2) * 56.25} x2={(BOUNDARY.x + 0.012) * 100} y2={(BOUNDARY.y + BOUNDARY.h / 2) * 56.25} stroke={COPPER} strokeWidth={0.4} strokeLinecap="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.line x1={(BOUNDARY.x + BOUNDARY.w - 0.012) * 100} y1={(BOUNDARY.y + BOUNDARY.h / 2) * 56.25} x2={(BOUNDARY.x + BOUNDARY.w) * 100} y2={(BOUNDARY.y + BOUNDARY.h / 2) * 56.25} stroke={COPPER} strokeWidth={0.4} strokeLinecap="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.25 }} />
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
        {[
          { num: '01', label: 'Outside', body: 'Public AI noise. Vendor APIs, training data, third-party clouds.', tone: 'muted' },
          { num: '02', label: 'Your environment', body: 'Your data and models stay on your hardware. Nothing leaves.', tone: 'copper' },
          { num: '03', label: 'Clean output', body: 'Queries in, answers out. Only the response crosses the perimeter.', tone: 'copper' },
        ].map((row, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex items-start gap-3">
            <div className={row.tone === 'copper' ? 'font-mono text-xs pt-0.5 text-copper tracking-widest' : 'font-mono text-xs pt-0.5 text-text-muted tracking-widest'}>
              {row.num}
            </div>
            <div className="min-w-0">
              <div className={row.tone === 'copper' ? 'font-mono text-xs tracking-widest uppercase mb-1 text-copper' : 'font-mono text-xs tracking-widest uppercase mb-1 text-text-muted'}>
                {row.label}
              </div>
              <p className="text-xs text-text-secondary leading-snug">{row.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
