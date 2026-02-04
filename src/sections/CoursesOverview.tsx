import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Flame, BookOpen, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 'theory',
    label: 'THEORY COURSE',
    labelIcon: BookOpen,
    title: 'Theory & Road Rules',
    subtitle: 'The Foundation of Safe Driving',
    description: 'Master traffic laws, road signs, and defensive driving concepts. Essential for all new drivers.',
    image: '/images/course_theory_classroom.jpg',
    href: '#theory-detail',
    color: 'saffron',
    stats: '2,500+ students enrolled',
    featured: false,
  },
  {
    id: 'practical',
    label: 'MOST POPULAR',
    labelIcon: Crown,
    title: 'Intensive Driving',
    subtitle: '3-Month Complete Package',
    description: 'Our best-selling course! Everything included: unlimited sessions, FREE vehicle for test, and FREE license.',
    image: '/images/course_practical_parking.jpg',
    href: '#pricing',
    color: 'deep-orange',
    stats: '3,200+ students enrolled',
    featured: true,
  },
];

export function CoursesOverview() {
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
        { y: 20, opacity: 0 },
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

      const cardElements = cards.querySelectorAll('.course-card');
      gsap.fromTo(
        cardElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
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
      id="courses"
      className="relative w-full py-16 lg:py-24 bhutan-pattern z-20"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/25 to-transparent" />
      
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="animate-heading inline-flex items-center gap-2 px-3 py-1.5 bg-saffron/10 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5 text-saffron" />
            <span className="font-heading font-medium text-xs text-saffron">Our Programs</span>
          </div>
          <h2 className="animate-heading font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-3">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-deep-orange">Path</span>
          </h2>
          <p className="animate-heading font-body text-sm lg:text-base text-[#4A4A4A] dark:text-[#AAAAAA] max-w-xl mx-auto">
            From theory fundamentals to practical mastery, we have the perfect course for you
          </p>
        </div>

        {/* Course Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          {courses.map((course, index) => (
            <a
              key={index}
              href={course.href}
              className={`course-card group relative rounded-2xl lg:rounded-3xl overflow-hidden card-shadow-bhutan hover:shadow-glow-saffron transition-all duration-300 ${
                course.featured ? 'ring-2 ring-saffron ring-offset-2 ring-offset-cream dark:ring-offset-dark-bg' : ''
              }`}
            >
              {/* Background Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Featured glow */}
                {course.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-saffron/25 via-transparent to-transparent" />
                )}
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-between">
                {/* Top badges */}
                <div className="flex items-start justify-between">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                    course.featured 
                      ? 'bg-gradient-saffron text-white' 
                      : 'bg-white/20 backdrop-blur-sm text-white'
                  }`}>
                    <course.labelIcon className="w-3.5 h-3.5" />
                    <span className="font-heading font-semibold text-[10px] uppercase tracking-wider">
                      {course.label}
                    </span>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-saffron group-hover:scale-105 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Bottom content */}
                <div>
                  <p className="font-body text-xs text-white/70 mb-1">{course.subtitle}</p>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="font-body text-xs lg:text-sm text-white/80 mb-3 max-w-sm">
                    {course.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-body text-[11px] text-white/70">{course.stats}</span>
                  </div>
                </div>
              </div>

              {/* Featured indicator */}
              {course.featured && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-saffron rounded-full flex items-center justify-center shadow-lg">
                  <Flame className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="font-body text-sm text-[#666666] dark:text-[#888888] mb-3">
            Not sure which course is right for you?
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-saffron hover:text-deep-orange transition-colors"
          >
            Get a free consultation
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
