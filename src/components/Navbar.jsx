import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a 
          href="#hero" 
          className="text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-85 transition-opacity"
        >
          {personalInfo.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
          <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile" 
              className="text-slate-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              className="text-slate-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-4">
          <a 
            href="#about" 
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-sky-400 text-base font-medium py-2"
          >
            About
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-sky-400 text-base font-medium py-2"
          >
            Projects
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-sky-400 text-base font-medium py-2"
          >
            Contact
          </a>
          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
