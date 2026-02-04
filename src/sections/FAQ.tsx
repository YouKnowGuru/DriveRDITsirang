import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Do I need a learner\'s permit before booking?',
    answer:
      'Yes, you need a valid learner\'s permit before starting practical driving lessons. However, you can enroll in our theory course without one. We can guide you through the process of obtaining your learner\'s permit.',
  },
  {
    question: 'How long is each lesson?',
    answer:
      'Each practical driving lesson lasts for 1 hour. Theory classes are typically 2 hours long. We recommend booking at least 2 sessions per week for optimal progress.',
  },
  {
    question: 'What happens if I fail the test?',
    answer:
      'Don\'t worry! If you fail the test, we provide additional practice sessions at a discounted rate. Our Intensive plan includes unlimited sessions until you pass.',
  },
  {
    question: 'Can I reschedule a lesson?',
    answer:
      'Yes, you can reschedule lessons up to 24 hours in advance without any penalty. Simply contact us or use our online booking system.',
  },
  {
    question: 'Do you offer pickup and drop-off?',
    answer:
      'Yes, we offer pickup and drop-off services within Tsirang and Gelephu town areas at no extra cost. For locations outside town, a nominal fee may apply.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const accordion = accordionRef.current;
    const illustration = illustrationRef.current;

    if (!section || !heading || !accordion || !illustration) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      // FAQ items animation
      const faqItems = accordion.querySelectorAll('[data-faq-item]');
      gsap.fromTo(
        faqItems,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordion,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Illustration animation
      gsap.fromTo(
        illustration,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: illustration,
            start: 'top 80%',
            end: 'top 60%',
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
      id="faq"
      className="relative w-full py-20 lg:py-28 bg-off-white dark:bg-near-black z-50"
    >
      <div className="px-6 lg:px-[9vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: FAQ Accordion */}
          <div className="w-full lg:w-[52vw]">
            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-heading font-semibold text-3xl lg:text-[clamp(34px,3.6vw,52px)] text-near-black dark:text-off-white mb-12"
            >
              Questions <span className="text-lime">&</span> answers
            </h2>

            {/* Accordion */}
            <div ref={accordionRef}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    data-faq-item
                    className="bg-white dark:bg-near-black/50 rounded-2xl px-6 shadow-card dark:shadow-card-dark border-none"
                  >
                    <AccordionTrigger className="font-heading font-medium text-left text-near-black dark:text-off-white hover:text-lime dark:hover:text-lime transition-colors py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-text-secondary dark:text-off-white/70 pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right: Illustration */}
          <div
            ref={illustrationRef}
            className="hidden lg:block w-[27vw] h-[52vh] rounded-2xl lg:rounded-[28px] overflow-hidden shadow-card dark:shadow-card-dark"
          >
            <img
              src="/images/faq_illustration.jpg"
              alt="Driving illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
