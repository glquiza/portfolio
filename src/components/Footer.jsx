import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Copyright notice */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-center sm:text-left">
          <span>&copy; {currentYear} {personalInfo.name}. Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>using React & Tailwind CSS.</span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
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
          <a
            href={`mailto:${personalInfo.contact.email}`}
            aria-label="Send Email"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
