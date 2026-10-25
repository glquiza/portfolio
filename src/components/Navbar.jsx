import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#projects', index: '01' },
    { label: 'LAB', href: '#lab', index: '02' },
    { label: 'SERVICES', href: '#services', index: '03' },
    { label: 'STUDIO', href: '#about', index: '04' },
    { label: 'CONTACT', href: '#contact', index: '05' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08] py-4' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="group flex items-center gap-3 text-sm font-bold tracking-tight text-white focus:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-display tracking-wider text-base uppercase group-hover:text-neutral-300 transition-colors">
            {personalInfo.name}
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-500 font-normal pl-2 border-l border-neutral-800">
            CREATIVE DEV
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="group relative py-1 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                {link.index}
              </span>
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          {/* External Social Links */}
          <div className="flex items-center gap-3 pl-4 border-l border-neutral-800">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile" 
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white border border-neutral-800 rounded bg-[#111114] focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#0c0c0e]/98 backdrop-blur-xl border-b border-neutral-800 px-6 py-8 space-y-6 animate-in fade-in duration-200">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 border-b border-neutral-900 text-lg font-display tracking-wide uppercase text-neutral-300 hover:text-white"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-neutral-500">{link.index}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs font-mono uppercase text-neutral-400">
            <span>{personalInfo.location}</span>
            <div className="flex items-center gap-4">
              <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GITHUB
              </a>
              <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
