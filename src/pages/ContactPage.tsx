import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Building2 } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-28">
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-6"
          >
            🔥
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
            Have a{' '}
            <span className="text-gradient">Fireside.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            15 minutes. No pitch. No deck. Just tell us what's costing you time and money
            and we'll tell you honestly if AI can fix it.
          </p>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          {[
            { icon: Clock, label: '15 minutes' },
            { icon: ShieldCheck, label: 'No data required' },
            { icon: Building2, label: 'Enterprise-focused' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-text-muted text-sm">
              <item.icon size={16} className="text-indigo/60" />
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Calendly Embed — wrapped in a dark container so it doesn't flash white on load.
            Note: the "Powered by Calendly" mark stays visible (Calendly's free-tier ToS). */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-elevated rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/j-nguyen-firesidelabs?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1&background_color=0a0a0a&text_color=e0e0e0&primary_color=C87533"
            style={{ minWidth: '320px', height: '700px', backgroundColor: '#0a0a0a' }}
          />
        </motion.div>

        {/* Fallback email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-text-muted text-sm">
            Prefer email?{' '}
            <a href="mailto:j.nguyen@firesidelabs.ai" className="text-indigo hover:underline">
              j.nguyen@firesidelabs.ai
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
