import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap, Award, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '5,000',
    duration: '1 Month',
    description: 'Perfect for beginners starting their driving journey',
    features: [
      'Complete theory classes',
      '4 practical driving sessions',
      'Study materials included',
      'Manual test required',
      'Certificate: Extra charge',
    ],
    icon: Zap,
    color: 'saffron',
    highlighted: false,
  },
  {
    id: 'complete',
    name: 'Complete',
    price: '10,000',
    duration: '2 Months',
    description: 'Comprehensive learning with more practice sessions',
    features: [
      'Complete theory classes',
      '10 practical driving sessions',
      'Test preparation included',
      'Manual test required',
      'Certificate: Extra charge',
    ],
    icon: Award,
    color: 'deep-orange',
    highlighted: false,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    price: '15,000',
    duration: '3 Months',
    description: 'Our most popular! Everything included for guaranteed success',
    features: [
      'Complete theory classes',
      'Unlimited practical sessions',
      'FREE vehicle for test',
      'FREE driving license',
      'Certificate included',
      'Priority booking',
    ],
    icon: Crown,
    color: 'bhutan-gold',
    highlighted: true,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      const cardElements = cards.querySelectorAll('.pricing-card');
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

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-16 lg:py-24 bhutan-pattern z-50"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/25 to-transparent" />
      <div className="absolute top-32 left-10 w-40 h-40 rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full bg-bhutan-gold/5 blur-3xl" />

      <div className="px-6 lg:px-[6vw] relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="animate-heading inline-flex items-center gap-2 px-3 py-1.5 bg-saffron/10 rounded-full mb-4">
            <Star className="w-3.5 h-3.5 text-saffron" />
            <span className="font-heading font-medium text-xs text-saffron">Pricing Plans</span>
          </div>
          <h2 className="animate-heading font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-3">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-deep-orange">Transparent</span> Pricing
          </h2>
          <p className="animate-heading font-body text-sm lg:text-base text-[#4A4A4A] dark:text-[#AAAAAA] max-w-xl mx-auto">
            Choose the plan that fits your needs. All plans include expert instruction and modern vehicles.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 lg:p-6 border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-saffron shadow-glow-saffron lg:-translate-y-3'
                  : 'border-saffron/10 hover:border-saffron/30 hover:card-shadow-bhutan'
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-saffron rounded-full flex items-center gap-1 shadow-glow-saffron">
                  <Star className="w-3 h-3 text-white" />
                  <span className="font-heading font-semibold text-[10px] text-white">Most Popular</span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-${plan.color}/10 flex items-center justify-center mb-4`}>
                <plan.icon className={`w-6 h-6 text-${plan.color}`} />
              </div>

              {/* Plan name */}
              <h3 className="font-heading font-bold text-lg text-[#1A1A1A] dark:text-white mb-1">
                {plan.name}
              </h3>

              {/* Duration */}
              <p className="font-body text-xs text-saffron font-medium mb-3">
                {plan.duration} Course
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="font-body text-xs text-[#666666] dark:text-[#888888]">Nu</span>
                <span className="font-heading font-bold text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white ml-1">
                  {plan.price}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-xs text-[#666666] dark:text-[#888888] mb-4">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-saffron/15 via-saffron/30 to-saffron/15 mb-4" />

              {/* Features */}
              <ul className="space-y-2.5 mb-5">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-saffron/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-saffron" />
                    </div>
                    <span className="font-body text-xs text-[#333333] dark:text-[#DDDDDD]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full rounded-full py-5 font-heading font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-saffron text-white hover:opacity-90 shadow-glow-saffron'
                    : 'bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] hover:opacity-90'
                }`}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-8">
          <p className="font-body text-xs text-[#888888] dark:text-[#666666]">
            All prices in Bhutanese Ngultrum (Nu). Payment plans available.
          </p>
        </div>
      </div>

      {/* Location Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-cream dark:bg-dark-card border-saffron/15 max-w-sm rounded-2xl lg:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-xl text-[#1A1A1A] dark:text-white">
              Choose Location
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-[#666666] dark:text-[#888888]">
              Select your preferred branch for the {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href={`#booking?plan=${selectedPlan?.id}&location=tsirang`}
              onClick={() => setIsDialogOpen(false)}
              className="flex flex-col items-center p-4 rounded-2xl border-2 border-saffron/15 hover:border-saffron hover:bg-saffron/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center mb-3 group-hover:bg-saffron/20 transition-colors">
                <MapPin className="w-6 h-6 text-saffron" />
              </div>
              <span className="font-heading font-bold text-sm text-[#1A1A1A] dark:text-white">
                Tsirang
              </span>
              <span className="font-body text-[10px] text-[#888888] dark:text-[#666666] mt-0.5">
                Main Branch
              </span>
            </a>
            <a
              href={`#booking?plan=${selectedPlan?.id}&location=gelephu`}
              onClick={() => setIsDialogOpen(false)}
              className="flex flex-col items-center p-4 rounded-2xl border-2 border-saffron/15 hover:border-saffron hover:bg-saffron/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center mb-3 group-hover:bg-saffron/20 transition-colors">
                <MapPin className="w-6 h-6 text-saffron" />
              </div>
              <span className="font-heading font-bold text-sm text-[#1A1A1A] dark:text-white">
                Gelephu
              </span>
              <span className="font-body text-[10px] text-[#888888] dark:text-[#666666] mt-0.5">
                City Branch
              </span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
