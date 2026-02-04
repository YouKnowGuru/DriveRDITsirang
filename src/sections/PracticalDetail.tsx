import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Parking, hills, and city traffic',
  'Night driving & weather prep',
  'Pre-test assessment & feedback',
  'Dual-control vehicle safety',
];

export function PracticalDetail() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const underline = underlineRef.current;
    const bullets = bulletsRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !content || !underline || !bullets || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0% - 30%): Entrance (flipped - image from right)
      scrollTl
        .fromTo(
          image,
          { x: '55vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(
          content.querySelectorAll('.animate-item'),
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        )
        .fromTo(
          underline,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          bullets.querySelectorAll('li'),
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(
          cta,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        );

      // Phase 2 (30% - 70%): Settle (hold)

      // Phase 3 (70% - 100%): Exit (flipped - image to right)
      scrollTl
        .to(
          image,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          content,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bullets,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .to(
          cta,
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="practical-detail"
      className="relative w-full h-screen bg-off-white dark:bg-near-black overflow-hidden z-40"
    >
      {/* Plus pattern background */}
      <div className="absolute inset-0 plus-pattern opacity-50" />

      {/* Content Container */}
      <div className="relative w-full h-full px-6 lg:px-[9vw] flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Content */}
        <div ref={contentRef} className="w-full lg:w-[36vw]">
          {/* Eyebrow */}
          <span className="animate-item inline-block font-heading font-medium text-xs uppercase tracking-[0.12em] text-text-secondary dark:text-off-white/60 mb-4">
            COURSE
          </span>

          {/* Heading */}
          <h2 className="animate-item font-heading font-semibold text-3xl lg:text-[clamp(34px,3.6vw,52px)] text-near-black dark:text-off-white mb-4">
            Practical <span className="text-lime">Driving</span>
          </h2>

          {/* Accent underline */}
          <div
            ref={underlineRef}
            className="w-24 h-[3px] bg-lime mb-6 origin-left"
          />

          {/* Description */}
          <p className="animate-item font-body text-base text-text-secondary dark:text-off-white/70 mb-8 leading-relaxed">
            Build muscle memory and real-road judgment with guided behind-the-wheel
            sessions. Our experienced instructors ensure you develop safe driving
            habits that last a lifetime.
          </p>

          {/* Features list */}
          <ul ref={bulletsRef} className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-lime" />
                </div>
                <span className="font-body text-sm text-near-black dark:text-off-white">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => {
                const element = document.querySelector('#booking');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-lime text-near-black hover:bg-lime/90 font-heading font-medium rounded-full px-6 py-6 text-base"
            >
              Book practical sessions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button
              onClick={() => {
                const element = document.querySelector('#instructors');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-heading font-medium text-sm text-near-black dark:text-off-white hover:text-lime dark:hover:text-lime transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Meet our instructors
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={imageRef}
          className="w-full lg:w-[40vw] aspect-[16/10] lg:aspect-auto lg:h-[64vh] rounded-2xl lg:rounded-[28px] overflow-hidden shadow-card dark:shadow-card-dark"
        >
          <img
            src="/images/course_practical_parking.jpg"
            alt="Practical driving session"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
