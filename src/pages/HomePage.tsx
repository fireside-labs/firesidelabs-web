import { Hero } from '../components/Hero';
import { LogoStrip } from '../components/LogoStrip';
import { ComparisonTable } from '../components/ComparisonTable';
import { FeatureGrid } from '../components/FeatureGrid';
import { SocialProof } from '../components/SocialProof';
import { FinalCTA } from '../components/FinalCTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <LogoStrip />
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <ComparisonTable />
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <FeatureGrid />
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <SocialProof />
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <FinalCTA />
    </>
  );
};

export default HomePage;
