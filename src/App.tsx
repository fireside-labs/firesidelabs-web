import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Route-level code splitting — each page becomes its own chunk.
const HomePage = lazy(() => import('./pages/HomePage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const CalibrationPage = lazy(() => import('./pages/CalibrationPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BenchmarksPage = lazy(() => import('./pages/BenchmarksPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const FoundryPage = lazy(() => import('./pages/FoundryPage'));

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
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/calibration" element={<CalibrationPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/benchmarks" element={<BenchmarksPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/foundry" element={<FoundryPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
