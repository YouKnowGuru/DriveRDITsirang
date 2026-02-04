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
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
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
