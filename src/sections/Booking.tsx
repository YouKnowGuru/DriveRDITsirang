import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    location: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !heading || !form || !info) return;

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

      gsap.fromTo(
        form,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        info.querySelectorAll('.info-card'),
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        location: '',
        message: '',
      });
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative w-full py-16 lg:py-24 bhutan-pattern z-50"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/25 to-transparent" />
      
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="animate-heading inline-flex items-center gap-2 px-3 py-1.5 bg-saffron/10 rounded-full mb-4">
            <Calendar className="w-3.5 h-3.5 text-saffron" />
            <span className="font-heading font-medium text-xs text-saffron">Book Now</span>
          </div>
          <h2 className="animate-heading font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-3">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-deep-orange">Journey</span>
          </h2>
          <p className="animate-heading font-body text-sm lg:text-base text-[#4A4A4A] dark:text-[#AAAAAA] max-w-md mx-auto">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {/* Form Card */}
          <div
            ref={formRef}
            className="lg:col-span-7 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 lg:p-6 border border-saffron/10 card-shadow-bhutan"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-saffron flex items-center justify-center mb-4 shadow-glow-saffron animate-pulse">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1A1A1A] dark:text-white mb-1">
                  Application Submitted!
                </h3>
                <p className="font-body text-sm text-[#666666] dark:text-[#888888]">
                  We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="pl-9 rounded-lg border-saffron/15 bg-transparent focus:border-saffron text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="pl-9 rounded-lg border-saffron/15 bg-transparent focus:border-saffron text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron" />
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+975 XX XXX XXX"
                        required
                        className="pl-9 rounded-lg border-saffron/15 bg-transparent focus:border-saffron text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                      Course
                    </Label>
                    <Select
                      value={formData.course}
                      onValueChange={(value) =>
                        setFormData({ ...formData, course: value })
                      }
                    >
                      <SelectTrigger className="rounded-lg border-saffron/15 bg-transparent text-sm">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter (1 Month)</SelectItem>
                        <SelectItem value="complete">Complete (2 Months)</SelectItem>
                        <SelectItem value="intensive">Intensive (3 Months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                    Location
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger className="rounded-lg border-saffron/15 bg-transparent text-sm">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tsirang">Tsirang Branch</SelectItem>
                      <SelectItem value="gelephu">Gelephu Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white mb-1.5 block">
                    Message (optional)
                  </Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or questions..."
                    rows={3}
                    className="rounded-lg border-saffron/15 bg-transparent resize-none focus:border-saffron text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-saffron text-white hover:opacity-90 font-heading font-semibold rounded-full py-5 shadow-glow-saffron"
                >
                  Submit Application
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-5 space-y-4">
            {/* Contact Cards */}
            <div className="info-card bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-5 border border-saffron/10">
              <h3 className="font-heading font-bold text-base text-[#1A1A1A] dark:text-white mb-4">
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-saffron" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white">Phone</p>
                    <p className="font-body text-xs text-[#666666] dark:text-[#888888]">+975-17-XXX-XXX</p>
                    <p className="font-body text-xs text-[#666666] dark:text-[#888888]">+975-77-XXX-XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-saffron" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white">Email</p>
                    <p className="font-body text-xs text-[#666666] dark:text-[#888888]">info@rdidrive.bt</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-saffron" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-xs text-[#1A1A1A] dark:text-white">Hours</p>
                    <p className="font-body text-xs text-[#666666] dark:text-[#888888]">Mon - Sat: 9:00 - 18:00</p>
                    <p className="font-body text-xs text-[#666666] dark:text-[#888888]">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations Card */}
            <div className="info-card bg-gradient-saffron rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" />
                <h3 className="font-heading font-bold text-base">Our Locations</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2.5 bg-white/10 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="font-heading font-medium text-xs">Tsirang Branch</p>
                    <p className="font-body text-[10px] text-white/70">Main Office</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-white/10 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="font-heading font-medium text-xs">Gelephu Branch</p>
                    <p className="font-body text-[10px] text-white/70">City Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
