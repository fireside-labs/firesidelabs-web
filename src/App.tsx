import { Component, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from './components/Layout';

// Route-level code splitting — each page becomes its own chunk.
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BenchmarksPage = lazy(() => import('./pages/BenchmarksPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="font-mono text-[11px] tracking-widest text-text-muted uppercase animate-pulse">Loading…</div>
  </div>
);

/**
 * After a redeploy, a cached shell can request old hashed chunks; the SPA
 * rewrite answers with index.html, the dynamic import throws, and without a
 * boundary the app white-screens. One automatic reload picks up the new build.
 */
class ChunkErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    const isStaleChunk = /dynamically imported module|module script failed|Loading chunk/i.test(
      error.message
    );
    if (isStaleChunk && !sessionStorage.getItem('chunk-reload')) {
      sessionStorage.setItem('chunk-reload', '1');
      window.location.reload();
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="font-mono text-[11px] tracking-widest text-text-muted uppercase">
            Something broke loading this page
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo text-black font-semibold rounded-xl text-sm tracking-wide uppercase cursor-pointer"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Layout>
          <ChunkErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/benchmarks" element={<BenchmarksPage />} />
                {/* Legacy routes from the pre-studio site */}
                <Route path="/solutions" element={<Navigate to="/services" replace />} />
                <Route path="/calibration" element={<Navigate to="/services" replace />} />
                <Route path="/security" element={<Navigate to="/services" replace />} />
                <Route path="/foundry" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ChunkErrorBoundary>
        </Layout>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
