import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Props {
  accentColor: string;
  glowColor: string;
  /**
   * Visual intensity of the particle field.
   *  - 'normal' (default): full ambience as designed for the Hero/Home.
   *  - 'subtle': lower opacity, fewer particles, calmer motion. Use on text-dense pages
   *    (Solutions, Research) where particles compete with copy.
   */
  intensity?: 'normal' | 'subtle';
}

export const EmberParticles = ({ accentColor, glowColor, intensity = 'normal' }: Props) => {
  const subtle = intensity === 'subtle';
  const TARGET_MAX = subtle ? 30 : 60;
  const SEED_COUNT = subtle ? 18 : 40;
  const SPAWN_THRESHOLD = subtle ? 0.93 : 0.85;
  const CANVAS_OPACITY = subtle ? 0.32 : 0.6;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect prefers-reduced-motion: skip the canvas RAF loop entirely.
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticle = (): Particle => {
      const maxLife = 200 + Math.random() * 300;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.3 + Math.random() * 1.2),
        size: 1 + Math.random() * 2.5,
        opacity: 0,
        life: 0,
        maxLife,
        color: Math.random() > 0.3 ? accentColor : glowColor,
      };
    };

    for (let i = 0; i < SEED_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length < TARGET_MAX && Math.random() > SPAWN_THRESHOLD) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.vy;
        p.vx *= 0.999;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio / 0.1;
        } else if (lifeRatio > 0.7) {
          p.opacity = (1 - lifeRatio) / 0.3;
        } else {
          p.opacity = 1;
        }

        const currentSize = p.size * (lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1);

        if (p.life >= p.maxLife || p.y < -20) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.round(p.opacity * 0.15 * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.round(p.opacity * 0.7 * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.5})`;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [accentColor, glowColor, TARGET_MAX, SEED_COUNT, SPAWN_THRESHOLD]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[3] pointer-events-none"
      style={{ opacity: CANVAS_OPACITY }}
    />
  );
};
