import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { FrameworksSection } from '@/components/sections/frameworks-section';
import { CTASection } from '@/components/sections/cta-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FrameworksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
