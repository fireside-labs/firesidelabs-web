import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

// Route-level code splitting — each page becomes its own chunk.
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BenchmarksPage = lazy(() => import('./pages/BenchmarksPage'));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="font-mono text-[11px] tracking-widest text-text-muted uppercase animate-pulse">Loading…</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
