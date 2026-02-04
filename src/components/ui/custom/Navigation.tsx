import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sun, Moon, Menu, Car, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      {/* Top decorative bar */}
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-deep-orange to-bhutan-gold" />
      
      <nav className="w-full px-4 lg:px-[6vw] py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-saffron flex items-center justify-center shadow-glow-saffron group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-bhutan-gold rounded-full" />
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-base text-[#1A1A1A] dark:text-white block leading-tight">
              RDI Drive
            </span>
            <span className="font-body text-[10px] text-saffron">
              Bhutan Driving Academy
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full px-1.5 py-1 border border-saffron/15">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-heading text-sm text-[#333333] dark:text-[#DDDDDD] hover:text-saffron dark:hover:text-saffron px-4 py-2 rounded-full hover:bg-saffron/10 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Location indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-saffron/10 dark:bg-saffron/15 rounded-full">
            <MapPin className="w-3 h-3 text-saffron" />
            <span className="font-body text-[11px] text-saffron font-medium">
              Tsirang & Gelephu
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-saffron/10 dark:bg-saffron/15 hover:bg-saffron/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-saffron" />
            ) : (
              <Sun className="w-4 h-4 text-saffron" />
            )}
          </button>

          {/* CTA Button - Desktop */}
          <Button
            onClick={() => scrollToSection('#booking')}
            className="hidden sm:flex bg-gradient-saffron text-white hover:opacity-90 font-heading font-semibold rounded-full px-5 py-2 text-sm shadow-glow-saffron"
          >
            Book Now
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center bg-saffron/10 dark:bg-saffron/15"
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4 text-saffron" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-cream dark:bg-dark-bg border-l border-saffron/15">
              <div className="flex flex-col gap-5 mt-6">
                {/* Mobile logo */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-saffron flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-[#1A1A1A] dark:text-white block">
                      RDI Drive
                    </span>
                    <span className="font-body text-[10px] text-saffron">
                      Bhutan Driving Academy
                    </span>
                  </div>
                </div>
                
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="font-heading text-base text-left text-[#1A1A1A] dark:text-white hover:text-saffron transition-colors py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('#booking')}
                  className="mt-3 bg-gradient-saffron text-white hover:opacity-90 font-heading font-semibold rounded-full"
                >
                  Book Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
