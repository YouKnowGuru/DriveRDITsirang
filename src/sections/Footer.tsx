import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Car, ArrowRight, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  courses: [
    { label: 'Theory Course', href: '#theory-detail' },
    { label: 'Practical Course', href: '#practical-detail' },
    { label: 'Starter Plan', href: '#pricing' },
    { label: 'Complete Plan', href: '#pricing' },
    { label: 'Intensive Plan', href: '#pricing' },
  ],
  company: [
    { label: 'About Us', href: '#why-us' },
    { label: 'Our Instructors', href: '#instructors' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  support: [
    { label: 'Contact Us', href: '#booking' },
    { label: 'Book a Lesson', href: '#booking' },
    { label: 'Tsirang Location', href: '#booking' },
    { label: 'Gelephu Location', href: '#booking' },
  ],
};

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    const links = linksRef.current;

    if (!section || !cta || !links) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cta.querySelectorAll('.animate-cta'),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      const linkColumns = links.querySelectorAll('.link-column');
      gsap.fromTo(
        linkColumns,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: links,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#1A1A1A] z-50"
    >
      {/* Top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-deep-orange to-bhutan-gold" />

      {/* CTA Section */}
      <div ref={ctaRef} className="px-6 lg:px-[6vw] py-16 lg:py-20 text-center relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute bottom-8 right-8 w-56 h-56 rounded-full bg-deep-orange/5 blur-3xl" />
        
        <h2 className="animate-cta font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 relative">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-bhutan-gold">Drive?</span>
        </h2>
        <p className="animate-cta font-body text-sm lg:text-base text-white/70 max-w-md mx-auto mb-8 relative">
          Book your first lesson today. Our team will confirm your schedule within 24 hours.
        </p>
        <div className="animate-cta relative">
          <Button
            onClick={scrollToBooking}
            className="bg-gradient-saffron text-white hover:opacity-90 font-heading font-semibold rounded-full px-8 py-5 text-sm shadow-glow-saffron"
          >
            Book Your First Lesson
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Links Section */}
      <div className="px-6 lg:px-[6vw] py-10 border-t border-white/10">
        <div
          ref={linksRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10"
        >
          {/* Logo & Info */}
          <div className="link-column col-span-2 md:col-span-1 lg:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-5"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-saffron flex items-center justify-center shadow-glow-saffron">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-base text-white block">RDI Drive</span>
                <span className="font-body text-[10px] text-saffron">Bhutan Driving Academy</span>
              </div>
            </a>
            <p className="font-body text-xs text-white/60 mb-5 max-w-xs">
              Professional driving training in Tsirang and Gelephu, Bhutan. RSTA certified and trusted by thousands.
            </p>
            
            {/* Contact mini */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center gap-2 text-white/60">
                <Phone className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs">+975-17-XXX-XXX</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs">info@rdidrive.bt</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs">Tsirang & Gelephu</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron/20 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron/20 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron/20 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="link-column">
            <h4 className="font-heading font-bold text-sm text-white mb-3">
              Courses
            </h4>
            <ul className="space-y-2">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-xs text-white/60 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="link-column">
            <h4 className="font-heading font-bold text-sm text-white mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-xs text-white/60 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="link-column">
            <h4 className="font-heading font-bold text-sm text-white mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-xs text-white/60 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-6 lg:px-[6vw] py-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/40">
            © {new Date().getFullYear()} RDI Drive Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="font-body text-[11px] text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-[11px] text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
