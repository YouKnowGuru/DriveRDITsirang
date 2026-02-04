import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    name: 'Karma Dorji',
    role: 'Senior Instructor',
    description: 'Patient, systematic, test-focused. 15+ years of experience.',
    image: '/images/instructor_karma.jpg',
  },
  {
    name: 'Pema Wangmo',
    role: 'City Driving Specialist',
    description: 'City traffic & defensive driving specialist. Expert in busy road navigation.',
    image: '/images/instructor_pema.jpg',
  },
  {
    name: 'Tenzin Norbu',
    role: 'Advanced Instructor',
    description: 'Night drives & mountain roads expert. Perfect for challenging terrain.',
    image: '/images/instructor_tenzin.jpg',
  },
];

export function Instructors() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.instructor-card');
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Photo zoom settle - simplified to a subtle entry scale
      gsap.fromTo(
        photos,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instructors"
      className="relative w-full py-20 lg:py-28 bg-off-white dark:bg-near-black z-50"
    >
      <div className="px-6 lg:px-[9vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-semibold text-3xl lg:text-[clamp(34px,3.6vw,52px)] text-near-black dark:text-off-white mb-12 lg:mb-16"
        >
          Learn from <span className="text-lime">experienced</span> instructors
        </h2>

        {/* Instructor Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="instructor-card group bg-white dark:bg-near-black/50 rounded-2xl lg:rounded-[28px] overflow-hidden shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="instructor-photo w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-lime/10 dark:bg-lime/20 rounded-full font-heading font-medium text-xs uppercase tracking-[0.08em] text-lime mb-3">
                  {instructor.role}
                </span>
                <h3 className="font-heading font-semibold text-xl text-near-black dark:text-off-white mb-2">
                  {instructor.name}
                </h3>
                <p className="font-body text-sm text-text-secondary dark:text-off-white/90">
                  {instructor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
