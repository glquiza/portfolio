import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Philippines Time (UTC+8)
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-[#08080a] py-16 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Top Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800/80">
          <div>
            <span className="block text-white font-semibold mb-1 uppercase font-display text-sm tracking-wider">
              {personalInfo.name}
            </span>
            <span className="text-neutral-500 uppercase text-[11px]">
              CREATIVE DEVELOPMENT & MOTION
            </span>
          </div>

          <div>
            <span className="block text-neutral-500 uppercase text-[11px] mb-1">LOCAL TIME</span>
            <span className="text-white font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{time || '12:00:00'} (PHT / UTC+8)</span>
            </span>
          </div>

          <div>
            <span className="block text-neutral-500 uppercase text-[11px] mb-1">LOCATION</span>
            <span className="text-white font-medium">
              {personalInfo.location}
            </span>
          </div>

          <div className="flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white uppercase tracking-wider py-1 border-b border-neutral-700 hover:border-white transition-all group"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-neutral-500 text-[11px] uppercase tracking-wider">
          <div>
            <span>&copy; {currentYear} {personalInfo.name}. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <a 
              href={`mailto:${personalInfo.contact.email}`} 
              className="hover:text-white transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
