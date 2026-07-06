import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Menu, X } from 'lucide-react';
import { EmberParticles } from './EmberParticles';
import { MotionLink } from './MotionLink';

const ACCENT = '#C87533';
const PARTICLE_GLOW = '#FFB366';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Fireside Labs · AI That Pays Back',
  '/services': 'Services · Fireside Labs',
  '/work': 'Work · Fireside Labs',
  '/about': 'About · Fireside Labs',
  '/research': 'Research · Fireside Labs',
  '/benchmarks': 'Benchmarks · Fireside Labs',
  '/contact': 'Have a Fireside · Fireside Labs',
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change; close mobile menu.
  // 'instant' opts out of the global smooth scroll-behavior, which would
  // otherwise animate a multi-second scroll from page bottom on footer clicks.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
    document.title = PAGE_TITLES[location.pathname] ?? PAGE_TITLES['/'];
  }, [location.pathname]);

  // Escape dismisses the mobile drawer.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Services', to: '/services' },
    { label: 'Work', to: '/work' },
    { label: 'Research', to: '/research' },
    { label: 'About', to: '/about' },
  ];

  // Particle intensity: subtle on text-dense pages where embers compete with content.
  const subtleParticleRoutes = new Set(['/services', '/research', '/work', '/about']);
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
          scrolled ? 'glass-nav border-b border-white/5' : 'bg-transparent'
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

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
            <MotionLink
              to="/contact"
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
            </MotionLink>
          </div>
        </div>
      </motion.nav>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            id="mobile-nav-drawer"
            className="md:hidden fixed top-[60px] left-0 w-full z-40 glass-nav border-b border-white/5 px-6 py-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-base font-medium py-2 transition-colors duration-200 ${
                  location.pathname === item.to
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <MotionLink
              to="/contact"
              whileTap={{ scale: 0.97 }}
              className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: ACCENT, color: '#000' }}
            >
              <Flame size={14} />
              Have a Fireside
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>

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
                to="/benchmarks"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
              >
                Benchmarks
              </Link>
              <Link
                to="/contact"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono tracking-wider uppercase"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-6 border-t border-white/5">
            <div className="font-mono text-[11px] text-text-muted tracking-widest">
              FIRESIDE LABS, INC. · j.nguyen@firesidelabs.ai
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
