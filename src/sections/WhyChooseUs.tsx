import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Car, Calendar, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BookOpen,
    title: 'Structured Curriculum',
    description: 'Step-by-step theory and practical sessions designed for real-world confidence.',
    color: 'saffron',
    link: '#courses',
  },
  {
    icon: Car,
    title: 'Modern Fleet',
    description: 'Practice in well-maintained cars with dual controls and safety features.',
    color: 'deep-orange',
    link: '#courses',
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Book lessons around your schedule with easy online rescheduling.',
    color: 'bhutan-gold',
    link: '#booking',
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading.querySelectorAll('.animate-heading'),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      const cardElements = cards.querySelectorAll('.feature-card');
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative w-full py-16 lg:py-24 bhutan-pattern z-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-16 right-16 w-24 h-24 rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute bottom-16 left-16 w-32 h-32 rounded-full bg-bhutan-gold/5 blur-3xl" />

      <div className="px-6 lg:px-[6vw] relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="animate-heading inline-flex items-center gap-2 px-3 py-1.5 bg-saffron/10 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span className="font-heading font-medium text-xs text-saffron">Why Choose Us</span>
          </div>
          <h2 className="animate-heading font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-3">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-deep-orange">RDI Drive</span> Difference
          </h2>
          <p className="animate-heading font-body text-sm lg:text-base text-[#4A4A4A] dark:text-[#AAAAAA] max-w-lg mx-auto">
            We combine Bhutanese values of patience and dedication with modern driving techniques
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 border border-saffron/10 hover:border-saffron/30 hover:card-shadow-bhutan transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-lg text-[#1A1A1A] dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-[#666666] dark:text-[#888888] mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Link */}
              <a
                href={feature.link}
                className="inline-flex items-center gap-1.5 font-heading font-semibold text-xs text-saffron hover:text-deep-orange transition-colors"
              >
                Learn more
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
