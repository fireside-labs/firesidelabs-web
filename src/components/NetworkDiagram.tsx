import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  glow?: boolean;
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  // Core hub
  { id: 'engine', label: 'Fireside Engine', x: 0.5, y: 0.5, radius: 28, glow: true },
  // Inner ring — capabilities
  { id: 'routing', label: 'Routing', x: 0.28, y: 0.3, radius: 16 },
  { id: 'reasoning', label: 'Reasoning', x: 0.72, y: 0.3, radius: 16 },
  { id: 'learning', label: 'Self-Learning', x: 0.22, y: 0.62, radius: 16 },
  { id: 'privacy', label: 'On-Premise', x: 0.78, y: 0.62, radius: 16 },
  { id: 'benchmark', label: 'Benchmarks', x: 0.5, y: 0.85, radius: 16 },
  // Outer ring — inputs/outputs
  { id: 'data', label: 'Your Data', x: 0.08, y: 0.2, radius: 12 },
  { id: 'models', label: 'Models', x: 0.92, y: 0.2, radius: 12 },
  { id: 'docs', label: 'Documents', x: 0.08, y: 0.78, radius: 12 },
  { id: 'api', label: 'API', x: 0.92, y: 0.78, radius: 12 },
  { id: 'deploy', label: 'Deploy', x: 0.32, y: 0.92, radius: 12 },
  { id: 'monitor', label: 'Monitor', x: 0.68, y: 0.92, radius: 12 },
];

const EDGES: Edge[] = [
  // Hub connections
  { from: 'routing', to: 'engine' },
  { from: 'reasoning', to: 'engine' },
  { from: 'learning', to: 'engine' },
  { from: 'privacy', to: 'engine' },
  { from: 'benchmark', to: 'engine' },
  // Outer to inner
  { from: 'data', to: 'routing' },
  { from: 'data', to: 'learning' },
  { from: 'models', to: 'reasoning' },
  { from: 'models', to: 'privacy' },
  { from: 'docs', to: 'learning' },
  { from: 'api', to: 'privacy' },
  { from: 'deploy', to: 'benchmark' },
  { from: 'monitor', to: 'benchmark' },
  // Cross connections
  { from: 'routing', to: 'reasoning' },
  { from: 'learning', to: 'privacy' },
];

const COPPER = '#C87533';
const COPPER_DIM = 'rgba(200, 117, 51, 0.15)';
const COPPER_GLOW = 'rgba(200, 117, 51, 0.6)';

interface Particle {
  edge: number;
  t: number;
  speed: number;
  size: number;
}

export const NetworkDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    particlesRef.current = EDGES.map((_, i) => ({
      edge: i,
      t: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      size: 1.5 + Math.random() * 1.5,
    }));
    // Add extra particles on some edges
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push({
        edge: Math.floor(Math.random() * EDGES.length),
        t: Math.random(),
        speed: 0.001 + Math.random() * 0.004,
        size: 1 + Math.random() * 1,
      });
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const getPos = (node: Node, w: number, h: number) => ({
      x: node.x * w,
      y: node.y * h,
    });

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Draw edges
      EDGES.forEach((edge) => {
        const fromNode = NODES.find(n => n.id === edge.from)!;
        const toNode = NODES.find(n => n.id === edge.to)!;
        const from = getPos(fromNode, w, h);
        const to = getPos(toNode, w, h);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = COPPER_DIM;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles flowing along edges
      particlesRef.current.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const edge = EDGES[p.edge];
        const fromNode = NODES.find(n => n.id === edge.from)!;
        const toNode = NODES.find(n => n.id === edge.to)!;
        const from = getPos(fromNode, w, h);
        const to = getPos(toNode, w, h);

        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = COPPER_GLOW;
        ctx.fill();

        // glow trail
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 117, 51, 0.08)';
        ctx.fill();
      });

      // Draw nodes
      NODES.forEach((node) => {
        const pos = getPos(node, w, h);
        const pulse = node.glow ? 1 + Math.sin(t * 2) * 0.15 : 1;
        const r = node.radius * pulse;

        // Glow
        if (node.glow) {
          const grad = ctx.createRadialGradient(pos.x, pos.y, r * 0.5, pos.x, pos.y, r * 3);
          grad.addColorStop(0, 'rgba(200, 117, 51, 0.15)');
          grad.addColorStop(1, 'rgba(200, 117, 51, 0)');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
        ctx.fill();
        ctx.strokeStyle = node.glow ? COPPER : COPPER_DIM;
        ctx.lineWidth = node.glow ? 2 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = node.glow ? COPPER : 'rgba(255,255,255,0.5)';
        ctx.font = node.glow
          ? 'bold 11px "SF Mono", "Fira Code", monospace'
          : '9px "SF Mono", "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, pos.x, pos.y);
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
    <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};
