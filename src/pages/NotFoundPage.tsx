import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    // SPA rewrite serves 200 for unknown paths; keep soft-404s out of the index.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-mono text-xs tracking-[0.35em] text-indigo uppercase mb-6">404</div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-6">
          This page went <span className="text-gradient italic">cold.</span>
        </h1>
        <p className="text-text-secondary leading-relaxed mb-10">
          The address doesn&apos;t exist, or it belonged to an older version of this site.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
          {[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: 'Work', to: '/work' },
            { label: 'Research', to: '/research' },
            { label: 'Contact', to: '/contact' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold text-indigo hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
