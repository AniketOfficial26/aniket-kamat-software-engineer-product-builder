import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../portfolio.config';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGuide }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active Section Observer
    const sectionIds = ['about', 'skills', 'projects', 'exploring', 'contact'];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -60% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'exploring', label: 'Exploring', href: '#exploring' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#090A0F]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-white font-semibold text-lg tracking-tight hover:text-[#BEF264] transition-colors"
            aria-label={`${portfolioConfig.personal.fullName} home`}
          >
            <span className="font-bold tracking-tight text-xl text-white group-hover:text-[#BEF264] transition-colors">
              {portfolioConfig.personal.fullName}
            </span>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              / Dev
            </span>
          </a>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav 
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-white font-semibold after:w-full'
                      : 'text-zinc-400 hover:text-white after:w-0 hover:after:w-full'
                  } after:h-[2px] after:bg-[#BEF264] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenGuide}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-colors whitespace-nowrap shrink-0"
              title="Deployment & configuration instructions"
            >
              <span>Setup Guide</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#090A0F] bg-[#BEF264] hover:bg-[#d9f99d] active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm"
            >
              Let's connect
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#090A0F]/95 backdrop-blur-xl px-6 py-5">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-[#BEF264] py-1 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full text-left py-2 text-xs text-zinc-400 hover:text-white flex items-center justify-between"
              >
                <span>Config & Deployment Guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
