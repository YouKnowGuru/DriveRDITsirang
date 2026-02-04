import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/ui/custom/Navigation';
import { BackToTop } from '@/components/ui/custom/BackToTop';
import { Hero } from '@/sections/Hero';
import { TrustBanner } from '@/sections/TrustBanner';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { CoursesOverview } from '@/sections/CoursesOverview';
import { TheoryDetail } from '@/sections/TheoryDetail';
import { PracticalDetail } from '@/sections/PracticalDetail';
import { Instructors } from '@/sections/Instructors';
import { Testimonials } from '@/sections/Testimonials';
import { Pricing } from '@/sections/Pricing';
import { FAQ } from '@/sections/FAQ';
import { Booking } from '@/sections/Booking';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bhutan-pattern transition-colors duration-300">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative">
          {/* Section 1: Hero - pin: true */}
          <Hero />

          {/* Section 2: Trust Banner - pin: false */}
          <TrustBanner />

          {/* Section 3: Why Choose Us - pin: false */}
          <WhyChooseUs />

          {/* Section 4: Courses Overview - pin: false */}
          <CoursesOverview />

          {/* Section 5: Theory Detail - pin: true */}
          <TheoryDetail />

          {/* Section 6: Practical Detail - pin: true */}
          <PracticalDetail />

          {/* Section 7: Instructors - pin: false */}
          <Instructors />

          {/* Section 8: Testimonials - pin: false */}
          <Testimonials />

          {/* Section 9: Pricing - pin: false */}
          <Pricing />

          {/* Section 10: FAQ - pin: false */}
          <FAQ />

          {/* Section 11: Booking - pin: false */}
          <Booking />

          {/* Section 12: Footer - pin: false */}
          <Footer />
        </main>

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
