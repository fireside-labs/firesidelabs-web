import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { EmberParticles } from './EmberParticles';

const ACCENT = '#C87533';
const PARTICLE_GLOW = '#FFB366';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { label: 'Solutions', to: '/solutions' },
    { label: 'Calibration', to: '/calibration' },
    { label: 'Benchmarks', to: '/benchmarks' },
    { label: 'Research', to: '/research' },
  ];

  // Particle intensity: subtle on text-dense pages where embers compete with content.
  const subtleParticleRoutes = new Set(['/solutions', '/research']);
  const particleIntensity = subtleParticleRoutes.has(location.pathname) ? 'subtle' : 'normal';

  return (
    <div className="relative min-h-screen bg-vanta">
      <a href="#main" className="skip-link">Skip to content</a>
      <EmberParticles accentColor={ACCENT} glowColor={PARTICLE_GLOW} intensity={particleIntensity} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-3 h-3 rounded-sm transition-all duration-500 group-hover:scale-125"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px rgba(200, 117, 51, 0.4)` }}
            />
            <span className="text-lg font-bold tracking-[-0.02em]">FIRESIDE LABS</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.to
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: ACCENT,
                  color: '#000',
                  boxShadow: `0 0 15px rgba(200, 117, 51, 0.15)`,
                }}
              >
                <Flame size={14} />
                Have a Fireside
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main id="main">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-sm font-semibold tracking-tight">FIRESIDE LABS</span>
            </Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/security"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
              >
                Security
              </Link>
              <Link
                to="/contact"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
              >
                Contact
              </Link>
              <Link
                to="/foundry"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
              >
                Foundry Runtime
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-6 border-t border-white/5">
            <div className="font-mono text-[11px] text-text-muted tracking-widest">
              FIRESIDE LABS, INC. · hello@firesidelabs.ai
            </div>
            <div className="font-mono text-[11px] text-text-muted tracking-widest">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
