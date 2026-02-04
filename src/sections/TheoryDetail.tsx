import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Interactive quizzes & mock tests',
  'Video explanations of complex scenarios',
  'Study kit + notes included',
  'Road signs & traffic rules mastery',
];

export function TheoryDetail() {
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        image,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          content.querySelectorAll('.animate-item'),
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          underline,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          bullets.querySelectorAll('li'),
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          cta,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="theory-detail"
      className="relative w-full py-20 lg:py-32 bg-off-white dark:bg-near-black overflow-hidden z-30"
    >
      {/* Plus pattern background */}
      <div className="absolute inset-0 plus-pattern opacity-50" />

      {/* Content Container */}
      <div className="relative w-full h-full px-6 lg:px-[9vw] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Image */}
        <div
          ref={imageRef}
          className="w-full lg:w-[44vw] aspect-[16/10] lg:aspect-auto lg:h-[64vh] rounded-2xl lg:rounded-[28px] overflow-hidden shadow-card dark:shadow-card-dark"
        >
          <img
            src="/images/course_theory_classroom.jpg"
            alt="Theory classroom session"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div ref={contentRef} className="w-full lg:w-[34vw]">
          {/* Eyebrow */}
          <span className="animate-item inline-block font-heading font-medium text-xs uppercase tracking-[0.12em] text-text-secondary dark:text-off-white/60 mb-4">
            COURSE
          </span>

          {/* Heading */}
          <h2 className="animate-item font-heading font-semibold text-3xl lg:text-[clamp(34px,3.6vw,52px)] text-near-black dark:text-off-white mb-4">
            Theory <span className="text-lime">&</span> Road Rules
          </h2>

          {/* Accent underline */}
          <div
            ref={underlineRef}
            className="w-24 h-[3px] bg-lime mb-6 origin-left"
          />

          {/* Description */}
          <p className="animate-item font-body text-base text-text-secondary dark:text-off-white/90 mb-8 leading-relaxed">
            Our comprehensive theory course prepares you for both the written exam
            and real-world scenarios. We cover road signs, right-of-way, and
            defensive driving.
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
              Enroll in theory
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button className="font-heading font-medium text-sm text-near-black dark:text-off-white hover:text-lime dark:hover:text-lime transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download syllabus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
