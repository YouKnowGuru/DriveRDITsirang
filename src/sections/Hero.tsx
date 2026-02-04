import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Award, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !image || !content || !stats) return;

    const ctx = gsap.context(() => {
      // Load animation - faster timing
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(
          image,
          { x: '40vw', opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 }
        )
        .fromTo(
          content.querySelectorAll('.animate-item'),
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          '-=0.5'
        )
        .fromTo(
          stats.querySelectorAll('.stat-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          '-=0.3'
        );

      // Scroll exit animation - faster
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onLeaveBack: () => {
            gsap.set([image, content, stats], { opacity: 1, x: 0, y: 0 });
          },
        },
      });

      scrollTl
        .fromTo(
          content,
          { x: 0, opacity: 1 },
          { x: '-15vw', opacity: 0, ease: 'power2.in' },
          0.65
        )
        .fromTo(
          image,
          { x: 0, opacity: 1 },
          { x: '15vw', opacity: 0, ease: 'power2.in' },
          0.65
        )
        .fromTo(
          stats,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bhutan-pattern cloud-pattern overflow-hidden z-10 pt-20 lg:pt-0"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-10 w-48 h-48 rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute bottom-32 right-10 w-56 h-56 rounded-full bg-deep-orange/5 blur-3xl" />
      </div>

      {/* Content Container - Fixed layout */}
      <div className="relative w-full min-h-screen px-6 lg:px-[6vw] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 py-8 lg:py-0">
        {/* Left Content */}
        <div ref={contentRef} className="w-full lg:w-[48%] flex flex-col items-start z-10 order-2 lg:order-1">
          {/* Badge */}
          <div className="animate-item inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-saffron rounded-full mb-4 shadow-glow-saffron">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span className="font-heading font-semibold text-xs uppercase tracking-wider text-white">
              Bhutan's #1 Driving School
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-[1.1] text-[#1A1A1A] dark:text-white mb-3">
            Master the Art of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-saffron via-deep-orange to-bhutan-gold">
              Safe Driving
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-item font-body text-sm lg:text-base text-[#4A4A4A] dark:text-[#CCCCCC] max-w-md mb-5 leading-relaxed">
            Join Bhutan's most trusted driving academy in Tsirang and Gelephu. 
            Expert instructors, modern vehicles, and a proven track record of success.
          </p>

          {/* CTA Buttons */}
          <div className="animate-item flex flex-wrap items-center gap-3 mb-6">
            <Button
              onClick={() => scrollToSection('#booking')}
              className="bg-gradient-saffron text-white hover:opacity-90 font-heading font-semibold rounded-full px-6 py-5 text-sm shadow-glow-saffron"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button
              onClick={() => scrollToSection('#courses')}
              className="font-heading font-medium text-sm text-[#1A1A1A] dark:text-white hover:text-saffron transition-colors flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-saffron/30 hover:border-saffron"
            >
              Explore Courses
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap items-center gap-4 lg:gap-6">
            <div className="stat-item flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <p className="font-heading font-bold text-xl text-[#1A1A1A] dark:text-white">5000+</p>
                <p className="font-body text-xs text-[#666666] dark:text-[#AAAAAA]">Students Trained</p>
              </div>
            </div>
            <div className="stat-item flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-bhutan-gold/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-bhutan-gold" />
              </div>
              <div>
                <p className="font-heading font-bold text-xl text-[#1A1A1A] dark:text-white">98%</p>
                <p className="font-body text-xs text-[#666666] dark:text-[#AAAAAA]">Pass Rate</p>
              </div>
            </div>
            <div className="stat-item flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-deep-orange/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-deep-orange" />
              </div>
              <div>
                <p className="font-heading font-bold text-xl text-[#1A1A1A] dark:text-white">4.9</p>
                <p className="font-body text-xs text-[#666666] dark:text-[#AAAAAA]">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image - Fixed sizing */}
        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end order-1 lg:order-2">
          <div
            ref={imageRef}
            className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden card-shadow-bhutan">
              <img
                src="/images/hero_student_in_car.jpg"
                alt="Student learning to drive with instructor"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-3 -left-3 lg:bottom-6 lg:-left-6 bg-white dark:bg-dark-card rounded-2xl p-3 shadow-lg animate-float">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-saffron flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-[#1A1A1A] dark:text-white">Licensed</p>
                  <p className="font-body text-xs text-[#666666] dark:text-[#AAAAAA]">RSTA Approved</p>
                </div>
              </div>
            </div>

            {/* Location badges */}
            <div className="absolute -top-3 right-3 lg:top-6 lg:-right-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs font-medium text-[#1A1A1A] dark:text-white">Tsirang</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs font-medium text-[#1A1A1A] dark:text-white">Gelephu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
