import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Users, Clock, CheckCircle, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { icon: BadgeCheck, label: 'RSTA Certified', color: 'saffron' },
  { icon: Shield, label: 'Insurance Covered', color: 'deep-orange' },
  { icon: Users, label: '5000+ Students', color: 'bhutan-gold' },
  { icon: Clock, label: 'Flexible Timing', color: 'saffron' },
  { icon: CheckCircle, label: '98% Pass Rate', color: 'deep-orange' },
  { icon: Award, label: 'Expert Instructors', color: 'bhutan-gold' },
];

export function TrustBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const items = itemsRef.current;

    if (!section || !heading || !items) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      const itemElements = items.querySelectorAll('.trust-item');
      gsap.fromTo(
        itemElements,
        { y: 15, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: items,
            start: 'top 85%',
            end: 'top 55%',
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
      className="relative w-full py-12 lg:py-16 bhutan-pattern z-20"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
      
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <h3
          ref={headingRef}
          className="font-heading font-semibold text-lg lg:text-xl text-center text-[#1A1A1A] dark:text-white mb-8"
        >
          Trusted by <span className="text-saffron">students</span> across Bhutan
        </h3>

        {/* Trust items */}
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="trust-item group flex flex-col items-center text-center p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl border border-saffron/10 hover:border-saffron/25 hover:card-shadow-bhutan transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-5 h-5 text-${item.color}`} />
              </div>
              <span className="font-heading font-medium text-xs text-[#333333] dark:text-[#DDDDDD]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
    </section>
  );
}
