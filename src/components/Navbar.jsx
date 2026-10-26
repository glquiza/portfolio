import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects', badge: '03' },
    { label: 'Lab', href: '#lab' },
    { label: 'Studio', href: '#about' },
    { label: 'Services', href: '#services' },
  ];

  // Smooth shortcut scroll handler that glides to section without trapping or hiding other sections
  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 70;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F4F0EA]/95 backdrop-blur-md border-b border-black/[0.08] py-4 shadow-sm' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand / Logo (Scrolls shortcut to top hero) */}
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, '#hero')}
          className="group flex items-center gap-3 text-charcoal focus:outline-none"
        >
          {/* Studio geometric mark */}
          <div className="w-6 h-6 flex flex-col justify-between py-1">
            <span className="w-6 h-1 bg-charcoal rounded-full group-hover:bg-terracotta transition-colors"></span>
            <span className="w-4 h-1 bg-charcoal rounded-full group-hover:w-6 transition-all"></span>
            <span className="w-2 h-1 bg-charcoal rounded-full group-hover:w-6 transition-all"></span>
          </div>

          <span className="font-display font-bold text-lg tracking-tight text-charcoal">
            {personalInfo.brandTitle || personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation Links (Smooth shortcut jumps that stay 100% scrollable) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="group relative py-1 text-charcoal-muted hover:text-charcoal transition-colors flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="font-mono text-[10px] text-terracotta font-semibold">
                  {link.badge}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          {/* Social Icons */}
          <div className="flex items-center gap-3 pl-2 border-l border-black/[0.08]">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile" 
              className="p-1.5 text-charcoal-subtle hover:text-charcoal transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              className="p-1.5 text-charcoal-subtle hover:text-charcoal transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Signature Terracotta CTA Button (Scrolls shortcut to Contact section) */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-terracotta hover:bg-terracotta-hover text-white font-medium text-sm shadow-sm transition-all active:scale-95"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-charcoal border border-black/[0.1] rounded bg-[#EDE8E0] focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#F4F0EA]/98 backdrop-blur-xl border-b border-black/[0.08] px-6 py-8 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="flex items-center justify-between py-3 border-b border-black/[0.06] text-lg font-display tracking-tight text-charcoal hover:text-terracotta"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="font-mono text-xs text-terracotta font-semibold">{link.badge}</span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-terracotta text-white font-medium text-sm rounded shadow-sm"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
