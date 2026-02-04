import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'I passed on my first attempt. The lessons were clear, calm, and practical. The instructors really know how to build your confidence.',
    name: 'Dorji Dema',
    role: 'Student, Tsirang',
    avatar: '/images/testimonial_avatar_a.jpg',
  },
  {
    quote:
      'Flexible booking made it easy to learn while working. Highly recommended for anyone with a busy schedule.',
    name: 'Sonam Tobgay',
    role: 'Student, Gelephu',
    avatar: '/images/testimonial_avatar_b.jpg',
  },
];

export function Testimonials() {
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
        { x: -40, opacity: 0 },
        {
          x: 0,
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
      const cardElements = cards.querySelectorAll('.testimonial-card');
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

      // Avatar animations
      const avatars = cards.querySelectorAll('.testimonial-avatar');
      gsap.fromTo(
        avatars,
        { scale: 0.8, rotate: -6, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
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
      id="testimonials"
      className="relative w-full py-20 lg:py-28 bg-background dark:bg-background z-50"
    >
      <div className="px-6 lg:px-[9vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-semibold text-3xl lg:text-[clamp(34px,3.6vw,52px)] text-foreground dark:text-foreground mb-12 lg:mb-16"
        >
          What our <span className="text-lime">students</span> say
        </h2>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-card dark:bg-card/50 rounded-2xl lg:rounded-[28px] p-6 lg:p-8 shadow-card dark:shadow-card-dark"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-lime/10 dark:bg-lime/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-lime" />
              </div>

              {/* Content */}
              <div className="flex items-start gap-4 lg:gap-6">
                {/* Avatar */}
                <div className="testimonial-avatar w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-lime/20">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="font-body text-base lg:text-lg text-foreground dark:text-foreground/90 leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-foreground dark:text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-xs text-foreground/70 dark:text-foreground/80">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
